import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const [hamburg, berlin] = await Promise.all([
    kv.get<number>('poll:hamburg'),
    kv.get<number>('poll:berlin'),
  ]);

  return NextResponse.json({
    hamburg: hamburg ?? 0,
    berlin: berlin ?? 0,
  });
}

export async function POST(request: NextRequest) {
  const { city } = await request.json();

  if (city !== 'hamburg' && city !== 'berlin') {
    return NextResponse.json({ error: 'Invalid city' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const rateLimitKey = `poll:ratelimit:${ip}`;
  const lastVote = await kv.get(rateLimitKey);

  if (lastVote) {
    const ttl = await kv.ttl(rateLimitKey);
    return NextResponse.json(
      { error: 'Too fast! Wait before voting again.', retryAfter: ttl },
      { status: 429 }
    );
  }

  const key = `poll:${city}`;
  const newCount = await kv.incr(key);

  // Set rate limit: 1 vote per 60 seconds
  await kv.set(rateLimitKey, 1, { ex: 60 });

  const [hamburg, berlin] = await Promise.all([
    kv.get<number>('poll:hamburg'),
    kv.get<number>('poll:berlin'),
  ]);

  return NextResponse.json({
    hamburg: hamburg ?? 0,
    berlin: berlin ?? 0,
    voted: city,
    newCount,
  });
}
