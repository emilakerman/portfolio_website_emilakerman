import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  try {
    const [hamburg, berlin] = await Promise.all([
      redis.get<number>('poll:hamburg'),
      redis.get<number>('poll:berlin'),
    ]);

    return NextResponse.json({
      hamburg: hamburg ?? 0,
      berlin: berlin ?? 0,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch votes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { city } = await request.json();

    if (city !== 'hamburg' && city !== 'berlin') {
      return NextResponse.json({ error: 'Invalid city' }, { status: 400 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateLimitKey = `poll:ratelimit:${ip}`;
    const lastVote = await redis.get(rateLimitKey);

    if (lastVote) {
      const ttl = await redis.ttl(rateLimitKey);
      return NextResponse.json(
        { error: 'Too fast! Wait before voting again.', retryAfter: ttl },
        { status: 429 }
      );
    }

    await redis.incr(`poll:${city}`);

    // Rate limit: 1 vote per 60 seconds
    await redis.set(rateLimitKey, 1, { ex: 60 });

    const [hamburg, berlin] = await Promise.all([
      redis.get<number>('poll:hamburg'),
      redis.get<number>('poll:berlin'),
    ]);

    return NextResponse.json({
      hamburg: hamburg ?? 0,
      berlin: berlin ?? 0,
      voted: city,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to record vote' },
      { status: 500 }
    );
  }
}
