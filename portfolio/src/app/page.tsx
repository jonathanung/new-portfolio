'use client';

import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  AnimatePresence,
} from 'framer-motion';
import {
  NowPlayingCard,
  NowPlayingToast,
  SECTION_TRACKS,
  type ThemeColor,
} from '@/components/NowPlaying';
import { workExperience, nonTechnicalExperience } from '@/data/work';
import { projects } from '@/data/projects';
import { extracurriculars } from '@/data/extracurriculars';
import { education } from '@/data/education';
import { contactInfo, socialLinks, heroStats } from '@/data/contact';
import type {
  WorkItem,
  ProjectItem,
  ExtracurricularItem,
  EducationItem,
} from '@/data/types';

/* ═══════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════ */

const SECTIONS = [
  { id: 'hero', title: 'About', bg: '#fefefe', expandable: false },
  { id: 'work', title: 'Experience', bg: '#f8faff', expandable: true },
  { id: 'projects', title: 'Projects', bg: '#faf8ff', expandable: true },
  { id: 'extras', title: 'Leadership', bg: '#f8fff9', expandable: true },
  { id: 'education', title: 'Education', bg: '#f8f9ff', expandable: true },
  { id: 'contact', title: 'Contact', bg: '#fffaf8', expandable: false },
] as const;

const ANGLE_STEP = 14;

const FEATURED_WORK = workExperience.find((w) => w.id === 'rivian-vw')!;
const FEATURED_EXTRA = extracurriculars.find(
  (e) => e.id === 'sfu-robot-soccer',
)!;
const FEATURED_EDU = education.find((e) => e.id === 'sfu')!;

const FEATURED_PROJECT = projects.find((p) => p.id === 'finesse-plugin')!;

/* ═══════════════════════════════════════════
   Hooks
   ═══════════════════════════════════════════ */

/* ─── Pastel helper: mix dominant color toward white ─── */
function toPastel(color?: ThemeColor, fallback = '#fefefe'): string {
  if (!color) return fallback;
  const r = Math.round(255 - (255 - color.r) * 0.12);
  const g = Math.round(255 - (255 - color.g) * 0.12);
  const b = Math.round(255 - (255 - color.b) * 0.12);
  return `rgb(${r}, ${g}, ${b})`;
}

/* ─── Pre-fetch all section song colors ─── */
function useAllSectionColors(): Record<string, ThemeColor> {
  const [colors, setColors] = useState<Record<string, ThemeColor>>({});

  useEffect(() => {
    Promise.all(
      Object.entries(SECTION_TRACKS).map(([id, config]) =>
        fetch(`/api/spotify?id=${config.id}`)
          .then((r) => r.json())
          .then(
            (d) =>
              [id, d.dominantColor || { r: 200, g: 200, b: 210 }] as [
                string,
                ThemeColor,
              ],
          )
          .catch(
            () =>
              [id, { r: 200, g: 200, b: 210 }] as [string, ThemeColor],
          ),
      ),
    ).then((results) => {
      setColors(Object.fromEntries(results));
    });
  }, []);

  return colors;
}

function useIsMobile(widthBreakpoint = 850, heightBreakpoint = 600) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.innerWidth < widthBreakpoint ||
        window.innerHeight < heightBreakpoint,
      );
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [widthBreakpoint, heightBreakpoint]);
  return isMobile;
}

/* ═══════════════════════════════════════════
   Carousel item types
   ═══════════════════════════════════════════ */

type CarouselItem =
  | { type: 'work'; data: WorkItem }
  | { type: 'project'; data: ProjectItem }
  | { type: 'extra'; data: ExtracurricularItem }
  | { type: 'education'; data: EducationItem };

function getCarouselItems(sectionId: string): CarouselItem[] {
  switch (sectionId) {
    case 'work':
      return [...workExperience, ...nonTechnicalExperience].map((w) => ({
        type: 'work' as const,
        data: w,
      }));
    case 'projects':
      return projects.map((p) => ({ type: 'project' as const, data: p }));
    case 'extras':
      return extracurriculars.map((e) => ({
        type: 'extra' as const,
        data: e,
      }));
    case 'education':
      return education.map((e) => ({
        type: 'education' as const,
        data: e,
      }));
    default:
      return [];
  }
}

/* ═══════════════════════════════════════════
   Page (orchestrator)
   ═══════════════════════════════════════════ */

