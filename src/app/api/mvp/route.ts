import { NextResponse } from 'next/server';
import { MVP_CANDIDATES, INITIAL_MVP_VOTES } from '@/data/mvpCandidates';

let votesStore: Record<string, number> = { ...INITIAL_MVP_VOTES };

export async function GET() {
  const total = Object.values(votesStore).reduce((a, b) => a + b, 0);
  return NextResponse.json({
    candidates: MVP_CANDIDATES,
    votes: votesStore,
    totalVotes: total,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { candidateId, previousCandidateId } = body;

    if (!candidateId || !votesStore[candidateId] !== undefined) {
      if (!votesStore[candidateId]) {
        votesStore[candidateId] = 0;
      }
    }

    if (previousCandidateId && votesStore[previousCandidateId]) {
      votesStore[previousCandidateId] = Math.max(0, votesStore[previousCandidateId] - 1);
    }

    votesStore[candidateId] = (votesStore[candidateId] || 0) + 1;

    const total = Object.values(votesStore).reduce((a, b) => a + b, 0);

    return NextResponse.json({
      success: true,
      votes: votesStore,
      totalVotes: total,
    });
  } catch (_) {
    return NextResponse.json({ error: 'Geçersiz oy isteği.' }, { status: 400 });
  }
}
