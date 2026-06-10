import { ExtracurricularItem } from './types'

export const extracurriculars: ExtracurricularItem[] = [
  {
    id: 'stormhacks-judge',
    title: 'StormHacks 2025 Hackathon Judge',
    organization: 'SFU Surge',
    location: 'Vancouver, BC',
    period: 'Oct 2025',
    image: '/images/stormhacks.png',
    tags: ['Community', 'Mentorship'],
    seeMore: false,
    description: 'Evaluated hackathon projects and provided feedback to student teams.',
    bullets: [
      'Judged projects across multiple categories',
      'Provided constructive feedback to participating teams',
      'Mentored students on project presentation and technical decisions'
    ],
    link: 'https://www.stormhacks.com/'
  },
  {
    id: 'sfu-csss',
    title: 'Frosh Committee Member',
    organization: 'SFU Computing Science Student Society',
    location: 'Burnaby, BC',
    period: 'Sep 2025',
    image: '/images/sfucsss.png',
    tags: ['Event Planning', 'Community'],
    seeMore: false,
    description: 'Helped organize and run orientation events for incoming Computing Science students at SFU.',
    bullets: [
      'Organized and ran Frosh Week events',
      'Welcomed new students to the Computing Science program',
      'Coordinated with CSSS executive team on logistics'
    ],
    link: 'https://sfucsss.org/'
  },
  {
    id: 'fallhacks-judge',
    title: 'Fall Hacks Hackathon Judge',
    organization: 'SFU Computing Science Student Society',
    location: 'Vancouver, BC',
    period: 'Sep 2024',
    image: '/images/sfucsss.png',
    tags: ['Community', 'Mentorship'],
    seeMore: false,
    description: 'Evaluated hackathon projects and provided feedback to student teams.',
    bullets: [
      'Judged projects across multiple categories',
      'Provided constructive feedback to participating teams',
      'Mentored students on project presentation and technical decisions'
    ],
    link: 'https://sfucsss.org/'
  },
  {
    id: 'langara-cs-club',
    title: 'Vice President',
    organization: 'Langara Computer Science Club',
    location: 'Vancouver, BC',
    period: 'Apr 2023 – Apr 2024',
    image: '/images/langara-cs-club.png',
    tags: ['Event Ops', 'Leadership'],
    seeMore: true,
    description: 'Led the creation of Langara Hacks and established organizational standards for club operations.',
    bullets: [
      'Led the creation of inaugural Langara Hacks hackathon',
      'Served as Vice President managing club operations',
      'Created organizational standards for club tasks and meetings',
      'Managed committee for event quality assurance'
    ],
    technologies: ['Event Management', 'Leadership'],
    link: 'https://langaracs.ca/'
  },
  {
    id: 'langara-speaker',
    title: 'Orientation Speaker',
    organization: 'Langara College',
    location: 'Vancouver, BC',
    period: 'Nov 2023 – Dec 2023',
    image: '/images/langara.png',
    tags: ['Public Speaking'],
    seeMore: false,
    description: 'Spoke to new students about the experiences and opportunities available at Langara College.',
    bullets: [
      'Presented to incoming students during orientation sessions',
      'Shared insights on student life and academic success',
      'Answered questions about the college experience'
    ],
    link: 'https://langara.ca/'
  }
]
