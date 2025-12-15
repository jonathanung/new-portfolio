'use client'

import { useState, useMemo, ReactNode, useEffect } from 'react'
import Image from 'next/image'
import ParticleBackground from '../components/ParticleBackground'

type ThemeMode = 'dark' | 'light'

type CardItem = {
  title: string
  meta: string
  tags?: string[]
  span?: string
}

const workExperience: CardItem[] = [
  {
    title: 'Infotainment System Developer Co-op',
    meta: 'Rivian & Volkswagen Group Technologies · May 2025 – Dec 2025',
    tags: ['Android', 'QNX', 'Bluetooth', 'Automotive'],
    span: 'md:col-span-3'
  },
  {
    title: 'Part-time Software Engineering PM',
    meta: 'Whitebox Coworking · May 2025 – Sep 2025',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    span: 'md:col-span-3'
  },
  {
    title: 'Code Sensei · Assistant Center Director',
    meta: 'Code Ninjas Richmond · Aug 2023 – Aug 2025',
    tags: ['Unity', 'Mentorship', 'Curriculum'],
    span: 'md:col-span-2'
  },
  {
    title: 'Software Engineering Intern',
    meta: 'MVP IT Solutions · Aug 2022 – Nov 2022',
    tags: ['Flutter', 'Scrum', 'API Optimization'],
    span: 'md:col-span-2'
  }
]

const extracurriculars: CardItem[] = [
  {
    title: 'Software Team Lead',
    meta: 'SFU Robot Soccer Club · Feb 2024 – Present',
    tags: ['C++', 'Autonomous Agents']
  },
  {
    title: 'Executive Advisor & Hackathon Lead',
    meta: 'Langara Computer Science Club · Apr 2023 – Apr 2024',
    tags: ['Event Ops', 'Leadership']
  },
  {
    title: 'Hackathon Judge',
    meta: 'StormHacks 2025 · Vancouver',
    tags: ['Community', 'Mentorship']
  },
  {
    title: 'Orientation Speaker',
    meta: 'Langara College · Nov 2023 – Dec 2023',
    tags: ['Speaking']
  }
]

const projects: CardItem[] = [
  {
    title: 'AutoStop',
    meta: 'Self-braking vehicle simulator powered by CARLA + CV.',
    tags: ['PyQt', 'Open3D', 'OpenCV'],
    span: 'md:col-span-3'
  },
  {
    title: 'WeMote',
    meta: 'ESP32 motion controller for custom Pygame titles. DreamHacks winner.',
    tags: ['ESP32', 'Sockets', 'IMU'],
    span: 'md:col-span-3'
  },
  {
    title: 'Pignance',
    meta: 'LLM-assisted finance literacy companion built with Next.js + FastAPI.',
    tags: ['Gemma2', 'OCR', 'Next.js'],
    span: 'md:col-span-3'
  },
  {
    title: 'ChronoCal',
    meta: 'AI-first calendar with CRUD operations and expense tracking.',
    tags: ['MongoDB', 'Express', 'GPT-4'],
    span: 'md:col-span-3'
  }
]

const education: CardItem[] = [
  {
    title: 'B.Sc. Computing Science, Statistics Minor',
    meta: 'Simon Fraser University · 2024 – 2027'
  },
  {
    title: 'Computer Science Transfer',
    meta: 'Langara College · 2021 – 2024'
  },
  {
    title: 'Web Development Certificate',
    meta: 'Coding Dojo · 2022'
  }
]

const heroStats = [
  { label: 'Hackathons led', value: '3' },
  { label: 'Prototypes shipped', value: '20+' },
  { label: 'Years building', value: '6+' }
]

