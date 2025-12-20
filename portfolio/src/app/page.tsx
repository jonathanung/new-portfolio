'use client'

import { useState, useMemo, ReactNode, useEffect } from 'react'
import Image from 'next/image'
import ParticleBackground from '@/components/ParticleBackground'
import RoleModal from '@/components/RoleModal'
import ResumeModal from '@/components/ResumeModal'
import SocialIcons from '@/components/SocialIcons'
import { workExperience } from '@/data/work'
import { extracurriculars } from '@/data/extracurriculars'
import { projects } from '@/data/projects'
import { education } from '@/data/education'
import { skillCategories } from '@/data/skills'
import { heroStats, contactInfo } from '@/data/contact'
import type { WorkItem, ExtracurricularItem, ProjectItem, EducationItem } from '@/data/types'

type ThemeMode = 'dark' | 'light'
type ModalItem = WorkItem | ExtracurricularItem | ProjectItem | EducationItem

export default function Page() {
  const [introComplete, setIntroComplete] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

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

  const openModal = (item: ModalItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedItem(null), 400)
  }

  const skipIntro = () => {
    setIntroComplete(true)
  }

  // Skills carousel state
  const [currentSkillCategory, setCurrentSkillCategory] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoPlayActive, setAutoPlayActive] = useState(true)
  
  // Auto-cycle every 10 seconds until interacted with
  useEffect(() => {
    if (!autoPlayActive || !introComplete) return
    
    const interval = setInterval(() => {
      setSlideDirection('right')
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSkillCategory(prev => (prev + 1) % skillCategories.length)
        setIsAnimating(false)
      }, 300)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [autoPlayActive, introComplete])
  
  const nextCategory = () => {
    if (isAnimating) return
    setAutoPlayActive(false) // Stop auto-play on interaction
    setSlideDirection('right')
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSkillCategory(prev => (prev + 1) % skillCategories.length)
      setIsAnimating(false)
    }, 300)
  }
  
  const prevCategory = () => {
    if (isAnimating) return
    setAutoPlayActive(false)
    setSlideDirection('left')
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSkillCategory(prev => (prev - 1 + skillCategories.length) % skillCategories.length)
      setIsAnimating(false)
    }, 300)
  }
  
  const goToCategory = (index: number) => {
    if (isAnimating || index === currentSkillCategory) return
    setAutoPlayActive(false)
    setSlideDirection(index > currentSkillCategory ? 'right' : 'left')
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSkillCategory(index)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-foreground)] transition-colors duration-500 overflow-hidden">
      <ParticleBackground theme={theme} onIntroComplete={() => setIntroComplete(true)} />

      {/* Skip Intro Button */}
      {!introComplete && (
        <button onClick={skipIntro} className="skip-intro-btn">
          Skip Intro →
        </button>
      )}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle color mode"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[var(--color-border)] bg-[var(--contact-pill-bg)] text-[var(--color-foreground)] text-xs sm:text-sm tracking-[0.2em] hover:border-[var(--color-secondary)] transition-all duration-300"
      >
        {theme === 'dark' ? 'BRIGHT' : 'DARK'}
      </button>

      {/* Social Icons */}
      {introComplete && <SocialIcons theme={theme} onResumeClick={() => setIsResumeOpen(true)} />}

      {/* Main Content */}
      <div className={contentClass} aria-hidden={!introComplete}>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pl-20 lg:pl-24">
          {/* Hero Section */}
          <section id="landing" className="pt-20 sm:pt-28 lg:pt-32 pb-8 lg:pb-12">
            <div className="glass-panel liquid-hero p-6 sm:p-8 lg:p-10">
              {/* Hero Content */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-2xl sm:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex-shrink-0">
                  <Image
                    src="/images/headshot.png"
                    alt="Jonathan Ung headshot"
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[var(--color-muted)] mb-2">Jonathan Ung</p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                    <span className="gradient-text">Software Engineering Intern</span>
                  </h1>
                  <p className="text-xs sm:text-sm mt-2 sm:mt-3 text-[var(--color-muted)]">
                    Vancouver, BC · Seeking internship opportunities for Summer 2026 and beyond
                  </p>
                </div>
              </div>

              {/* Tags and Description */}
              <div className="space-y-4 mb-8">
                <div className="inline-flex items-center gap-2 sm:gap-3 tag bg-transparent border border-[rgba(255,255,255,0.09)] text-[var(--color-secondary)] text-xs sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)] animate-pulse" />
                  Backend Systems · Computer Vision · Robotics
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-[var(--color-muted)] max-w-2xl">
                  I build scalable systems and intelligent applications. From Android infotainment platforms at Rivian 
                  to autonomous robot soccer at SFU, I combine engineering rigor with hands-on experimentation.
                </p>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="mailto:jua10@sfu.ca"
                  className="contact-pill bg-[var(--color-secondary)]/15 border-[var(--color-secondary)] text-[var(--color-secondary)] text-sm"
                >
                  Email me
                </a>
                <button onClick={() => setIsResumeOpen(true)} className="contact-pill text-sm">
                  View Resume
                </button>
                <a href="https://github.com/jonathanung" target="_blank" rel="noopener noreferrer" className="contact-pill text-sm">
                  GitHub
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                {heroStats.map(stat => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text">{stat.value}</p>
                    <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[var(--color-muted)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Current Focus Banner */}
          <section className="mb-12 lg:mb-16">
            <div className="accent-banner">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">Current Focus</p>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                    Backend Architecture & Autonomous Systems
                  </h2>
                  <p className="text-sm text-white/70 mt-2 max-w-xl">
                    Building scalable systems at Rivian while leading autonomous agent development for SFU Robot Soccer.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Distributed Systems', 'Computer Vision', 'Robotics'].map(label => (
                    <span key={label} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/20">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <Section heading="Work Experience" subheading="Professional roles and contributions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {workExperience.map(item => (
                <CardItem key={item.id} item={item} onClick={() => openModal(item)} theme={theme} />
              ))}
            </div>
          </Section>

          {/* Extracurriculars */}
          <Section heading="Leadership & Community" subheading="Clubs, events, and mentorship">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {extracurriculars.map(item => (
                <CardItem key={item.id} item={item} onClick={() => openModal(item)} theme={theme} compact />
              ))}
            </div>
          </Section>

          {/* Skills Section - Carousel */}
          <section id="skills" className="py-12 sm:py-16 space-y-6 sm:space-y-8">
            <header className="space-y-2 sm:space-y-3">
              <h2 className="section-heading">Skills & Technologies</h2>
              <p className="text-sm sm:text-base text-[var(--color-muted)]">Tools and technologies I work with</p>
            </header>
            
            <div className="skills-carousel">
              {/* Navigation Arrows */}
              <button 
                onClick={prevCategory}
                className="carousel-arrow carousel-arrow-left"
                aria-label="Previous category"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextCategory}
                className="carousel-arrow carousel-arrow-right"
                aria-label="Next category"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Carousel Content */}
              <div className="carousel-track-container">
                <div 
                  className={`carousel-content ${isAnimating ? `slide-out-${slideDirection}` : 'slide-in'}`}
                  key={currentSkillCategory}
                >
                  <h3 className="carousel-category-title">
                    {skillCategories[currentSkillCategory].title}
                  </h3>
                  
                  <div className="skill-bubble-container">
                    {skillCategories[currentSkillCategory].skills.map((skill, index) => (
                      <span
                        key={skill}
                        className="skill-bubble"
                        style={{ animationDelay: `${index * 0.03}s` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="carousel-dots">
                {skillCategories.map((cat, index) => (
                  <button
                    key={cat.id}
                    onClick={() => goToCategory(index)}
                    className={`carousel-dot ${index === currentSkillCategory ? 'active' : ''}`}
                    aria-label={`Go to ${cat.title}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Education */}
          <section id="education" className="py-12 sm:py-16 space-y-6">
            <header>
              <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">Education</p>
              <h2 className="section-heading">Academic Background</h2>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {education.map(item => {
                const canSeeMore = item.seeMore !== false
                return (
                  <article 
                    key={item.id} 
                    className={`bento-card ${canSeeMore ? 'cursor-pointer' : ''}`}
                    onClick={() => canSeeMore && openModal(item)}
                  >
                    <div className="card-thumbnail">
                      <Image
                        src={item.image}
                        alt={item.institution}
                        fill
                        className="object-contain bg-white p-1"
                        sizes="48px"
                      />
                    </div>
                    
                    <div className="pr-14">
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-[var(--color-secondary)]">{item.institution}</p>
                      <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">{item.period}</p>
                    </div>
                    {canSeeMore && <span className="click-hint">view details</span>}
                  </article>
                )
              })}
            </div>
          </section>

          {/* Projects - Masonry Style */}
          <Section heading="Projects" subheading="A selection of my work">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} onClick={() => openModal(project)} theme={theme} />
              ))}
            </div>
          </Section>

          {/* Contact */}
          <section id="contact" className="py-12 sm:py-16">
            <div className="glass-panel p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">Contact</p>
                  <h2 className="section-heading mb-1">Let&apos;s Connect</h2>
                  <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-xl">
                    Open to collaborations, interesting projects, and new opportunities. 
                    Feel free to reach out!
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a href="mailto:jua10@sfu.ca" className="contact-pill bg-[var(--color-secondary)] text-black hover:text-black text-sm">
                    Email me
                  </a>
                  <a href="https://www.linkedin.com/in/jonathankeithung/" target="_blank" rel="noopener noreferrer" className="contact-pill text-sm">
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bento-card">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">Location</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--color-foreground)]">{contactInfo.location}</p>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-2">Remote-friendly · {contactInfo.timezone}</p>
                </div>
                <div className="bento-card">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">Availability</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--color-foreground)]">{contactInfo.availability}</p>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-2">Open to relocating for high-impact opportunities</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Modal */}
      <RoleModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
        theme={theme}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        theme={theme}
      />
    </div>
  )
}

// Project Card Component - for masonry layout
type ProjectCardProps = {
  project: ProjectItem
  onClick: () => void
  theme: ThemeMode
}

function ProjectCard({ project, onClick, theme }: ProjectCardProps) {
  const canSeeMore = project.seeMore !== false
  
  const handleClick = () => {
    if (canSeeMore) {
      onClick()
    } else {
      // For non-seeMore projects, go directly to the link
      window.open(project.link, '_blank')
    }
  }
  
  return (
    <article 
      className="bento-card break-inside-avoid mb-4 sm:mb-6 cursor-pointer"
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="card-thumbnail">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      
      <div className="pr-14">
        <div className="flex items-start gap-2 mb-1">
          <h3 className="text-lg sm:text-xl font-semibold">
            {project.title}
          </h3>
          {project.status === 'wip' && (
            <span className="px-1.5 py-0.5 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wider rounded status-wip flex-shrink-0">
              WIP
            </span>
          )}
        </div>
        {/* Full description - no line clamp */}
        <p className="text-sm text-[var(--color-muted)]">
          {project.description}
        </p>
      </div>
      
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className={`tag text-[0.65rem] sm:text-xs ${
                tag === 'Featured' ? 'tag-featured' :
                tag === 'AI' ? 'tag-ai' :
                tag === 'CV/AI' ? 'tag-cv' :
                tag === 'Web' ? 'tag-web' :
                tag === 'Hardware' ? 'tag-hardware' :
                tag === 'Game Dev' ? 'tag-hardware' : ''
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Show appropriate hint based on seeMore */}
      <span className="click-hint">{canSeeMore ? 'view details' : 'view code'}</span>
    </article>
  )
}

// Unified Card Component for Work/Extracurriculars
type CardItemProps = {
  item: WorkItem | ExtracurricularItem | ProjectItem
  onClick: () => void
  theme: ThemeMode
  compact?: boolean
}

function CardItem({ item, onClick, theme, compact }: CardItemProps) {
  const isProject = 'technologies' in item && !('organization' in item)
  const hasOrg = 'organization' in item
  const canSeeMore = item.seeMore !== false
  
  const handleClick = () => {
    if (canSeeMore) {
      onClick()
    }
  }
  
  return (
    <article 
      className={`bento-card group ${canSeeMore ? 'cursor-pointer' : ''} ${compact ? 'p-4 sm:p-5' : ''}`}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="card-thumbnail">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      
      <div className="pr-14">
        <div className="flex items-start gap-2 mb-1">
          <h3 className={`font-semibold ${compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
            {item.title}
          </h3>
          {isProject && (item as ProjectItem).status === 'wip' && (
            <span className="px-1.5 py-0.5 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wider rounded status-wip flex-shrink-0">
              WIP
            </span>
          )}
        </div>
        <p className={`text-[var(--color-muted)] ${compact ? 'text-xs sm:text-sm' : 'text-sm'}`}>
          {hasOrg 
            ? `${(item as WorkItem | ExtracurricularItem).organization} · ${(item as WorkItem | ExtracurricularItem).period}`
            : (item as ProjectItem).description
          }
        </p>
      </div>
      
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
          {item.tags.slice(0, compact ? 3 : 4).map(tag => (
            <span 
              key={tag} 
              className={`tag text-[0.65rem] sm:text-xs ${
                tag === 'Featured' ? 'tag-featured' :
                tag === 'AI' ? 'tag-ai' :
                tag === 'CV/AI' ? 'tag-cv' :
                tag === 'Web' ? 'tag-web' :
                tag === 'Hardware' ? 'tag-hardware' :
                tag === 'Game Dev' ? 'tag-hardware' : ''
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {canSeeMore && <span className="click-hint">view details</span>}
    </article>
  )
}

type SectionProps = {
  heading: string
  subheading: string
  children: ReactNode
}

function Section({ heading, subheading, children }: SectionProps) {
  return (
    <section className="py-12 sm:py-16 space-y-6 sm:space-y-8">
      <header className="space-y-2 sm:space-y-3">
        <h2 className="section-heading">{heading}</h2>
        <p className="text-sm sm:text-base text-[var(--color-muted)]">{subheading}</p>
      </header>
      {children}
    </section>
  )
}
