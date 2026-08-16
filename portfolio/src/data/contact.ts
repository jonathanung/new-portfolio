import { SocialLink, HeroStat } from './types'

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/jonathanung',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jonathankeithung/',
    icon: 'linkedin'
  },
  {
    name: 'GitLab',
    url: 'https://gitlab.com/jonathan.keith.ung',
    icon: 'gitlab'
  },
  {
    name: 'Email',
    url: 'mailto:jonathank.ung@icloud.com',
    icon: 'email'
  },
  {
    name: 'Resume',
    url: '/resume.pdf',
    icon: 'resume'
  }
]

export const resumes = [
  { name: 'Main', url: '/resume.pdf' },
  { name: 'Systems', url: '/resume-systems.pdf' },
  { name: 'Machine Learning', url: '/resume-ml.pdf' },
  { name: 'LLM', url: '/resume-llm.pdf' }
]

export const heroStats: HeroStat[] = [
  { label: 'Incoming', value: 'Tesla Infotainment' },
  { label: 'Incoming', value: 'Amazon Gift Cards' },
  { label: 'AI Infrastructure', value: 'Qualcomm' },
  { label: 'Production Infotainment', value: 'Rivian' }
]

export const contactInfo = {
  email: 'jonathank.ung@icloud.com',
  location: 'Canada & USA',
  availability: ['Internship: Summer 2027', 'New grad: After April 2028'],
  timezone: 'PST'
}