export default function Page() {
  const [introComplete, setIntroComplete] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const contentClass = useMemo(
    () =>
      `relative z-10 transition-opacity duration-700 ${introComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`,
    [introComplete]
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const initialTheme: ThemeMode = media.matches ? 'dark' : 'light'
    setTheme(initialTheme)

    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'dark' : 'light')
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-foreground)] transition-colors duration-500 overflow-hidden">
      <ParticleBackground theme={theme} onIntroComplete={() => setIntroComplete(true)} />

      <button
        onClick={toggleTheme}
        aria-label="Toggle color mode"
        className="fixed top-6 right-6 z-20 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--contact-pill-bg)] text-[var(--color-foreground)] text-sm tracking-[0.2em]"
      >
        {theme === 'dark' ? 'BRIGHT' : 'DARK'}
      </button>

      <div className={contentClass} aria-hidden={!introComplete}>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <section id="landing" className="pt-28 lg:pt-32 pb-16 lg:pb-24">
            <div className="glass-panel liquid-hero p-8 sm:p-10">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                      <Image
                        src="/images/headshot.png"
                        alt="Jonathan Ung headshot"
                        fill
                        sizes="(max-width: 640px) 128px, 160px"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.5em] text-[var(--color-muted)]">Jonathan Ung</p>
                      <h1 className="text-3xl sm:text-4xl font-semibold">Software Developer & CV/AI Enthusiast</h1>
                      <p className="text-sm mt-3 text-[var(--color-muted)]">
                        Vancouver, BC · Currently building for Rivian &amp; Volkswagen Group Technologies
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-3 tag bg-transparent border border-[rgba(255,255,255,0.09)] text-[var(--color-secondary)]">
                      <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                      Systems · Computer Vision · Education
                    </div>
                    <p className="text-lg text-[var(--color-muted)] max-w-2xl">
                      I build calm, tangible experiences: Android infotainment, ESP32 motion controllers, AI-assisted
                      finance tools, and workshops that bring new technologists up to speed. Every project balances
                      engineering rigor with playful experimentation.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="mailto:jua10@sfu.ca"
                      className="contact-pill bg-[var(--color-secondary)]/15 border-[var(--color-secondary)] text-[var(--color-secondary)]"
                    >
                      Email me
                    </a>
                    <a href="/Jonathan_Ung_Resume.pdf" className="contact-pill">
                      Download CV
                    </a>
                    <a href="https://github.com/jonathanung" className="contact-pill">
                      GitHub
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/5">
                    {heroStats.map(stat => (
                      <div key={stat.label}>
                        <p className="text-3xl font-semibold">{stat.value}</p>
                        <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel flex-1 p-8 space-y-6 max-w-xl">
                  <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">Current Focus</p>
                  <h2 className="text-2xl font-semibold text-[var(--color-secondary)]">
                    Liquid navigation for ambient systems
                  </h2>
                  <div className="space-y-3 text-sm text-[var(--color-muted)]">
                    <p>Prototyping fluid dashboards, haptics, and sensing surfaces for spatial ops teams.</p>
                    <p>Designing with purpose, pairing hardware intuition with web-native craft.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['Prototyping', 'Systems Architecture', 'Mentorship'].map(label => (
                      <span key={label} className="tag">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Section heading="Work Experience" subheading="Selected roles, ready to drill down soon.">
            <BentoGrid items={workExperience} />
          </Section>

          <Section heading="Extracurriculars" subheading="Signals outside the office.">
            <BentoGrid items={extracurriculars} columns="md:grid-cols-3" />
          </Section>

          <Section heading="Projects" subheading="A tiny sample of systems work.">
            <BentoGrid items={projects} />
          </Section>

          <section id="education" className="py-16 space-y-6">
            <header>
              <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">Education</p>
              <h2 className="section-heading">Foundation</h2>
            </header>
            <div className="grid gap-6 md:grid-cols-2">
              {education.map(item => (
                <article key={item.title} className="bento-card">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">{item.meta}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="py-16">
            <div className="glass-panel p-10 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">Contact</p>
                  <h2 className="section-heading mb-1">Let&apos;s orchestrate something</h2>
                  <p className="text-[var(--color-muted)] max-w-2xl">
                    I prefer thoughtful notes. Reach out for advisory work, collaborations, or simply to trade systems stories.
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <a href="mailto:jua10@sfu.ca" className="contact-pill bg-[var(--color-secondary)] text-black">
                    Email me
                  </a>
                  <a href="https://www.linkedin.com" className="contact-pill">
                    LinkedIn
                  </a>
                  <a href="https://cal.com" className="contact-pill">
                    Schedule a chat
                  </a>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bento-card">
                  <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">Studio</p>
                  <p className="text-2xl font-semibold text-[var(--color-foreground)]">Vancouver, BC · Remote ready</p>
                  <p className="text-sm text-[var(--color-muted)] mt-2">Collaborating across PST through GMT+2.</p>
                </div>
                <div className="bento-card">
                  <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">Availability</p>
                  <p className="text-2xl font-semibold text-[var(--color-foreground)]">Booking early 2026</p>
                  <p className="text-sm text-[var(--color-muted)] mt-2">Advisory chats + part-time collaborations.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

type BentoGridProps = {
  items: CardItem[]
  columns?: string
}

function BentoGrid({ items, columns }: BentoGridProps) {
  const gridCols = columns ?? 'md:grid-cols-6'
  return (
    <div className={`grid grid-cols-1 gap-6 ${gridCols}`}>
      {items.map(item => (
        <article key={item.title} className={`bento-card ${item.span ?? ''} group cursor-pointer`}>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <span className="text-[var(--color-secondary)] text-xs uppercase tracking-[0.4em]">●</span>
          </div>
          <p className="text-sm text-[var(--color-muted)] mt-1">{item.meta}</p>
          {item.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map(tag => (
                <span key={tag} className="tag text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="click-hint">click me!</span>
        </article>
      ))}
    </div>
  )
}

type SectionProps = {
  heading: string
  subheading: string
  children: ReactNode
}

function Section({ heading, subheading, children }: SectionProps) {
  return (
    <section className="py-16 space-y-8">
      <header className="space-y-3">
        <h2 className="section-heading">{heading}</h2>
        <p className="text-base text-[var(--color-muted)]">{subheading}</p>
      </header>
      {children}
    </section>
  )
}
