import { NextResponse } from 'next/server';
import { INITIAL_CHALLENGES } from '@/data/challenges';
import { Challenge } from '@/types';

// In-memory persistence for demonstration and local dev
let challengesStore: Challenge[] = [...INITIAL_CHALLENGES];

export async function GET() {
  return NextResponse.json({ challenges: challengesStore });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { team, captain, phone, pitch, date, time, stake, message } = body;

    if (!team || !captain || !phone || !date) {
      return NextResponse.json(
        { error: 'Lütfen tüm zorunlu alanları doldurun.' },
        { status: 400 }
      );
    }

    const newChallenge: Challenge = {
      id: `ch_${Date.now()}`,
      team: String(team).slice(0, 80),
      captain: String(captain).slice(0, 80),
      phone: String(phone).slice(0, 30),
      pitch: String(pitch || 'Karacabey Halı Sahası').slice(0, 100),
      date: String(date).slice(0, 20),
      time: String(time || '21:00 - 22:00').slice(0, 30),
      stake: String(stake || 'Baklavasına Halı Saha Maçı').slice(0, 50),
      message: String(message || 'Maç teklifi iletildi.').slice(0, 500),
      status: 'Admin Onayında',
      timeAgo: 'Az önce',
    };

    challengesStore = [newChallenge, ...challengesStore];

    return NextResponse.json({ success: true, challenge: newChallenge }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Sunucu hatası, lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
