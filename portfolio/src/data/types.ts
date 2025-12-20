export type ThemeMode = 'dark' | 'light'

export interface BaseItem {
  id: string
  title: string
  image: string
  tags?: string[]
  span?: string
  seeMore?: boolean // If true, shows modal on click and "view details" hint
}

export interface WorkItem extends BaseItem {
  organization: string
  location: string
  period: string
  description: string
  bullets: string[]
  technologies: string[]
  link?: string
}

export interface ExtracurricularItem extends BaseItem {
  organization: string
  location?: string
  period: string
  description: string
  bullets?: string[]
  technologies?: string[]
  link?: string
}

export interface ProjectItem extends BaseItem {
  description: string
  technologies: string[]
  link: string
  projectTags?: string[]
  status?: 'completed' | 'wip' | 'ongoing'
  bullets?: string[]
}

export interface EducationItem extends BaseItem {
  institution: string
  location: string
  period: string
  description?: string
  courses?: string[]
}

export interface HeroStat {
  label: string
  value: string
}

export interface SocialLink {
  name: string
  url: string
  icon: 'github' | 'linkedin' | 'gitlab' | 'email' | 'resume' | 'website'
}