export default function Page() {
  const isMobile = useIsMobile();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState<ThemeColor>({ r: 200, g: 200, b: 210 });
  const sectionColors = useAllSectionColors();

  useEffect(() => {
    document.body.style.overflow = expandedCard ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedCard]);

  const handleExpand = useCallback((id: string) => setExpandedCard(id), []);
  const handleClose = useCallback(() => setExpandedCard(null), []);
  const handleColor = useCallback((c: ThemeColor) => setThemeColor(c), []);

  return (
    <>
      <Decorations />

      {/* Gradient wash — album color fading from the left */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: `rgb(${themeColor.r}, ${themeColor.g}, ${themeColor.b})`,
          opacity: 0.5,
          maskImage: isMobile
            ? 'radial-gradient(ellipse at 50% 100%, black, transparent 70%)'
            : 'radial-gradient(ellipse at 8% 60%, black, transparent 55%)',
          WebkitMaskImage: isMobile
            ? 'radial-gradient(ellipse at 50% 100%, black, transparent 70%)'
            : 'radial-gradient(ellipse at 8% 60%, black, transparent 55%)',
          transition: 'background-color 0.5s ease',
        }}
      />

      {isMobile ? (
        <MobileLayout onExpand={handleExpand} onColorExtracted={handleColor} sectionColors={sectionColors} />
      ) : (
        <DesktopLayout
          onExpand={handleExpand}
          expandedCard={expandedCard}
          onColorExtracted={handleColor}
          sectionColors={sectionColors}
        />
      )}

      <AnimatePresence>
        {expandedCard && (
          <ExpandedOverlay
            sectionId={expandedCard}
            bg={toPastel(sectionColors[expandedCard], SECTIONS.find((s) => s.id === expandedCard)!.bg)}
            title={SECTIONS.find((s) => s.id === expandedCard)!.title}
            onClose={handleClose}
            isMobile={isMobile}
            themeColor={themeColor}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════
   Desktop Layout (fan carousel)
   ═══════════════════════════════════════════ */

function DesktopLayout({
  onExpand,
  expandedCard,
  onColorExtracted,
  sectionColors,
}: {
  onExpand: (id: string) => void;
  expandedCard: string | null;
  onColorExtracted?: (c: ThemeColor) => void;
  sectionColors: Record<string, ThemeColor>;
}) {
  const { scrollYProgress } = useScroll();
  const n = SECTIONS.length;
  const progress = useTransform(scrollYProgress, [0, 1], [0, n - 1]);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const lastIdx = useRef(0);

  // Track active section for NowPlaying card
  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      const rounded = Math.round(v);
      if (rounded !== lastIdx.current && rounded >= 0 && rounded < n) {
        lastIdx.current = rounded;
        setActiveSectionIdx(rounded);
      }
    });
    return unsub;
  }, [progress, n]);

  // Scroll up to close expanded view
  useEffect(() => {
    if (!expandedCard) return;
    let acc = 0;
    let timer: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        acc += Math.abs(e.deltaY);
        clearTimeout(timer);
        timer = setTimeout(() => {
          acc = 0;
        }, 400);
        if (acc > 300) {
          onExpand(''); // will be caught by parent
        }
      } else {
        acc = 0;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(timer);
    };
  }, [expandedCard, onExpand]);

  const scrollToCard = useCallback(
    (index: number) => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: (index / (n - 1)) * maxScroll,
        behavior: 'smooth',
      });
    },
    [n],
  );

  return (
    <>
      <div>
        {SECTIONS.map((s) => (
          <div
            key={`snap-${s.id}`}
            style={{ height: '100vh', scrollSnapAlign: 'start' }}
          />
        ))}
      </div>

      {SECTIONS.map((section, i) => (
        <FanCard
          key={section.id}
          index={i}
          total={n}
          progress={progress}
          bg={toPastel(sectionColors[section.id], section.bg)}
          onClick={() => scrollToCard(i)}
        >
          <CardFace
            sectionId={section.id}
            onExpand={
              section.expandable ? () => onExpand(section.id) : undefined
            }
          />
        </FanCard>
      ))}

      {/* Now Playing card with nav labels inside */}
      <NowPlayingCard sectionId={SECTIONS[activeSectionIdx].id} onColorExtracted={onColorExtracted}>
        <NavLabels
          sections={SECTIONS}
          progress={progress}
          onNavigate={scrollToCard}
        />
      </NowPlayingCard>
    </>
  );
}

/* ═══════════════════════════════════════════
   Mobile Layout (horizontal swipe)
   ═══════════════════════════════════════════ */

