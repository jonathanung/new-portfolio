'use client';

import { useState, useEffect, ReactNode } from 'react';

/* ─── Types ─── */

export interface ThemeColor {
  r: number;
  g: number;
  b: number;
}

interface TrackInfo {
  title: string;
  artist: string;
  albumArt: string;
  trackId: string;
  dominantColor: ThemeColor;
}

/* ─── Track config per section ─── */

export const SECTION_TRACKS: Record<string, { id: string; artist: string }> = {
  hero:     { id: '2e57bosi6bl7yxoYRiJHVq', artist: 'LE SSERAFIM' },
  work:     { id: '1JCKwBr7XDfh1tvzAtd4hw', artist: 'i-dle' },
  projects: { id: '1k0JAiH11gHL9dc5dfQjQr', artist: 'ILLIT' },
  extras:    { id: '0tSkMuKKrLXEfxc58cEhFX', artist: 'IVE' },
  education: { id: '2O9bMJticxbQ8FH3NiQ7Xh', artist: 'YENA' },
  contact:   { id: '3lOMJTQTd6J34faYwASc33', artist: 'NAYEON' },
};

/* ─── Hook: pre-fetch ALL track metadata on mount ─── */

const trackCache: Record<string, TrackInfo> = {};
let prefetchStarted = false;

function prefetchAllTracks() {
  if (prefetchStarted) return;
  prefetchStarted = true;

  Object.entries(SECTION_TRACKS).forEach(([, config]) => {
    if (trackCache[config.id]) return;
    fetch(`/api/spotify?id=${config.id}`)
      .then((res) => res.json())
      .then((d) => {
        trackCache[config.id] = {
          title: d.title || 'Unknown',
          artist: config.artist || d.artist || '',
          albumArt: d.thumbnailUrl || '',
          trackId: config.id,
          dominantColor: d.dominantColor || { r: 120, g: 120, b: 140 },
        };
      })
      .catch(() => {
        trackCache[config.id] = {
          title: 'Unknown',
          artist: config.artist,
          albumArt: '',
          trackId: config.id,
          dominantColor: { r: 120, g: 120, b: 140 },
        };
      });
  });
}

