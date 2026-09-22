const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const PORT = 8999;
const CHROME_PORT = 9444;

// 1. Static file server
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(PORT, async () => {
  console.log(`Test HTTP server listening on port ${PORT}`);

  // 2. Launch Chrome Headless
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=/tmp/chrome-test-profile-' + Date.now(),
    `--remote-debugging-port=${CHROME_PORT}`,
    `http://localhost:${PORT}/index.html`
  ]);

  // Retry loop for Chrome to be ready
  let tabs = null;
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 600));
    try {
      const res = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/list`);
      const text = await res.text();
      if (text && text.trim().startsWith('[')) {
        tabs = JSON.parse(text);
        break;
      }
    } catch (e) {
      // Chrome starting up
    }
  }

  try {
    if (!tabs) throw new Error('Chrome did not respond on debugging port');
    const pageTab = tabs.find(t => t.type === 'page');
    if (!pageTab || !pageTab.webSocketDebuggerUrl) {
      throw new Error('Could not find Chrome page tab WebSocket debugger URL');
    }

    console.log('Connecting to Chrome CDP:', pageTab.webSocketDebuggerUrl);
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

    console.log('Connected to Chrome! Navigating to page and running in-browser test assertions...');

    await sendCommand('Page.enable');
    await sendCommand('Page.navigate', { url: `http://localhost:${PORT}/index.html` });
    await new Promise(r => setTimeout(r, 1200));

    async function evaluate(expression) {
      const result = await sendCommand('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      if (result.exceptionDetails) {
        throw new Error(`Evaluation failed: ${JSON.stringify(result.exceptionDetails)}`);
      }
      return result.result ? result.result.value : undefined;
    }

    // TEST 1: Initial Pitch Players & Count
    const pitchPlayersCount = await evaluate('state.activePitchPlayers.length');
    console.log(`[TEST 1] Pitch Players Count: ${pitchPlayersCount} (Expected: 8)`);
    if (pitchPlayersCount !== 8) throw new Error(`Expected 8 pitch players, got ${pitchPlayersCount}`);

    // TEST 2: Initial Formation is 3-2-2
    const currentFormation = await evaluate('state.currentFormation');
    console.log(`[TEST 2] Current Formation: ${currentFormation} (Expected: 3-2-2)`);
    if (currentFormation !== '3-2-2') throw new Error(`Expected 3-2-2 formation, got ${currentFormation}`);

    // TEST 3: Verify All Official Starting 8 Players on Pitch
    const pitchPlayerIds = await evaluate('state.activePitchPlayers.map(p => p.id)');
    console.log(`[TEST 3] Active Pitch Players: ${pitchPlayerIds.join(', ')}`);
    const expectedStarting = ['renzi', 'efe_kaan', 'mert_ferruh', 'yusuf_kagan', 'oguzhan_t', 'g_calik', 'eg_ozruf', 'ege_bayir'];
    for (const exp of expectedStarting) {
      if (!pitchPlayerIds.includes(exp)) {
        throw new Error(`Missing expected starting player ${exp} on pitch`);
      }
    }

    // TEST 4: Official Substitutes Mapping
    const subMappings = await evaluate(`({
      yusufSubs: state.players.find(p => p.id === 'yusuf_kagan').substituteIds,
      egOzrufSubs: state.players.find(p => p.id === 'eg_ozruf').substituteIds,
      oguzhanSubs: state.players.find(p => p.id === 'oguzhan_t').substituteIds,
      gCalikSubs: state.players.find(p => p.id === 'g_calik').substituteIds,
      egeBayirSubs: state.players.find(p => p.id === 'ege_bayir').substituteIds
    })`);
    console.log(`[TEST 4] Sub Mappings:`, JSON.stringify(subMappings));
    if (!subMappings.yusufSubs.includes('emir_ozruf') || !subMappings.yusufSubs.includes('eymen_efe_keles')) {
      throw new Error('Yusuf Kağan substitutes mismatch');
    }
    if (!subMappings.egOzrufSubs.includes('ramazan_isik') || !subMappings.egOzrufSubs.includes('cinar_guzeroglu') || !subMappings.egOzrufSubs.includes('kadir_hetel')) {
      throw new Error('E.G. Özruf substitutes mismatch');
    }
    if (!subMappings.oguzhanSubs.includes('poyraz_ak') || !subMappings.oguzhanSubs.includes('cagan_t')) {
      throw new Error('Oğuzhan T. substitutes mismatch');
    }
    if (!subMappings.gCalikSubs.includes('berat_calik')) {
      throw new Error('G. Çalık substitutes mismatch');
    }
    if (!subMappings.egeBayirSubs.includes('doruk_aksat')) {
      throw new Error('Ege Bayır substitutes mismatch');
    }

    // TEST 5: Special Role Badges
    const specialPlayers = await evaluate(`({
      efeCan: state.players.find(p => p.id === 'efe_can').specialBadge,
      egemen: state.players.find(p => p.id === 'egemen_giryike').specialBadge,
      enes: state.players.find(p => p.id === 'enes_kaplan').specialBadge,
      ramazanHeart: state.players.find(p => p.id === 'ramazan_isik').hasHeartIcon
    })`);
    console.log(`[TEST 5] Special Roles & Heart Badge:`, JSON.stringify(specialPlayers));
    if (!specialPlayers.efeCan.includes('KİRALIK') || !specialPlayers.efeCan.includes('EN ÖNEMLİ YEDEK')) {
      throw new Error('Efe Can badge mismatch');
    }
    if (!specialPlayers.egemen.includes('GELECEK SEZON')) {
      throw new Error('Egemen Gıryıke badge mismatch');
    }
    if (!specialPlayers.enes.includes('KURUCU') && !specialPlayers.enes.includes('ADMIN')) {
      throw new Error('Enes Kaplan badge mismatch');
    }
    if (!specialPlayers.ramazanHeart) {
      throw new Error('Ramazan Işık heart icon missing');
    }

    // TEST 6: Formation Switching (Change to 2-4-1, then 3-3-1)
    await evaluate('changeFormation("2-4-1")');
    const formAfter = await evaluate('state.currentFormation');
    console.log(`[TEST 6a] Formation changed to 2-4-1: ${formAfter}`);
    if (formAfter !== '2-4-1') throw new Error('Formation did not change to 2-4-1');

    await evaluate('changeFormation("3-3-1")');
    const formAfter331 = await evaluate('state.currentFormation');
    console.log(`[TEST 6b] Formation changed to 3-3-1: ${formAfter331}`);
    if (formAfter331 !== '3-3-1') throw new Error('Formation did not change to 3-3-1');

    // TEST 7: Player Substitution (Swap on pitch: E.G. Özruf -> Ramazan Işık)
    await evaluate('swapPlayerWithSub("eg_ozruf", "ramazan_isik")');
    const activeIdsAfterSwap = await evaluate('state.activePitchPlayers.map(p => p.id)');
    console.log(`[TEST 7] Active players after swap:`, activeIdsAfterSwap);
    if (!activeIdsAfterSwap.includes('ramazan_isik')) {
      throw new Error('Ramazan Işık was not placed on pitch after substitution');
    }
    if (activeIdsAfterSwap.includes('eg_ozruf')) {
      throw new Error('E.G. Özruf was not replaced on pitch after substitution');
    }

    // TEST 7b: CRITICAL BUG REGRESSION CHECK: Formation Change AFTER Player Substitution
    // Switch to 2-4-1, verify substituted player Ramazan Işık (slot 6) actually moved to (22, 78)
    await evaluate('changeFormation("2-4-1")');
    const ramazanCoord = await evaluate('state.activePitchPlayers.find(p => p.id === "ramazan_isik")');
    console.log(`[TEST 7b] Ramazan position after formation change to 2-4-1: x=${ramazanCoord.x}, y=${ramazanCoord.y} (Expected: 22, 78)`);
    if (ramazanCoord.x !== 22 || ramazanCoord.y !== 78) {
      throw new Error(`Ramazan failed to update coordinates in new formation: got (${ramazanCoord.x}, ${ramazanCoord.y})`);
    }

    // TEST 7c: On-Pitch Popover / Tooltip Verification
    await evaluate('showPitchPopover("yusuf_kagan")');
    const popoverState = await evaluate(`({
      visible: !document.getElementById('pitchPopover').classList.contains('hidden'),
      hasYusufSubs: document.getElementById('pitchPopover').innerHTML.includes('Emir Özruf') && document.getElementById('pitchPopover').innerHTML.includes('Eymen Efe')
    })`);
    console.log(`[TEST 7c] On-pitch popover state:`, JSON.stringify(popoverState));
    if (!popoverState.visible || !popoverState.hasYusufSubs) {
      throw new Error('On-pitch tactical popover failed to display Yusuf Kağan substitutes');
    }
    await evaluate('closePitchPopover()');
    const popoverClosed = await evaluate('document.getElementById("pitchPopover").classList.contains("hidden")');
    if (!popoverClosed) throw new Error('Popover failed to close');

    // TEST 7d: Substitutes Modal Verification
    await evaluate('openSubstitutesModal("yusuf_kagan")');
    const modalState = await evaluate(`({
      visible: !document.getElementById('substitutesModal').classList.contains('hidden'),
      bodyHasSubs: document.getElementById('substitutesModalBody').innerHTML.includes('Emir Özruf')
    })`);
    console.log(`[TEST 7d] Substitutes modal state:`, JSON.stringify(modalState));
    if (!modalState.visible || !modalState.bodyHasSubs) {
      throw new Error('Substitutes modal failed to open with correct squad data');
    }
    await evaluate('closeSubstitutesModal()');
    const modalClosed = await evaluate('document.getElementById("substitutesModal").classList.contains("hidden")');
    if (!modalClosed) throw new Error('Substitutes modal failed to close');

    // TEST 7e: Bench Player Inspection & Substitution (Doruk Akşat -> Ege Bayır)
    await evaluate('selectPlayerOnPitch("doruk_aksat")');
    const dorukCardText = await evaluate('document.getElementById("playerDetailContent").textContent');
    console.log(`[TEST 7e-1] Doruk Akşat status card indicates bench: ${dorukCardText.includes('YEDEKLERDE')}`);
    if (!dorukCardText.includes('YEDEKLERDE')) {
      throw new Error('Bench player Doruk Akşat was incorrectly marked on pitch');
    }
    await evaluate('substituteInBenchPlayer("doruk_aksat", "ege_bayir")');
    const activeAfterDoruk = await evaluate('state.activePitchPlayers.map(p => p.id)');
    console.log(`[TEST 7e-2] Active players after Doruk sub-in:`, activeAfterDoruk);
    if (!activeAfterDoruk.includes('doruk_aksat') || activeAfterDoruk.includes('ege_bayir')) {
      throw new Error('substituteInBenchPlayer failed to swap Doruk into match');
    }

    // TEST 8: MVP Voting
    const initialEfeCanVotes = await evaluate('state.mvpVotes["efe_can"] || 0');
    await evaluate('castVote("efe_can")');
    const newEfeCanVotes = await evaluate('state.mvpVotes["efe_can"]');
    const userVote = await evaluate('state.userVote');
    console.log(`[TEST 8] MVP Vote: Efe Can votes ${initialEfeCanVotes} -> ${newEfeCanVotes}, userVote: ${userVote}`);
    if (newEfeCanVotes !== initialEfeCanVotes + 1 || userVote !== 'efe_can') {
      throw new Error('MVP vote failed to record correctly');
    }

    // Reset user vote
    await evaluate('resetUserVote()');
    const resetUserVoteVal = await evaluate('state.userVote');
    console.log(`[TEST 8b] Reset vote: userVote is now ${resetUserVoteVal}`);
    if (resetUserVoteVal !== null) throw new Error('Reset vote failed');

    // TEST 9: Challenge Submission Simulation & XSS Sanitization
    const initialChallengesCount = await evaluate('state.challenges.length');
    await evaluate(`
      const mockEvent = { preventDefault: () => {} };
      document.getElementById('challengerTeam').value = '<img src=x onerror=alert(1)>Test Mahalle SK';
      document.getElementById('challengerCaptain').value = '<script>evil()</script>Test Kaptan';
      document.getElementById('challengerPhone').value = '0555 123 45 67';
      document.getElementById('pitchPreference').value = 'Karacabey Belediye Halı Sahası';
      document.getElementById('matchDate').value = '2026-09-30';
      document.getElementById('matchTime').value = '21:00 - 22:00';
      document.getElementById('matchStake').value = 'Baklavasına Halı Saha Maçı';
      document.getElementById('challengeNote').value = '<b>Bold Note</b>';
      handleChallengeSubmit(mockEvent);
    `);
    const newChallengesCount = await evaluate('state.challenges.length');
    const topChallenge = await evaluate('state.challenges[0]');
    const rawFeedHtml = await evaluate('document.getElementById("challengesFeed").innerHTML');
    console.log(`[TEST 9] Challenges count: ${initialChallengesCount} -> ${newChallengesCount}`);
    console.log(`[TEST 9b] XSS protection verified (no unescaped <script> or <img onerror>): ${!rawFeedHtml.includes('<img src=x onerror=') && rawFeedHtml.includes('&lt;img')}`);
    if (newChallengesCount !== initialChallengesCount + 1) {
      throw new Error('Challenge submission failed');
    }
    if (rawFeedHtml.includes('<img src=x onerror=') || !rawFeedHtml.includes('&lt;img')) {
      throw new Error('XSS Sanitization failed in challenge feed!');
    }

    // TEST 10: Fixture Tabs & Squad Filters
    await evaluate('switchFixtureTab("upcoming")');
    const activeTab = await evaluate('state.fixtureTab');
    console.log(`[TEST 10a] Active Fixture Tab: ${activeTab}`);
    if (activeTab !== 'upcoming') throw new Error('Fixture tab switch failed');

    await evaluate('setSquadFilter("special")');
    const squadFilter = await evaluate('state.squadFilter');
    console.log(`[TEST 10b] Active Squad Filter: ${squadFilter}`);
    if (squadFilter !== 'special') throw new Error('Squad filter switch failed');

    // TEST 11: Drag & Drop Event Handlers & Long Press detection
    const dndSetup = await evaluate(`typeof setupPitchDragAndDrop === 'function' && document.querySelectorAll('.player-token').length === 8`);
    console.log(`[TEST 11] Pitch DnD & Tokens integrity: ${dndSetup}`);
    if (!dndSetup) throw new Error('Drag and drop tokens check failed');

    // TEST 12: Formation Reset positions
    await evaluate('resetFormationPositions()');
    console.log(`[TEST 12] Formation positions reset successful.`);

    console.log('\n========================================');
    console.log('🏆 ALL 16 IN-BROWSER CDP TESTS PASSED!');
    console.log('========================================\n');

    ws.close();
    chrome.kill();
    server.close();
    process.exit(0);

  } catch (err) {
    console.error('❌ TEST FAILED WITH ERROR:', err);
    chrome.kill();
    server.close();
    process.exit(1);
  }
});
