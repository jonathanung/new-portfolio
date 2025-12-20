import { ExtracurricularItem } from './types'

export const extracurriculars: ExtracurricularItem[] = [
  {
    id: 'sfu-robot-soccer',
    title: 'Software Team Lead',
    organization: 'SFU Robot Soccer Club',
    location: 'Burnaby, BC',
    period: 'Feb 2024 – Present',
    image: '/images/sfu-robot-soccer.png',
    tags: ['C++', 'Autonomous Agents', 'Leadership'],
    seeMore: true,
    description: 'Leading software development for autonomous soccer-playing robots, implementing network protocols and game-playing agents.',
    bullets: [
      'Led 30-member C++ team; redesigned onboarding workflows reducing new developer ramp-up time 40%',
      'Designed Protobuf networking protocol routing commands to 6 robots with hot-swappable simulator/hardware modes',
      'Engineered Behavior Tree engine coordinating real-time role assignments across 6 autonomous robots at 180Hz tick rate',
      'Implemented multithreaded eval/planning pipeline with deterministic ordering, achieving 40ms simulation latency',
      'Initiated Analytics Core with ETL pipelines processing 100+ events/second for replay tools and RL dataset generation',
      'Deployed GitLab CI/CD with Docker registry caching and Valgrind integration testing, cutting pipeline runtime 40%',
      'Optimized Kalman filter for vision-based localization, reducing orientation jitter 35% and interpolating missing detections'
    ],
    technologies: ['C++', 'Python', 'Qt6', 'UDP', 'Sockets', 'Protobuf', 'RL'],
    link: 'https://sfurobotsoccer.com/'
  },
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