function MobileLayout({ onExpand, onColorExtracted, sectionColors }: { onExpand: (id: string) => void; onColorExtracted?: (c: ThemeColor) => void; sectionColors: Record<string, ThemeColor> }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToIndex = (i: number) => {
    scrollRef.current?.scrollTo({
      left: i * (scrollRef.current?.clientWidth ?? window.innerWidth),
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="fixed inset-0 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            className="w-screen flex-shrink-0 snap-start overflow-y-auto"
            style={{
              backgroundColor: toPastel(sectionColors[section.id], section.bg),
              height: '100dvh',
            }}
          >
            <div className="p-6 pt-10 pb-20 min-h-full flex flex-col">
              <CardFace
                sectionId={section.id}
                onExpand={
                  section.expandable
                    ? () => onExpand(section.id)
                    : undefined
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Now Playing toast */}
      <NowPlayingToast sectionId={SECTIONS[activeIndex].id} onColorExtracted={onColorExtracted} />

      {/* Bottom nav pill */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5">
        <p className="text-[0.5rem] tracking-[0.25em] uppercase text-gray-400 font-medium">
          {SECTIONS[activeIndex].title}
        </p>
        <div className="flex gap-2 items-center bg-white/70 backdrop-blur-md rounded-full px-3 py-2 border border-gray-200/50 shadow-sm">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollToIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-gray-800 w-5 h-2'
                  : 'bg-gray-300 w-2 h-2'
              }`}
              aria-label={s.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   Fan Card (desktop only)
   ═══════════════════════════════════════════ */

function FanCard({
  index,
  total,
  progress,
  bg,
  children,
  onClick,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  bg: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const rotate = useTransform(progress, (p) => (index - p) * -ANGLE_STEP);

  const zIndex = useTransform(progress, (p) => {
    const d = index - p;
    if (d < -0.5) return 1;
    return Math.round(total * 10 - Math.abs(d) * 10);
  });

  const opacity = useTransform(progress, (p) => {
    const d = index - p;
    if (d < -1.2) return 0.3;
    if (d < -0.3) return 0.5 + (d + 1.2) * 0.55;
    return 1;
  });

  return (
    <motion.div
      className="fixed card-shell cursor-pointer"
      style={{ rotate, zIndex, opacity, backgroundColor: bg }}
      onClick={onClick}
    >
      <div className="card-inner">{children}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Nav Labels (desktop only)
   ═══════════════════════════════════════════ */

function NavLabels({
  sections,
  progress,
  onNavigate,
}: {
  sections: readonly (typeof SECTIONS)[number][];
  progress: MotionValue<number>;
  onNavigate: (i: number) => void;
}) {
  return (
    <nav className="flex flex-col gap-2">
      {sections.map((s, i) => (
        <NavLabel
          key={s.id}
          index={i}
          progress={progress}
          title={s.title}
          onClick={() => onNavigate(i)}
        />
      ))}
    </nav>
  );
}

function NavLabel({
  index,
  progress,
  title,
  onClick,
}: {
  index: number;
  progress: MotionValue<number>;
  title: string;
  onClick: () => void;
}) {
  const isActive = useTransform(progress, (p) => Math.abs(index - p) < 0.5);
  const color = useTransform(isActive, (a) => (a ? '#1a1a2e' : '#c9cdd4'));
  const lineWidth = useTransform(isActive, (a) => (a ? 14 : 0));

  return (
    <motion.button className="nav-label" onClick={onClick} style={{ color }}>
      <motion.div
        className="h-[1.5px] rounded-full bg-current"
        style={{ width: lineWidth }}
      />
      {title}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════
   Decorations (desktop only)
   ═══════════════════════════════════════════ */

function Decorations({ overlay }: { overlay?: boolean } = {}) {
  return (
    <div className={`${overlay ? 'absolute z-0' : 'fixed z-[1]'} inset-0 pointer-events-none overflow-hidden`}>
      {/* ── Left edge ── */}
      <div className="absolute top-8 left-7 w-12 h-12 rounded-xl bg-indigo-200/30 deco-float" style={{ animationDuration: '18s' }} />
      <div className="absolute top-8 left-24 w-9 h-9 rounded-lg bg-rose-200/25 deco-float" style={{ animationDuration: '22s', animationDelay: '-4s' }} />
      <div className="absolute top-24 left-10 w-6 h-6 rounded-md bg-amber-200/30 deco-float" style={{ animationDuration: '16s', animationDelay: '-8s' }} />
      <div className="absolute bottom-28 left-7 w-14 h-8 rounded-xl bg-emerald-200/25 deco-float" style={{ animationDuration: '20s', animationDelay: '-2s' }} />
      <div className="absolute top-[38%] left-5 w-4 h-4 rounded bg-violet-200/25 deco-float" style={{ animationDuration: '24s', animationDelay: '-12s' }} />
      <div className="absolute top-[62%] left-9 w-8 h-5 rounded-lg bg-sky-200/20 deco-float" style={{ animationDuration: '19s', animationDelay: '-6s' }} />
      <div className="absolute top-[78%] left-4 w-5 h-8 rounded-md bg-pink-200/20 deco-float" style={{ animationDuration: '23s', animationDelay: '-17s' }} />
      <div className="absolute bottom-[42%] left-20 w-7 h-7 rounded-xl bg-indigo-200/20 deco-float" style={{ animationDuration: '21s', animationDelay: '-9s' }} />

      {/* ── Top band ── */}
      <div className="absolute top-[12%] left-[15%] w-16 h-10 rounded-2xl bg-sky-200/25 deco-float" style={{ animationDuration: '26s', animationDelay: '-6s' }} />
      <div className="absolute top-[6%] left-[35%] w-8 h-8 rounded-xl bg-pink-200/20 deco-float" style={{ animationDuration: '19s', animationDelay: '-14s' }} />
      <div className="absolute top-[4%] right-[28%] w-10 h-14 rounded-2xl bg-indigo-200/20 deco-float" style={{ animationDuration: '23s', animationDelay: '-3s' }} />
      <div className="absolute top-[15%] right-[12%] w-6 h-6 rounded-lg bg-amber-200/25 deco-float" style={{ animationDuration: '17s', animationDelay: '-9s' }} />
      <div className="absolute top-[3%] left-[52%] w-6 h-10 rounded-xl bg-emerald-200/20 deco-float" style={{ animationDuration: '25s', animationDelay: '-18s' }} />
      <div className="absolute top-[10%] left-[68%] w-9 h-6 rounded-lg bg-violet-200/20 deco-float" style={{ animationDuration: '20s', animationDelay: '-11s' }} />
      <div className="absolute top-[8%] right-[42%] w-5 h-5 rounded-md bg-rose-200/25 deco-float" style={{ animationDuration: '28s', animationDelay: '-7s' }} />
      <div className="absolute top-[18%] left-[25%] w-7 h-4 rounded-lg bg-teal-200/20 deco-float" style={{ animationDuration: '22s', animationDelay: '-15s' }} />

      {/* ── Middle band ── */}
      <div className="absolute top-[30%] left-[22%] w-5 h-5 rounded-md bg-rose-200/20 deco-float" style={{ animationDuration: '21s', animationDelay: '-7s' }} />
      <div className="absolute top-[45%] left-[12%] w-10 h-6 rounded-xl bg-teal-200/25 deco-float" style={{ animationDuration: '25s', animationDelay: '-15s' }} />
      <div className="absolute top-[55%] left-[28%] w-7 h-7 rounded-lg bg-violet-200/20 deco-float" style={{ animationDuration: '18s', animationDelay: '-5s' }} />
      <div className="absolute top-[42%] right-[18%] w-12 h-8 rounded-2xl bg-sky-200/20 deco-float" style={{ animationDuration: '22s', animationDelay: '-11s' }} />
      <div className="absolute top-[35%] right-[8%] w-5 h-10 rounded-xl bg-emerald-200/20 deco-float" style={{ animationDuration: '20s', animationDelay: '-1s' }} />
      <div className="absolute top-[48%] left-[42%] w-6 h-6 rounded-md bg-amber-200/20 deco-float" style={{ animationDuration: '27s', animationDelay: '-13s' }} />
      <div className="absolute top-[38%] left-[55%] w-10 h-5 rounded-xl bg-pink-200/20 deco-float" style={{ animationDuration: '19s', animationDelay: '-8s' }} />
      <div className="absolute top-[52%] right-[30%] w-4 h-8 rounded-lg bg-indigo-200/20 deco-float" style={{ animationDuration: '24s', animationDelay: '-19s' }} />
      <div className="absolute top-[60%] right-[6%] w-8 h-8 rounded-xl bg-rose-200/20 deco-float" style={{ animationDuration: '16s', animationDelay: '-3s' }} />
      <div className="absolute top-[33%] left-[38%] w-5 h-12 rounded-2xl bg-sky-200/20 deco-float" style={{ animationDuration: '23s', animationDelay: '-16s' }} />

      {/* ── Bottom band ── */}
      <div className="absolute bottom-[20%] left-[18%] w-8 h-12 rounded-2xl bg-amber-200/20 deco-float" style={{ animationDuration: '24s', animationDelay: '-10s' }} />
      <div className="absolute bottom-[15%] left-[30%] w-6 h-6 rounded-lg bg-pink-200/25 deco-float" style={{ animationDuration: '19s', animationDelay: '-16s' }} />
      <div className="absolute bottom-[10%] right-[22%] w-14 h-9 rounded-2xl bg-indigo-200/20 deco-float" style={{ animationDuration: '27s', animationDelay: '-8s' }} />
      <div className="absolute bottom-[25%] right-[10%] w-5 h-5 rounded-md bg-rose-200/20 deco-float" style={{ animationDuration: '16s', animationDelay: '-13s' }} />
      <div className="absolute bottom-[8%] left-[45%] w-8 h-5 rounded-xl bg-teal-200/20 deco-float" style={{ animationDuration: '21s', animationDelay: '-4s' }} />
      <div className="absolute bottom-[30%] left-[50%] w-6 h-10 rounded-xl bg-violet-200/20 deco-float" style={{ animationDuration: '26s', animationDelay: '-12s' }} />
      <div className="absolute bottom-[5%] left-[62%] w-10 h-6 rounded-lg bg-emerald-200/20 deco-float" style={{ animationDuration: '18s', animationDelay: '-20s' }} />
      <div className="absolute bottom-[18%] right-[35%] w-7 h-7 rounded-xl bg-amber-200/20 deco-float" style={{ animationDuration: '22s', animationDelay: '-5s' }} />
      <div className="absolute bottom-[12%] left-[8%] w-9 h-5 rounded-lg bg-sky-200/25 deco-float" style={{ animationDuration: '20s', animationDelay: '-14s' }} />
      <div className="absolute bottom-[3%] right-[15%] w-5 h-9 rounded-xl bg-pink-200/20 deco-float" style={{ animationDuration: '25s', animationDelay: '-2s' }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   Card Face Router
   ═══════════════════════════════════════════ */

function CardFace({
  sectionId,
  onExpand,
}: {
  sectionId: string;
  onExpand?: () => void;
}) {
  switch (sectionId) {
    case 'hero':
      return <HeroFace />;
    case 'work':
      return (
        <SectionFace
          label="Career"
          title="Work Experience"
          onExpand={onExpand!}
          itemCount={workExperience.length + nonTechnicalExperience.length}
        >
          <FeaturedItem
            title={FEATURED_WORK.title}
            subtitle={FEATURED_WORK.organization}
            meta={FEATURED_WORK.period}
            description={FEATURED_WORK.description}
            tags={FEATURED_WORK.tags}
            image={FEATURED_WORK.image}
          />
        </SectionFace>
      );
    case 'projects':
      return (
        <SectionFace
          label="Building"
          title="Projects"
          onExpand={onExpand!}
          itemCount={projects.length}
        >
          <FeaturedItem
            title={FEATURED_PROJECT.title}
            subtitle=""
            meta=""
            description={FEATURED_PROJECT.description}
            tags={FEATURED_PROJECT.tags}
          />
        </SectionFace>
      );
    case 'extras':
      return (
        <SectionFace
          label="Community"
          title="Leadership"
          onExpand={onExpand!}
          itemCount={extracurriculars.length}
        >
          <FeaturedItem
            title={FEATURED_EXTRA.title}
            subtitle={FEATURED_EXTRA.organization}
            meta={FEATURED_EXTRA.period}
            description={FEATURED_EXTRA.description}
            tags={FEATURED_EXTRA.tags}
            image={FEATURED_EXTRA.image}
          />
        </SectionFace>
      );
    case 'education':
      return (
        <SectionFace
          label="Academic"
          title="Education"
          onExpand={onExpand!}
          itemCount={education.length}
        >
          <FeaturedItem
            title={FEATURED_EDU.title}
            subtitle={FEATURED_EDU.institution}
            meta={`${FEATURED_EDU.period} · ${FEATURED_EDU.location}`}
            description={FEATURED_EDU.description || ''}
            tags={FEATURED_EDU.tags}
            image={FEATURED_EDU.image}
          />
        </SectionFace>
      );
    case 'contact':
      return <ContactFace />;
    default:
      return null;
  }
}

/* ═══════════════════════════════════════════
   Card Faces
   ═══════════════════════════════════════════ */

function HeroFace() {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="w-20 h-20 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-gray-100 mb-5 relative flex-shrink-0">
        <Image
          src="/images/headshot.png"
          alt="Jonathan Ung"
          fill
          className="object-cover"
          sizes="80px"
          priority
        />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1.5 leading-[1.1]">
        Jonathan Ung
      </h1>
      <p className="text-sm md:text-sm text-gray-500 leading-relaxed mb-8 max-w-xs">
        Seeking to learn continuously and build scalable, reliable systems.
      </p>

      <div className="flex flex-wrap gap-6 mb-8">
        {heroStats.map((stat) => (
          <div key={stat.label}>
            <p className="text-xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-[0.5rem] text-gray-400 tracking-[0.2em] uppercase mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target={link.icon === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="text-[0.6rem] tracking-[0.12em] uppercase text-gray-400 hover:text-gray-800 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <p className="scroll-hint text-[0.5rem] tracking-[0.3em] uppercase text-gray-300 md:block hidden">
          Scroll to explore
        </p>
        <p className="scroll-hint text-[0.5rem] tracking-[0.3em] uppercase text-gray-300 md:hidden">
          Swipe to explore
        </p>
      </div>
    </div>
  );
}

function SectionFace({
  label,
  title,
  onExpand,
  itemCount,
  children,
}: {
  label: string;
  title: string;
  onExpand: () => void;
  itemCount: number;
  children: ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <p className="card-section-label">{label}</p>
      <h2 className="card-section-title">{title}</h2>

      <div className="featured-highlight">{children}</div>

      <div className="mt-auto pt-4 flex justify-center">
        <button className="see-all-btn" onClick={onExpand}>
          See all {itemCount} &rarr;
        </button>
      </div>
    </div>
  );
}

function FeaturedItem({
  title,
  subtitle,
  meta,
  description,
  tags,
  isWip,
  image,
}: {
  title: string;
  subtitle: string;
  meta: string;
  description: string;
  tags?: string[];
  isWip?: boolean;
  image?: string;
}) {
  return (
    <div className="flex gap-4 items-center">
      {/* Image slot */}
      {image && (
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-[0.55rem] tracking-[0.2em] uppercase text-gray-400 mb-2">
          Featured
        </p>
        <div className="flex items-start gap-2 mb-1">
          <h3 className="text-lg font-bold leading-tight">{title}</h3>
          {isWip && <span className="status-wip mt-0.5">WIP</span>}
        </div>
        {subtitle && (
          <p className="text-xs text-blue-600/70 font-medium mb-0.5">
            {subtitle}
          </p>
        )}
        {meta && <p className="text-[0.6rem] text-gray-400 mb-3">{meta}</p>}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContactFace() {
  return (
    <div className="h-full flex flex-col justify-center">
      <p className="card-section-label">Connect</p>
      <h2 className="card-section-title">
        Let&apos;s work
        <br />
        together.
      </h2>
      <p className="text-xs text-gray-500 leading-relaxed mb-6 max-w-xs">
        Open to collaborations, interesting projects, and new opportunities.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-[0.5rem] tracking-[0.25em] uppercase text-gray-400 mb-1">
            Email
          </p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-sm font-semibold hover:text-blue-600 transition-colors break-all"
          >
            {contactInfo.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-5">
          <div>
            <p className="text-[0.5rem] tracking-[0.25em] uppercase text-gray-400 mb-1">
              Location
            </p>
            <p className="text-xs font-medium">{contactInfo.location}</p>
          </div>
          <div>
            <p className="text-[0.5rem] tracking-[0.25em] uppercase text-gray-400 mb-1">
              Availability
            </p>
            <p className="text-xs font-medium">{contactInfo.availability}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target={link.icon === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="text-[0.6rem] tracking-[0.12em] uppercase text-gray-400 hover:text-gray-800 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Expanded Overlay (cyclical card carousel)
   ═══════════════════════════════════════════ */

const CARD_W = 320;
const CARD_GAP = 28;
const CARD_STEP = CARD_W + CARD_GAP;

function getCardInfo(item: CarouselItem) {
  const base = item.data;
  const info = {
    title: base.title,
    image: base.image,
    tags: base.tags || [],
    subtitle: '',
    meta: '',
    description: '',
    isWip: false,
  };

  switch (item.type) {
    case 'work':
      info.subtitle = item.data.organization;
      info.meta = `${item.data.period} · ${item.data.location}`;
      info.description = item.data.description;
      break;
    case 'project':
      info.description = item.data.description;
      info.isWip = item.data.status === 'wip';
      break;
    case 'extra':
      info.subtitle = item.data.organization;
      info.meta = item.data.period;
      info.description = item.data.description;
      break;
    case 'education':
      info.subtitle = item.data.institution;
      info.meta = `${item.data.period} · ${item.data.location}`;
      info.description = item.data.description || '';
      break;
  }

  return info;
}

function ExpandedOverlay({
  sectionId,
  bg,
  title,
  onClose,
  isMobile,
  themeColor,
}: {
  sectionId: string;
  bg: string;
  title: string;
  onClose: () => void;
  isMobile: boolean;
  themeColor?: ThemeColor;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const items = getCarouselItems(sectionId);
  const total = items.length;
  const touchStart = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Scroll up to close (desktop, only when detail modal is closed)
  useEffect(() => {
    if (isMobile || detailIndex !== null) return;
    let acc = 0;
    let timer: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        acc += Math.abs(e.deltaY);
        clearTimeout(timer);
        timer = setTimeout(() => {
          acc = 0;
        }, 400);
        if (acc > 300) {
          onClose();
        }
      } else {
        acc = 0;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(timer);
    };
  }, [onClose, isMobile, detailIndex]);

  // Keyboard navigation (cyclical)
  useEffect(() => {
    if (detailIndex !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')
        setActiveIndex((i) => (i - 1 + total) % total);
      if (e.key === 'ArrowRight')
        setActiveIndex((i) => (i + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, total, detailIndex]);

  // Touch swipe (cyclical)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        setActiveIndex((i) => (i + 1) % total);
      } else {
        setActiveIndex((i) => (i - 1 + total) % total);
      }
    }
  };

  const next = () => setActiveIndex((i) => (i + 1) % total);
  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);

  const centerOffset = containerWidth / 2 - CARD_W / 2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="expanded-overlay"
      style={{ backgroundColor: bg }}
    >
      {/* Album color tint */}
      {themeColor && (
        <>
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundColor: `rgba(${themeColor.r}, ${themeColor.g}, ${themeColor.b}, 0.36)`,
              transition: 'background-color 0.5s ease',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundColor: `rgb(${themeColor.r}, ${themeColor.g}, ${themeColor.b})`,
              opacity: 0.4,
              maskImage:
                'radial-gradient(ellipse at 30% 20%, black, transparent 70%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at 30% 20%, black, transparent 70%)',
              transition: 'background-color 0.5s ease',
            }}
          />
        </>
      )}

      {/* Floating shapes */}
      <Decorations overlay />

      {/* Header */}
      <div className="expanded-header relative z-[1]">
        <button className="back-btn" onClick={onClose}>
          &larr; Back
        </button>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-600">{title}</p>
          {!isMobile && (
            <p className="text-[0.6rem] text-gray-400">
              {activeIndex + 1} / {total}
            </p>
          )}
        </div>
      </div>

      {isMobile ? (
        /* ─── Mobile: vertical scrollable list ─── */
        <>
          <div className="flex-1 overflow-y-auto px-4 pb-24 relative z-[1]">
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {items.map((item, i) => (
                <ItemCard
                  key={`${item.type}-${i}`}
                  item={item}
                  onClick={() => setDetailIndex(i)}
                  isActive={false}
                />
              ))}
            </div>
          </div>

          {/* Song toast */}
          <div className="relative z-[1] pb-3">
            <NowPlayingToast sectionId={sectionId} inline />
          </div>
        </>
      ) : (
        /* ─── Desktop: horizontal cyclical carousel ─── */
        <>
          <div
            ref={containerRef}
            className="expanded-body flex items-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {items.map((item, i) => {
              let diff = i - activeIndex;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;
              if (Math.abs(diff) > 5) return null;

              const x = centerOffset + diff * CARD_STEP;
              const isActive = diff === 0;

              return (
                <div
                  key={`${item.type}-${i}`}
                  className="absolute transition-all duration-[400ms] ease-out"
                  style={{
                    width: CARD_W,
                    transform: `translateX(${x}px) scale(${isActive ? 1.15 : 0.85})`,
                    opacity: Math.max(0, 1 - Math.abs(diff) * 0.2),
                    zIndex: 10 - Math.abs(diff),
                  }}
                >
                  <ItemCard
                    item={item}
                    onClick={() => isActive ? setDetailIndex(i) : setActiveIndex(i)}
                    isActive={isActive}
                  />
                </div>
              );
            })}

            {/* Arrows */}
            <button
              className="carousel-arrow carousel-arrow-left hidden md:flex"
              onClick={prev}
              aria-label="Previous"
            >
              &#8249;
            </button>
            <button
              className="carousel-arrow carousel-arrow-right hidden md:flex"
              onClick={next}
              aria-label="Next"
            >
              &#8250;
            </button>
          </div>

          {/* Dots */}
          <div className="carousel-dots relative z-[1]">
            {items.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to item ${i + 1}`}
              />
            ))}
          </div>

          {/* Song toast */}
          <div className="relative z-[1] pb-3">
            <NowPlayingToast sectionId={sectionId} inline />
          </div>
        </>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {detailIndex !== null && (
          <DetailModal
            item={items[detailIndex]}
            onClose={() => setDetailIndex(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Item Card (compact card for carousel)
   ═══════════════════════════════════════════ */

function ItemCard({
  item,
  onClick,
  isActive,
}: {
  item: CarouselItem;
  onClick: () => void;
  isActive: boolean;
}) {
  const info = getCardInfo(item);

  return (
    <button
      onClick={onClick}
      className={`item-card w-full text-left ${isActive ? 'active' : ''}`}
    >
      {info.image && (
        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 flex-shrink-0">
          <Image
            src={info.image}
            alt={info.title}
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
      )}
      <div className="flex items-start gap-2 mb-1">
        <h3 className="text-sm font-semibold leading-tight line-clamp-1">
          {info.title}
        </h3>
        {info.isWip && (
          <span className="status-wip flex-shrink-0">WIP</span>
        )}
      </div>
      {info.subtitle && (
        <p className="text-xs text-blue-600/70 font-medium mb-0.5 line-clamp-1">
          {info.subtitle}
        </p>
      )}
      {info.meta && (
        <p className="text-[0.6rem] text-gray-400 mb-2">{info.meta}</p>
      )}
      <p className="text-[0.65rem] text-gray-500 leading-relaxed line-clamp-3 flex-1">
        {info.description}
      </p>
      {info.tags && info.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          {info.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-pill text-[0.5rem]">
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════
   Detail Modal
   ═══════════════════════════════════════════ */

function DetailModal({
  item,
  onClose,
}: {
  item: CarouselItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className="detail-modal-content"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors text-sm"
        >
          ✕
        </button>
        <ItemSlide item={item} />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Item Slides
   ═══════════════════════════════════════════ */

function ItemSlide({ item }: { item: CarouselItem }) {
  switch (item.type) {
    case 'work':
      return <WorkSlide data={item.data} />;
    case 'project':
      return <ProjectSlide data={item.data} />;
    case 'extra':
      return <ExtraSlide data={item.data} />;
    case 'education':
      return <EduSlide data={item.data} />;
  }
}

function WorkSlide({ data }: { data: WorkItem }) {
  return (
    <div className="py-4">
      <h3 className="text-xl md:text-2xl font-bold mb-1">{data.title}</h3>
      <p className="text-sm text-blue-600/80 font-medium mb-1">
        {data.organization}
      </p>
      <p className="text-xs text-gray-400 mb-5">
        {data.period} &middot; {data.location}
      </p>

      {data.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          {data.description}
        </p>
      )}

      {data.bullets.length > 0 && (
        <ul className="space-y-2.5 mb-5">
          {data.bullets.map((b, i) => (
            <li
              key={i}
              className="text-sm text-gray-600 leading-relaxed flex gap-2.5"
            >
              <span className="text-gray-300 mt-0.5 flex-shrink-0">&bull;</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {data.technologies.length > 0 && (
        <div>
          <p className="text-[0.55rem] tracking-[0.2em] uppercase text-gray-400 mb-2">
            Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data.technologies.map((t) => (
              <span key={t} className="tag-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          Visit &rarr;
        </a>
      )}
    </div>
  );
}

function ProjectSlide({ data }: { data: ProjectItem }) {
  return (
    <div className="py-4">
      <div className="flex items-start gap-2 mb-1">
        <h3 className="text-xl md:text-2xl font-bold">{data.title}</h3>
        {data.status === 'wip' && (
          <span className="status-wip mt-1.5">WIP</span>
        )}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        {data.description}
      </p>

      {data.bullets && data.bullets.length > 0 && (
        <ul className="space-y-2.5 mb-5">
          {data.bullets.map((b, i) => (
            <li
              key={i}
              className="text-sm text-gray-600 leading-relaxed flex gap-2.5"
            >
              <span className="text-gray-300 mt-0.5 flex-shrink-0">&bull;</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {data.technologies.length > 0 && (
        <div>
          <p className="text-[0.55rem] tracking-[0.2em] uppercase text-gray-400 mb-2">
            Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data.technologies.map((t) => (
              <span key={t} className="tag-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.tags && data.tags.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {data.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          View project &rarr;
        </a>
      )}
    </div>
  );
}

function ExtraSlide({ data }: { data: ExtracurricularItem }) {
  return (
    <div className="py-4">
      <h3 className="text-xl md:text-2xl font-bold mb-1">{data.title}</h3>
      <p className="text-sm text-blue-600/80 font-medium mb-1">
        {data.organization}
      </p>
      <p className="text-xs text-gray-400 mb-5">
        {data.period}
        {data.location && <> &middot; {data.location}</>}
      </p>

      {data.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          {data.description}
        </p>
      )}

      {data.bullets && data.bullets.length > 0 && (
        <ul className="space-y-2.5 mb-5">
          {data.bullets.map((b, i) => (
            <li
              key={i}
              className="text-sm text-gray-600 leading-relaxed flex gap-2.5"
            >
              <span className="text-gray-300 mt-0.5 flex-shrink-0">&bull;</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {data.technologies && data.technologies.length > 0 && (
        <div>
          <p className="text-[0.55rem] tracking-[0.2em] uppercase text-gray-400 mb-2">
            Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data.technologies.map((t) => (
              <span key={t} className="tag-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          Visit &rarr;
        </a>
      )}
    </div>
  );
}

function EduSlide({ data }: { data: EducationItem }) {
  return (
    <div className="py-4">
      <h3 className="text-xl md:text-2xl font-bold mb-1">{data.title}</h3>
      <p className="text-sm text-blue-600/80 font-medium mb-1">
        {data.institution}
      </p>
      <p className="text-xs text-gray-400 mb-5">
        {data.period} &middot; {data.location}
      </p>

      {data.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          {data.description}
        </p>
      )}

      {data.courses && data.courses.length > 0 && (
        <div>
          <p className="text-[0.55rem] tracking-[0.2em] uppercase text-gray-400 mb-2">
            Key Courses
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data.courses.map((c) => (
              <span key={c} className="tag-pill">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
