'use client'

import { useState } from 'react'
import { socialLinks } from '@/data/contact'

interface SocialIconsProps {
  theme: 'dark' | 'light'
  onResumeClick?: () => void
}

const iconPaths = {
  github: (
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  ),
  linkedin: (
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  ),
  gitlab: (
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
  ),
  email: (
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  ),
  resume: (
    <>
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </>
  ),
  website: (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  )
}

const brandColors = {
  github: { hover: '#fff', hoverLight: '#171515', bg: 'rgba(255,255,255,0.1)', bgLight: 'rgba(0,0,0,0.08)' },
  linkedin: { hover: '#0077B5', hoverLight: '#0077B5', bg: 'rgba(0,119,181,0.15)', bgLight: 'rgba(0,119,181,0.12)' },
  gitlab: { hover: '#FC6D26', hoverLight: '#FC6D26', bg: 'rgba(252,109,38,0.15)', bgLight: 'rgba(252,109,38,0.12)' },
  email: { hover: '#7ea7ff', hoverLight: '#5b8def', bg: 'rgba(126,167,255,0.15)', bgLight: 'rgba(91,141,239,0.12)' },
  resume: { hover: '#10B981', hoverLight: '#059669', bg: 'rgba(16,185,129,0.15)', bgLight: 'rgba(5,150,105,0.12)' },
  website: { hover: '#8B5CF6', hoverLight: '#7C3AED', bg: 'rgba(139,92,246,0.15)', bgLight: 'rgba(124,58,237,0.12)' }
}

export default function SocialIcons({ theme, onResumeClick }: SocialIconsProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = (e: React.MouseEvent, icon: string) => {
    if (icon === 'resume' && onResumeClick) {
      e.preventDefault()
      onResumeClick()
    }
  }

  return (
    <>
      {/* Desktop - Fixed Left Sidebar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {socialLinks.map((link, index) => {
          const isHovered = hoveredIcon === link.name
          const colors = brandColors[link.icon]
          
          return (
            <a
              key={link.name}
              href={link.url}
              target={link.icon === 'email' || link.icon === 'resume' ? undefined : '_blank'}
              rel={link.icon === 'email' || link.icon === 'resume' ? undefined : 'noopener noreferrer'}
              onClick={(e) => handleClick(e, link.icon)}
              className="group relative"
              onMouseEnter={() => setHoveredIcon(link.name)}
              onMouseLeave={() => setHoveredIcon(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Icon Container */}
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center
                  transition-all duration-300 ease-out
                  ${isHovered ? 'scale-110' : 'scale-100'}
                  ${theme === 'dark' 
                    ? 'bg-white/5 border border-white/10 hover:border-white/30' 
                    : 'bg-black/5 border border-black/10 hover:border-black/30'}`}
                style={{
                  backgroundColor: isHovered ? colors.bg : undefined,
                  boxShadow: isHovered ? `0 0 20px ${colors.bg}` : undefined
                }}
              >
                <svg 
                  className="w-5 h-5 transition-all duration-300"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ 
                    color: isHovered 
                      ? (theme === 'dark' ? colors.hover : colors.hoverLight)
                      : theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
                  }}
                >
                  {iconPaths[link.icon]}
                </svg>
              </div>

              {/* Tooltip */}
              <div 
                className={`absolute left-full ml-3 px-3 py-1.5 rounded-lg text-sm font-medium
                  whitespace-nowrap pointer-events-none
                  transition-all duration-300
                  ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                  ${theme === 'dark' 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : 'bg-black/10 text-black border border-black/20'}`}
                style={{
                  backdropFilter: 'blur(8px)'
                }}
              >
                {link.name}
              </div>
            </a>
          )
        })}

        {/* Decorative Line */}
        <div 
          className={`w-px h-24 mx-auto mt-2
            ${theme === 'dark' ? 'bg-gradient-to-b from-white/20 to-transparent' : 'bg-gradient-to-b from-black/20 to-transparent'}`}
        />
      </div>

      {/* Mobile - Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        {/* Expanded Icons */}
        <div 
          className={`absolute bottom-16 right-0 flex flex-col gap-3
            transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          {socialLinks.map((link, index) => {
            const colors = brandColors[link.icon]
            
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.icon === 'email' || link.icon === 'resume' ? undefined : '_blank'}
                rel={link.icon === 'email' || link.icon === 'resume' ? undefined : 'noopener noreferrer'}
                className={`w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${isExpanded ? 'scale-100 translate-y-0' : 'scale-0 translate-y-4'}
                  ${theme === 'dark' 
                    ? 'bg-gray-800 border border-white/20' 
                    : 'bg-white border border-black/10 shadow-lg'}`}
                style={{
                  transitionDelay: isExpanded ? `${(socialLinks.length - index - 1) * 50}ms` : '0ms'
                }}
                onClick={(e) => {
                  handleClick(e, link.icon)
                  setIsExpanded(false)
                }}
              >
                <svg 
                  className="w-5 h-5"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: theme === 'dark' ? colors.hover : colors.hoverLight }}
                >
                  {iconPaths[link.icon]}
                </svg>
              </a>
            )
          })}
        </div>

        {/* FAB Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full flex items-center justify-center
            transition-all duration-300 shadow-lg
            ${isExpanded ? 'rotate-45' : 'rotate-0'}
            bg-gradient-to-r from-blue-500 to-purple-600 text-white`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </>
  )
}