function useTrackData(trackId: string, artist: string): TrackInfo | null {
  const [data, setData] = useState<TrackInfo | null>(trackCache[trackId] || null);

  useEffect(() => {
    prefetchAllTracks();
  }, []);

  useEffect(() => {
    // If already cached, use it immediately
    if (trackCache[trackId]) {
      setData(trackCache[trackId]);
      return;
    }

    let cancelled = false;

    fetch(`/api/spotify?id=${trackId}`)
      .then((res) => res.json())
      .then((d) => {
        if (!cancelled) {
          const info: TrackInfo = {
            title: d.title || 'Unknown',
            artist: artist || d.artist || '',
            albumArt: d.thumbnailUrl || '',
            trackId,
            dominantColor: d.dominantColor || { r: 120, g: 120, b: 140 },
          };
          trackCache[trackId] = info;
          setData(info);
        }
      })
      .catch(() => {
        if (!cancelled) {
          const fallback: TrackInfo = {
            title: 'Unknown',
            artist,
            albumArt: '',
            trackId,
            dominantColor: { r: 120, g: 120, b: 140 },
          };
          trackCache[trackId] = fallback;
          setData(fallback);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [trackId, artist]);

  return data;
}

/* ─── Vinyl Record ─── */

function VinylRecord({ albumArt, size = 160 }: { albumArt: string; size?: number }) {
  const isMini = size < 60;

  return (
    <div style={{ width: size, height: size }} className="relative flex-shrink-0">
      <div
        className="w-full h-full rounded-full vinyl-grooves vinyl-spinning relative"
        style={{
          boxShadow: isMini
            ? '0 2px 8px rgba(0,0,0,0.2)'
            : '0 4px 24px rgba(0,0,0,0.25)',
        }}
      >
        {albumArt && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={albumArt}
            alt="Album art"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover transition-opacity duration-500"
            style={{
              width: isMini ? '50%' : '42%',
              height: isMini ? '50%' : '42%',
              border: isMini ? '1px solid #333' : '2px solid #333',
            }}
          />
        )}
        {!isMini && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[#f5f5f0] z-[2]" />
        )}
      </div>
    </div>
  );
}

/* ─── Desktop: Now Playing Card ─── */

export function NowPlayingCard({
  sectionId,
  onColorExtracted,
  children,
}: {
  sectionId: string;
  onColorExtracted?: (color: ThemeColor) => void;
  children?: ReactNode;
}) {
  const config = SECTION_TRACKS[sectionId] || SECTION_TRACKS.hero;
  const track = useTrackData(config.id, config.artist);

  // Report dominant color upstream
  const colorKey = track
    ? `${track.dominantColor.r},${track.dominantColor.g},${track.dominantColor.b}`
    : '';

  useEffect(() => {
    if (track?.dominantColor && onColorExtracted) {
      onColorExtracted(track.dominantColor);
    }
  }, [colorKey, onColorExtracted, track?.dominantColor]);

  if (!track) return null;

  const allTrackIds = Object.values(SECTION_TRACKS).map((t) => t.id);

  return (
    <div className="now-playing-card fixed left-6 top-1/2 -translate-y-1/2 z-50">
      {/* Nav labels slot */}
      {children && <div className="w-full mb-5">{children}</div>}

      <VinylRecord albumArt={track.albumArt} size={180} />

      <div className="text-center w-full mt-3">
        <p className="text-sm font-semibold truncate">{track.title}</p>
        {track.artist && (
          <p className="text-[0.65rem] text-gray-400 mt-0.5">{track.artist}</p>
        )}
      </div>

      {/* Pre-render all iframes, show only the active one */}
      <div className="relative mt-3 w-full" style={{ height: 80 }}>
        {allTrackIds.map((id) => (
          <iframe
            key={id}
            src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="rounded-xl w-full absolute inset-0"
            style={{
              opacity: id === track.trackId ? 1 : 0,
              pointerEvents: id === track.trackId ? 'auto' : 'none',
              transition: 'opacity 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile: Now Playing Toast ─── */

export function NowPlayingToast({
  sectionId,
  onColorExtracted,
  inline,
}: {
  sectionId: string;
  onColorExtracted?: (color: ThemeColor) => void;
  inline?: boolean;
}) {
  const config = SECTION_TRACKS[sectionId] || SECTION_TRACKS.hero;
  const track = useTrackData(config.id, config.artist);
  const [expanded, setExpanded] = useState(false);

  const colorKey = track
    ? `${track.dominantColor.r},${track.dominantColor.g},${track.dominantColor.b}`
    : '';

  useEffect(() => {
    if (track?.dominantColor && onColorExtracted) {
      onColorExtracted(track.dominantColor);
    }
  }, [colorKey, onColorExtracted, track?.dominantColor]);

  if (!track) return null;

  return (
    <div className={`${inline ? 'mx-auto max-w-sm' : 'fixed bottom-[4.5rem] left-3 right-3 z-50'} flex flex-col items-stretch`}>
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: expanded ? 80 : 0,
          opacity: expanded ? 1 : 0,
          marginBottom: expanded ? 8 : 0,
          boxShadow: expanded ? '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <iframe
          src={`https://open.spotify.com/embed/track/${track.trackId}?utm_source=generator&theme=0`}
          width="100%"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="block"
        />
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="now-playing-toast w-full"
      >
        <VinylRecord albumArt={track.albumArt} size={36} />

        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-semibold truncate">{track.title}</p>
          {track.artist && (
            <p className="text-[0.55rem] text-gray-400">{track.artist}</p>
          )}
        </div>

        <svg
          className="w-5 h-5 text-[#1DB954] flex-shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </button>
    </div>
  );
}
