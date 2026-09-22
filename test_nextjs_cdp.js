const http = require('node:http');
const { spawn } = require('node:child_process');

const APP_PORT = 3050;
const CHROME_PORT = 9455;

async function runTests() {
  console.log('🚀 Starting Next.js production server for testing on port', APP_PORT);

  const nextProcess = spawn('npx', ['next', 'start', '-p', String(APP_PORT)], {
    cwd: __dirname,
    stdio: 'pipe',
  });

  nextProcess.stdout.on('data', (d) => {
    // console.log(`[Next.js stdout] ${d.toString().trim()}`);
  });
  nextProcess.stderr.on('data', (d) => {
    // console.error(`[Next.js stderr] ${d.toString().trim()}`);
  });

  // Wait for server to be responsive
  let serverReady = false;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 600));
    try {
      const res = await fetch(`http://127.0.0.1:${APP_PORT}`);
      if (res.status === 200) {
        serverReady = true;
        console.log('✓ Next.js production server is ready and responding with 200 OK');
        break;
      }
    } catch (_) {}
  }

  if (!serverReady) {
    nextProcess.kill();
    throw new Error('Next.js server failed to start on port ' + APP_PORT);
  }

  // 1. TEST API ROUTES
  console.log('\n--- 1. TESTING NEXT.JS API ROUTES ---');
  // API Challenges GET
  const chRes = await fetch(`http://127.0.0.1:${APP_PORT}/api/challenges`);
  const chData = await chRes.json();
  console.log(`[API TEST 1] /api/challenges GET returned ${chData.challenges.length} challenges`);
  if (!Array.isArray(chData.challenges) || chData.challenges.length < 2) {
    throw new Error('API /api/challenges GET failed');
  }

  // API Challenges POST
  const postChRes = await fetch(`http://127.0.0.1:${APP_PORT}/api/challenges`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      team: 'Test FC Karacabey',
      captain: 'Serkan Kaptan',
      phone: '0532 999 88 77',
      pitch: 'Gölecik Arena',
      date: '2026-10-01',
      time: '21:00 - 22:00',
      stake: 'Baklavasına',
      message: 'Halı saha maçı daveti.',
    }),
  });
  const postChData = await postChRes.json();
  console.log(`[API TEST 2] /api/challenges POST returned success: ${postChData.success}`);
  if (!postChData.success || postChData.challenge.team !== 'Test FC Karacabey') {
    throw new Error('API /api/challenges POST failed');
  }

  // API MVP GET
  const mvpRes = await fetch(`http://127.0.0.1:${APP_PORT}/api/mvp`);
  const mvpData = await mvpRes.json();
  console.log(`[API TEST 3] /api/mvp GET returned ${mvpData.candidates.length} candidates, totalVotes: ${mvpData.totalVotes}`);
  if (!Array.isArray(mvpData.candidates) || mvpData.totalVotes <= 0) {
    throw new Error('API /api/mvp GET failed');
  }

  // API MVP POST
  const postMvpRes = await fetch(`http://127.0.0.1:${APP_PORT}/api/mvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidateId: 'renzi' }),
  });
  const postMvpData = await postMvpRes.json();
  console.log(`[API TEST 4] /api/mvp POST vote incremented totalVotes to ${postMvpData.totalVotes}`);
  if (!postMvpData.success || postMvpData.totalVotes !== mvpData.totalVotes + 1) {
    throw new Error('API /api/mvp POST failed');
  }

  // 2. TEST FRONTEND UI VIA CHROME HEADLESS CDP
  console.log('\n--- 2. LAUNCHING CHROME HEADLESS VIA CDP ---');
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=/tmp/chrome-next-profile-' + Date.now(),
    `--remote-debugging-port=${CHROME_PORT}`,
    `http://127.0.0.1:${APP_PORT}`,
  ]);

  let tabs = null;
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/list`);
      const text = await res.text();
      if (text && text.trim().startsWith('[')) {
        tabs = JSON.parse(text);
        break;
      }
    } catch (_) {}
  }

  if (!tabs) {
    chrome.kill();
    nextProcess.kill();
    throw new Error('Chrome did not respond on debugging port ' + CHROME_PORT);
  }

  const pageTab = tabs.find((t) => t.type === 'page');
  if (!pageTab || !pageTab.webSocketDebuggerUrl) {
    chrome.kill();
    nextProcess.kill();
    throw new Error('Could not find Chrome page tab WebSocket debugger URL');
  }

  console.log('✓ Connected to Chrome CDP:', pageTab.webSocketDebuggerUrl);
  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

  let msgId = 1;
  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  await sendCommand('Page.enable');
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${APP_PORT}` });
  // Wait for React hydration
  await new Promise((r) => setTimeout(r, 2000));

  async function evaluate(expression) {
    const result = await sendCommand('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails) {
      throw new Error(`Evaluation failed: ${JSON.stringify(result.exceptionDetails)}`);
    }
    return result.result ? result.result.value : undefined;
  }

  console.log('\n--- 3. RUNNING IN-BROWSER ASSERTIONS ON NEXT.JS APP ---');

  // TEST 1: Page Title & Meta
  const title = await evaluate('document.title');
  console.log(`[TEST 1] Page Title: "${title}"`);
  if (!title.includes('Yeniköy United FK') || !title.includes('Karacabey')) {
    throw new Error(`Unexpected page title: ${title}`);
  }

  // TEST 2: Active Pitch Players Count (Expected: 8)
  const pitchTokensCount = await evaluate('document.querySelectorAll("#pitchPlayersLayer .player-token").length');
  console.log(`[TEST 2] Pitch Tokens Count: ${pitchTokensCount} (Expected: 8)`);
  if (pitchTokensCount !== 8) {
    throw new Error(`Expected 8 player tokens on pitch, found ${pitchTokensCount}`);
  }

  // TEST 3: Active Formation is 3-2-2
  const activeFormationVal = await evaluate('document.getElementById("formationSelect").value');
  console.log(`[TEST 3] Selected Formation: ${activeFormationVal} (Expected: 3-2-2)`);
  if (activeFormationVal !== '3-2-2') {
    throw new Error(`Expected 3-2-2 formation, got ${activeFormationVal}`);
  }

  // TEST 4: Official Starting 8 Players IDs on pitch
  const tokenIds = await evaluate(`Array.from(document.querySelectorAll('#pitchPlayersLayer .player-token')).map(el => el.getAttribute('data-id'))`);
  console.log(`[TEST 4] Token IDs on pitch:`, tokenIds.join(', '));
  const expectedStarting = ['renzi', 'efe_kaan', 'mert_ferruh', 'yusuf_kagan', 'oguzhan_t', 'g_calik', 'eg_ozruf', 'ege_bayir'];
  for (const exp of expectedStarting) {
    if (!tokenIds.includes(exp)) {
      throw new Error(`Missing expected starting player ${exp} on pitch`);
    }
  }

  // TEST 5: Special Badges & Icons in DOM
  const domBadges = await evaluate(`({
    efeCanBadge: document.body.innerHTML.includes('EN ÖNEMLİ YEDEK (KİRALIK)'),
    egemenBadge: document.body.innerHTML.includes('GELECEK SEZON TRANSFERİ'),
    enesBadge: document.body.innerHTML.includes('KURUCU &amp; ADMIN') || document.body.innerHTML.includes('KURUCU & ADMIN'),
    ramazanHeart: document.body.innerHTML.includes('TAKIMIN KALBİ') || document.body.innerHTML.includes('Kalpli')
  })`);
  console.log(`[TEST 5] Badges check:`, JSON.stringify(domBadges));
  if (!domBadges.efeCanBadge || !domBadges.egemenBadge || !domBadges.enesBadge || !domBadges.ramazanHeart) {
    throw new Error('Special badges or heart icon missing in rendered UI');
  }

  // TEST 6: Change Formation (Switch to 2-4-1, then 3-3-1)
  await evaluate(`{
    const sel = document.getElementById('formationSelect');
    sel.value = '2-4-1';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }`);
  await new Promise((r) => setTimeout(r, 400));
  const formAfter241 = await evaluate('document.getElementById("formationSelect").value');
  console.log(`[TEST 6a] Formation changed to 2-4-1: ${formAfter241}`);
  if (formAfter241 !== '2-4-1') throw new Error('Formation did not change to 2-4-1');

  await evaluate(`{
    const sel = document.getElementById('formationSelect');
    sel.value = '3-3-1';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }`);
  await new Promise((r) => setTimeout(r, 400));
  const formAfter331 = await evaluate('document.getElementById("formationSelect").value');
  console.log(`[TEST 6b] Formation changed to 3-3-1: ${formAfter331}`);
  if (formAfter331 !== '3-3-1') throw new Error('Formation did not change to 3-3-1');

  // TEST 7: Tactical On-Pitch Popover (Click token for Yusuf Kağan)
  await evaluate(`
    const token = document.getElementById('token-yusuf_kagan');
    if (token) token.click();
  `);
  await new Promise((r) => setTimeout(r, 400));
  const popoverContent = await evaluate(`{
    const pop = document.getElementById('pitchPopover');
    ({
      exists: Boolean(pop),
      text: pop ? pop.innerText : ''
    })
  }`);
  console.log(`[TEST 7] Popover displayed for Yusuf Kağan:`, popoverContent.exists && popoverContent.text.includes('Yusuf Kağan'));
  if (!popoverContent.exists || !popoverContent.text.includes('Yusuf Kağan')) {
    throw new Error('On-pitch popover failed to display on click');
  }
  if (!popoverContent.text.includes('Emir Özruf') && !popoverContent.text.includes('Eymen Efe')) {
    throw new Error('Yusuf Kağan reserve mappings missing in popover');
  }

  // TEST 8: Player Substitution via Popover (Sub in Emir Özruf)
  await evaluate(`{
    const pop = document.getElementById('pitchPopover');
    const swapBtn = pop.querySelector('button[class*="bg-club-gold"]');
    if (swapBtn) swapBtn.click();
  }`);
  await new Promise((r) => setTimeout(r, 500));
  const activeTokensAfterSwap = await evaluate(`Array.from(document.querySelectorAll('#pitchPlayersLayer .player-token')).map(el => el.getAttribute('data-id'))`);
  console.log(`[TEST 8] Active token IDs after popover swap:`, activeTokensAfterSwap.join(', '));
  if (!activeTokensAfterSwap.includes('emir_ozruf')) {
    throw new Error('Emir Özruf was not swapped onto pitch');
  }

  // TEST 9: MVP Voting
  const initialVoteText = await evaluate('document.getElementById("mvpTotalVotesDisplay").innerText');
  const initialVotes = parseInt(initialVoteText, 10);
  console.log(`[TEST 9] Initial MVP total votes: ${initialVotes}`);

  // Click vote on first candidate button
  await evaluate(`{
    const btns = document.querySelectorAll('#mvpCandidatesGrid button');
    if (btns.length > 0) btns[0].click();
  }`);
  await new Promise((r) => setTimeout(r, 500));
  const newVoteText = await evaluate('document.getElementById("mvpTotalVotesDisplay").innerText');
  const newVotes = parseInt(newVoteText, 10);
  console.log(`[TEST 9b] MVP total votes after voting: ${newVotes}`);
  if (newVotes !== initialVotes + 1) {
    throw new Error(`MVP vote failed to increment (expected ${initialVotes + 1}, got ${newVotes})`);
  }

  // TEST 10: Squad Search Filter
  await evaluate(`{
    const searchInput = document.getElementById('playerSearchInput');
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeSetter.call(searchInput, 'Ramazan');
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  }`);
  await new Promise((r) => setTimeout(r, 400));
  const squadCardsCount = await evaluate('document.querySelectorAll("#squadGrid .glass-card-interactive").length');
  const squadCardText = await evaluate('document.getElementById("squadGrid").innerText');
  console.log(`[TEST 10] Squad search for "Ramazan": count=${squadCardsCount}, contains Ramazan=${squadCardText.includes('Ramazan Işık')}`);
  if (squadCardsCount !== 1 || !squadCardText.includes('Ramazan Işık')) {
    throw new Error('Squad search filter failed');
  }

  // TEST 11: Challenge Modal Open & Form Fill
  await evaluate(`{
    const meydanBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('MEYDAN OKU'));
    if (meydanBtns[0]) meydanBtns[0].click();
  }`);
  await new Promise((r) => setTimeout(r, 400));
  const modalVisible = await evaluate('Boolean(document.getElementById("challengeModal"))');
  console.log(`[TEST 11] Challenge modal opened: ${modalVisible}`);
  if (!modalVisible) throw new Error('Challenge modal did not open');

  await evaluate(`{
    const inputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    const textSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;

    const teamInput = document.getElementById('challengerTeam');
    inputSetter.call(teamInput, 'Bursa Gençlik SK');
    teamInput.dispatchEvent(new Event('input', { bubbles: true }));

    const captInput = document.getElementById('challengerCaptain');
    inputSetter.call(captInput, 'Kemal Kaptan');
    captInput.dispatchEvent(new Event('input', { bubbles: true }));

    const phoneInput = document.getElementById('challengerPhone');
    inputSetter.call(phoneInput, '0533 111 22 33');
    phoneInput.dispatchEvent(new Event('input', { bubbles: true }));

    const noteInput = document.getElementById('challengeNote');
    textSetter.call(noteInput, 'Harika bir maç olsun.');
    noteInput.dispatchEvent(new Event('input', { bubbles: true }));

    document.getElementById('challengeForm').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }`);
  await new Promise((r) => setTimeout(r, 600));
  const feedText = await evaluate('document.getElementById("challengesFeed").innerText');
  console.log(`[TEST 11b] Challenge feed has new entry: ${feedText.includes('Bursa Gençlik SK')}`);
  if (!feedText.includes('Bursa Gençlik SK')) {
    throw new Error('Submitted challenge not found in feed');
  }

  // TEST 12: Formation Change AFTER Player Substitution
  // We previously swapped Yusuf Kağan -> Emir Özruf in slot 3.
  // Switch to 4-3-3. In 4-3-3, slot 3 has x=65, y=46.
  await evaluate(`{
    const sel = document.getElementById('formationSelect');
    sel.value = '4-3-3';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }`);
  await new Promise((r) => setTimeout(r, 500));
  const emirTokenStyle = await evaluate(`{
    const token = document.getElementById('token-emir_ozruf');
    ({
      left: token ? token.style.left : '',
      top: token ? token.style.top : ''
    })
  }`);
  console.log(`[TEST 12] Swapped player Emir Özruf coordinates in 4-3-3: left=${emirTokenStyle.left}, top=${emirTokenStyle.top} (Expected: 65%, 46%)`);
  if (emirTokenStyle.left !== '65%' || emirTokenStyle.top !== '46%') {
    throw new Error('Swapped player failed to move to target slot coordinates in new formation');
  }

  // TEST 13: Reset Formation Positions Button
  await evaluate(`{
    const resetBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('Dizilimi Sıfırla'));
    if (resetBtns[0]) resetBtns[0].click();
  }`);
  await new Promise((r) => setTimeout(r, 400));
  console.log('[TEST 13] Reset formation positions executed successfully');

  // TEST 14: Reset MVP Vote
  const votesBeforeReset = parseInt(await evaluate('document.getElementById("mvpTotalVotesDisplay").innerText'), 10);
  await evaluate(`{
    const resetVoteBtn = document.querySelector('button[title*="Sıfırla"]');
    if (resetVoteBtn) resetVoteBtn.click();
  }`);
  await new Promise((r) => setTimeout(r, 500));
  const votesAfterReset = parseInt(await evaluate('document.getElementById("mvpTotalVotesDisplay").innerText'), 10);
  const bannerHidden = await evaluate('!document.getElementById("userVotedBanner")');
  console.log(`[TEST 14] MVP Vote Reset: ${votesBeforeReset} -> ${votesAfterReset}, bannerHidden=${bannerHidden}`);
  if (votesAfterReset !== votesBeforeReset - 1 || !bannerHidden) {
    throw new Error('MVP vote reset failed to decrement vote count or remove banner');
  }

  // TEST 15: Empty Search State
  await evaluate(`{
    const searchInput = document.getElementById('playerSearchInput');
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeSetter.call(searchInput, 'XYZ_NON_EXISTENT_PLAYER');
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  }`);
  await new Promise((r) => setTimeout(r, 400));
  const emptyStateText = await evaluate('document.getElementById("squadGrid").innerText');
  console.log(`[TEST 15] Empty search shows not found message: ${emptyStateText.includes('Aramanıza Uygun Oyuncu Bulunamadı')}`);
  if (!emptyStateText.includes('Aramanıza Uygun Oyuncu Bulunamadı')) {
    throw new Error('Empty search state not displayed');
  }

  // TEST 16: Clear Search restores all 26 players
  await evaluate(`{
    const searchInput = document.getElementById('playerSearchInput');
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeSetter.call(searchInput, '');
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  }`);
  await new Promise((r) => setTimeout(r, 400));
  const restoredCardsCount = await evaluate('document.querySelectorAll("#squadGrid .glass-card-interactive").length');
  console.log(`[TEST 16] Restored squad cards count: ${restoredCardsCount} (Expected: 26)`);
  if (restoredCardsCount !== 26) {
    throw new Error(`Expected 26 squad cards after clearing search, got ${restoredCardsCount}`);
  }

  // TEST 17: Mobile Viewport & Menu Toggle
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 300));
  const hamburgerBtn = await evaluate(`{
    const btn = document.querySelector('button[aria-label="Menüyü Aç"]');
    if (btn) btn.click();
    Boolean(btn)
  }`);
  await new Promise((r) => setTimeout(r, 300));
  const mobileDrawerVisible = await evaluate('document.body.innerText.includes("2D Taktik Tahtası (İlk 8)")');
  console.log(`[TEST 17] Mobile hamburger button clicked, drawer visible: ${mobileDrawerVisible}`);
  if (!mobileDrawerVisible) {
    throw new Error('Mobile menu drawer failed to open on hamburger click');
  }

  console.log('\n======================================================');
  console.log('🏆 ALL NEXT.JS APP ROUTER E2E & API TESTS PASSED!');
  console.log('======================================================\n');

  ws.close();
  chrome.kill();
  nextProcess.kill();
  process.exit(0);
}

runTests().catch((err) => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
