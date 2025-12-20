'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { WorkItem, ExtracurricularItem, ProjectItem, EducationItem } from '@/data/types'

type ModalItem = WorkItem | ExtracurricularItem | ProjectItem | EducationItem

interface RoleModalProps {
  item: ModalItem | null
  isOpen: boolean
  onClose: () => void
  theme: 'dark' | 'light'
}

// Type guards
function isWorkItem(item: ModalItem): item is WorkItem {
  return 'bullets' in item && 'organization' in item && 'technologies' in item
}

function isExtracurricularItem(item: ModalItem): item is ExtracurricularItem {
  return 'organization' in item && !('bullets' in item && 'technologies' in item && (item as WorkItem).technologies?.length > 0)
}

function isProjectItem(item: ModalItem): item is ProjectItem {
  return 'link' in item && 'technologies' in item && !('organization' in item)
}

function isEducationItem(item: ModalItem): item is EducationItem {
  return 'institution' in item
}

export default function RoleModal({ item, isOpen, onClose, theme }: RoleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setIsVisible(false), 400)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Fire animation on canvas
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }
    updateSize()

    // Fire particles
    interface FireParticle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
      hue: number
    }

    const particles: FireParticle[] = []
    const particleCount = 150

    const createParticle = (side: 'left' | 'right' | 'top' | 'bottom'): FireParticle => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      let x, y, vx, vy
      
      switch (side) {
        case 'left':
          x = 0
          y = Math.random() * height
          vx = 1 + Math.random() * 2
          vy = (Math.random() - 0.5) * 2
          break
        case 'right':
          x = width
          y = Math.random() * height
          vx = -(1 + Math.random() * 2)
          vy = (Math.random() - 0.5) * 2
          break
        case 'top':
          x = Math.random() * width
          y = 0
          vx = (Math.random() - 0.5) * 2
          vy = 1 + Math.random() * 2
          break
        case 'bottom':
        default:
          x = Math.random() * width
          y = height
          vx = (Math.random() - 0.5) * 2
          vy = -(1 + Math.random() * 2)
          break
      }

      return {
        x,
        y,
        vx,
        vy,
        size: 3 + Math.random() * 8,
        life: 0,
        maxLife: 40 + Math.random() * 40,
        hue: Math.random() < 0.5 
          ? 10 + Math.random() * 30  // Orange-red
          : 280 + Math.random() * 60  // Purple-pink
      }
    }

    // Initialize particles
    const sides: Array<'left' | 'right' | 'top' | 'bottom'> = ['left', 'right', 'top', 'bottom']
    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle(sides[i % 4])
      particle.life = Math.random() * particle.maxLife
      particles.push(particle)
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particles.forEach((p, index) => {
        p.x += p.vx
        p.y += p.vy
        p.life++

        // Add some turbulence
        p.vx += (Math.random() - 0.5) * 0.3
        p.vy += (Math.random() - 0.5) * 0.3

        const lifeRatio = p.life / p.maxLife
        const alpha = Math.sin(lifeRatio * Math.PI) * 0.8

        if (p.life >= p.maxLife) {
          // Respawn
          const newP = createParticle(sides[index % 4])
          Object.assign(p, newP)
        }

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        
        if (p.hue < 100) {
          // Fire colors
          gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha})`)
          gradient.addColorStop(0.4, `hsla(${p.hue + 10}, 100%, 50%, ${alpha * 0.6})`)
          gradient.addColorStop(1, `hsla(${p.hue + 20}, 100%, 30%, 0)`)
        } else {
          // Purple/pink colors
          gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${alpha})`)
          gradient.addColorStop(0.4, `hsla(${p.hue + 20}, 70%, 50%, ${alpha * 0.6})`)
          gradient.addColorStop(1, `hsla(${p.hue + 40}, 60%, 30%, 0)`)
        }

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isVisible])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isVisible || !item) return null

  // Get display data based on item type
  const getSubtitle = () => {
    if (isWorkItem(item) || isExtracurricularItem(item)) return item.organization
    if (isEducationItem(item)) return item.institution
    return ''
  }

  const getPeriod = () => {
    if (isWorkItem(item) || isExtracurricularItem(item) || isEducationItem(item)) return item.period
    return ''
  }

  const getLocation = () => {
    if (isWorkItem(item)) return item.location
    if (isExtracurricularItem(item)) return item.location
    if (isEducationItem(item)) return item.location
    return ''
  }

  const getDescription = () => {
    if (isWorkItem(item) || isExtracurricularItem(item) || isProjectItem(item)) return item.description
    if (isEducationItem(item)) return item.description
    return ''
  }

  const getBullets = () => {
    if (isWorkItem(item)) return item.bullets
    if (isExtracurricularItem(item)) return item.bullets
    if (isProjectItem(item)) return item.bullets
    return []
  }

  const getTechnologies = () => {
    if (isWorkItem(item) || isProjectItem(item)) return item.technologies
    if (isExtracurricularItem(item)) return item.technologies
    return []
  }

  const getLink = () => {
    if (isWorkItem(item) || isExtracurricularItem(item)) return item.link
    if (isProjectItem(item)) return item.link
    return ''
  }

  const getStatus = () => {
    if (isProjectItem(item)) return item.status
    return null
  }

  const getCourses = () => {
    if (isEducationItem(item)) return item.courses
    return []
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400
        ${isAnimating ? 'bg-black/60 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none'}`}
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl 
          transition-all duration-500 ease-out
          ${isAnimating ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        {/* Fire Animation Border */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
        
        {/* Breathing Multicolor Background */}
        <div className="absolute inset-0 modal-breathing-bg" />
        
        {/* Inner Border Glow */}
        <div className="absolute inset-[3px] rounded-[1.4rem] modal-inner-glow" />
        
        {/* Content Container */}
        <div 
          className={`relative z-20 m-[4px] rounded-[1.35rem] overflow-hidden
            ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-300 hover:scale-110
              ${theme === 'dark' 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-black/10 hover:bg-black/20 text-black'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrollable Content */}
          <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className={`absolute inset-0 bg-gradient-to-t 
                ${theme === 'dark' ? 'from-gray-900 via-gray-900/50' : 'from-white via-white/50'} to-transparent`} 
              />
              
              {/* Status Badge */}
              {getStatus() && (
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                  ${getStatus() === 'wip' 
                    ? 'bg-yellow-500/90 text-yellow-900' 
                    : getStatus() === 'ongoing'
                    ? 'bg-blue-500/90 text-white'
                    : 'bg-green-500/90 text-white'}`}>
                  {getStatus() === 'wip' ? 'Work in Progress' : getStatus()}
                </div>
              )}
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className={`text-2xl sm:text-3xl font-bold mb-2
                  ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h2>
                {getSubtitle() && (
                  <p className={`text-lg font-medium
                    ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    {getSubtitle()}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                {getPeriod() && (
                  <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {getPeriod()}
                  </div>
                )}
                {getLocation() && (
                  <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {getLocation()}
                  </div>
                )}
              </div>

              {/* Description */}
              {getDescription() && (
                <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getDescription()}
                </p>
              )}

              {/* Bullets */}
              {getBullets() && getBullets()!.length > 0 && (
                <div className="space-y-3">
                  <h3 className={`text-sm font-semibold uppercase tracking-wider
                    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Key Achievements
                  </h3>
                  <ul className="space-y-2">
                    {getBullets()!.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Courses (for Education) */}
              {getCourses() && getCourses()!.length > 0 && (
                <div className="space-y-3">
                  <h3 className={`text-sm font-semibold uppercase tracking-wider
                    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Key Courses
                  </h3>
                  <ul className="space-y-2">
                    {getCourses()!.map((course, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex-shrink-0" />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {course}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {getTechnologies() && getTechnologies()!.length > 0 && (
                <div className="space-y-3">
                  <h3 className={`text-sm font-semibold uppercase tracking-wider
                    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getTechnologies()!.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium
                          transition-all duration-300 hover:scale-105
                          ${theme === 'dark'
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded text-xs uppercase tracking-wider
                        ${theme === 'dark'
                          ? 'bg-white/5 text-gray-400 border border-white/10'
                          : 'bg-black/5 text-gray-600 border border-black/10'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Link */}
              {getLink() && (
                <a
                  href={getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium
                    transition-all duration-300 hover:scale-105 hover:shadow-lg
                    bg-gradient-to-r from-blue-500 to-purple-600 text-white`}
                >
                  {getLink()!.includes('github') || getLink()!.includes('gitlab') ? 'View Code' : 'Learn More'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
