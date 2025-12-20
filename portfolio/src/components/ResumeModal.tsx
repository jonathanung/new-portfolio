'use client'

import { useEffect } from 'react'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
  theme: 'dark' | 'light'
}

export default function ResumeModal({ isOpen, onClose, theme }: ResumeModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-hidden ${theme === 'dark' ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm flex items-center justify-center p-8`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className={`absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition duration-200 hover:scale-110
            ${theme === 'dark' 
              ? 'bg-gray-800 text-gray-400 hover:text-gray-200' 
              : 'bg-white text-gray-500 hover:text-gray-700'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className={`rounded-lg w-full h-[85vh] shadow-2xl flex flex-col
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <iframe
            src="/resume.pdf"
            className="w-full flex-1 rounded-t-lg"
            title="Resume"
          />
          
          <div className="p-4 flex justify-center">
            <a
              href="/resume.pdf"
              download="Jonathan_Ung_Resume.pdf"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
