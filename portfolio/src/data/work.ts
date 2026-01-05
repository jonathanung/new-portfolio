import { WorkItem } from './types'

export const workExperience: WorkItem[] = [
    {
    id: 'qualcomm',
    title: 'AISW Software Engineer Intern',
    organization: 'Qualcomm',
    location: 'Markham, ON',
    period: 'May 2026 – Aug 2026',
    image: '/images/qualcomm.jpeg',
    tags: ['C++', 'Python'],
    seeMore: false,
    description: 'Incoming Software Engineer Intern at Qualcomm, focusing on cutting-edge technology development and innovation.',
    bullets: [
      // Internship starting in May 2026
    ],
    technologies: ['C++', 'Python'],
    link: 'https://qualcomm.com/'
  },
  {
    id: 'rivian-vw',
    title: 'Infotainment Software Engineer Intern',
    organization: 'Rivian & Volkswagen Group Technologies',
    location: 'Vancouver, BC',
    period: 'May 2025 – Dec 2025',
    image: '/images/RVTech.jpg',
    tags: ['Android', 'QNX', 'Bluetooth', 'Automotive'],
    seeMore: true,
    description: 'Developed Android infotainment systems, accelerating feature development and optimizing performance across automotive platforms.',
    bullets: [
      'Architected scalable Android MVVM framework in Kotlin, cutting RAM usage 40% and accelerating feature velocity 30%',
      'Unified auth caches into AuthenticationCacheManager, enabling vendor APK regression detection and VIN-scoped Databricks analytics',
      'Owned 10+ production screens for Media 2.0, integrating MediaBrowser, ViewModels, and event-driven UI pipelines',
      'Developed real-time FFT audio visualizer as reusable Hilt-injectable component, adopted across 5 screens in 2 display styles',
      'Fixed Bluetooth AVRCP metadata inconsistencies via caching and content-hash validation, raising album-art accuracy from 66% to 99%',
      'Cut CPU usage from 40% to 10% by replacing Lottie animations with optimized rendering layer, eliminating UI jank under load',
      'Automated owner\'s manual SHA generation and publishing using Python and Bash subprocesses, cutting process time 80% and active time 99%'
    ],
    technologies: ['Android Development', 'Kotlin', 'QNX', 
      'HQX', 'Java', 'Python', 'Bash', 'Bluetooth', 'Audio Processing', 'MVVM', 'Automotive Systems'],
    link: 'https://rivianvw.tech/'
  },
  {
    id: 'code-ninjas',
    title: 'Code Sensei · Assistant Center Director',
    organization: 'Code Ninjas Richmond',
    location: 'Richmond, BC',
    period: 'Aug 2023 – Aug 2025',
    image: '/images/code-ninjas.png',
    tags: ['Unity', 'Game Development', 'Lua'],
    seeMore: true,
    description: 'Advised students on curriculum progression, integrated technology into the curriculum, and mentored aspiring developers.',
    bullets: [
      'Advised 50+ students on coding curriculum progression',
      'Integrated new technologies and game development into curriculum',
      'Learned and taught Unity for advanced student projects',
      'Deployed a scalable NAS for student project data storage',
      'Promoted to Assistant Center Director for leadership contributions'
    ],
    technologies: ['Unity', 'C#', 'JavaScript', 'Scratch', 'Game Development', 'Lua', 'Python'],
    link: 'https://www.codeninjas.com/richmond-bc-ca'
  }
]

export const nonTechnicalExperience: WorkItem[] = [
  {
    id: 'katsu-san',
    title: 'Scheduling Manager · Kitchen Supervisor',
    organization: 'Katsu San',
    location: 'Richmond, BC',
    period: 'Aug 2021 – Dec 2022',
    image: '/images/katsusan.jpg',
    tags: ['Management', 'Leadership', 'Operations'],
    seeMore: false,
    description: 'Managed kitchen operations, staff scheduling, and training while ensuring premium product quality.',
    bullets: [
      'Created weekly schedules for kitchen staff',
      'Managed staff time-off and sick call requests',
      'Supervised the kitchen on-site and conducted training for new staff',
      'Worked closely with owner to ensure premium product quality'
    ],
    technologies: []
  },
  {
    id: 'mcdonalds',
    title: 'Crew Member',
    organization: "McDonald's",
    location: 'Richmond, BC',
    period: 'Jun 2018 – Aug 2021',
    image: '/images/mcdonalds.png',
    tags: ['Customer Service', 'Teamwork'],
    seeMore: false,
    description: 'Delivered excellent customer service and collaborated with team members to meet restaurant standards.',
    bullets: [
      'Handled drive-thru cash register with high accuracy',
      'Delivered direct, prompt, and friendly customer service',
      'Assisted team members in completing duties to meet rigorous standards'
    ],
    technologies: []
  }
]
