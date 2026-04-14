import { NextResponse } from 'next/server';
import sharp from 'sharp';

const cache = new Map<string, { data: unknown; ts: number }>();
const TTL = 3600_000; // 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get('id') || '0tSkMuKKrLXEfxc58cEhFX';

  const cached = cache.get(trackId);
  if (cached && Date.now() - cached.ts < TTL) {
    return NextResponse.json(cached.data);
  }

  const trackUrl = `https://open.spotify.com/track/${trackId}`;

  try {
    // Fetch oEmbed + page in parallel
    const [oembedRes, pageRes] = await Promise.all([
      fetch(
        `https://open.spotify.com/oembed?url=${encodeURIComponent(trackUrl)}`,
      ),
      fetch(trackUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        redirect: 'follow',
      }).catch(() => null),
    ]);

    if (!oembedRes.ok) throw new Error('oEmbed failed');
    const oembed = await oembedRes.json();

    // Extract artist from og:description ("Artist · Album · Song · Year")
    let artist = '';
    if (pageRes?.ok) {
      try {
        const html = await pageRes.text();
        const ogMatch = html.match(
          /og:description" content="([^"]+)"/,
        );
        if (ogMatch) {
          artist = ogMatch[1].split(' · ')[0] || '';
        }
      } catch {
        // keep empty
      }
    }

    // Extract dominant color from album art
    let dominantColor = { r: 120, g: 120, b: 140 };
    if (oembed.thumbnail_url) {
      try {
        const imgRes = await fetch(oembed.thumbnail_url);
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        const stats = await sharp(buffer).stats();
        dominantColor = stats.dominant;
      } catch {
        // keep fallback color
      }
    }

    const result = {
      title: oembed.title || 'Unknown',
      artist,
      thumbnailUrl: oembed.thumbnail_url || '',
      dominantColor,
    };

    cache.set(trackId, { data: result, ts: Date.now() });
    return NextResponse.json(result);
  } catch {
    const fallback = {
      title: 'Unknown',
      artist: '',
      thumbnailUrl: '',
      dominantColor: { r: 120, g: 120, b: 140 },
    };
    return NextResponse.json(fallback);
  }
}
