import { WorkItem } from './types'

export const workExperience: WorkItem[] = [
  {
    id: 'tesla',
    title: 'Infotainment Software Engineer Intern',
    organization: 'Tesla',
    location: 'Palo Alto, CA',
    period: 'Jan 2027 – Apr 2027',
    image: '/images/tesla.webp',
    tags: ['C++', 'Infotainment', 'Automotive'],
    seeMore: false,
    description: 'Incoming Infotainment Software Engineer Intern at Tesla for Winter 2027, building in-vehicle infotainment systems in C++.',
    bullets: [
      // Internship starting in January 2027
    ],
    technologies: ['C++'],
    link: 'https://tesla.com/'
  },
  {
    id: 'amazon',
    title: 'Software Development Engineer Intern',
    organization: 'Amazon',
    location: 'Vancouver, BC',
    period: 'Sep 2026 – Dec 2026',
    image: '/images/amazon.png',
    tags: ['AWS', 'Distributed Systems'],
    seeMore: false,
    description: 'Incoming Software Development Engineer Intern on the Gift Cards team at Amazon for Fall 2026.',
    bullets: [
      // Internship starting in September 2026
    ],
    technologies: ['AWS'],
    link: 'https://amazon.com/'
  },
  {
    id: 'qualcomm',
    title: 'AI Software Engineering Intern',
    organization: 'Qualcomm',
    location: 'Markham, ON',
    period: 'May 2026 – Aug 2026',
    image: '/images/qualcomm.jpeg',
    tags: ['C++', 'Python', 'GenAI', 'ONNX'],
    seeMore: true,
    description: 'Building AI software for on-device GenAI inference, from canonical math libraries to graph eviction strategies and validation tooling for the Hexagon Tensor Processor pipeline.',
    bullets: [
      'Unified 50+ math ops and approximation functions across multiple repositories into a canonical header library, eliminating divergent implementations of core operations and enforcing a single computation path',
      'Designed MRU-based graph eviction strategy for on-device GenAI inference, enabling models exceeding device RAM by intelligently paging KV cache graph partitions to minimize latency under memory pressure',
      'Built automated graph validation tool for the Hexagon Tensor Processor pipeline, detecting 8+ categories of ONNX-to-QNN compilation defects including quantization mismatches, redundant data movers, and broken connectivity'
    ],
    technologies: ['C', 'C++', 'Python', 'ONNX', 'GenAI', 'QNN', 'Hexagon'],
    link: 'https://qualcomm.com/'
  },
  {
    id: 'padcomp-peasant-labs',
    title: 'Undergraduate Researcher',
    organization: 'PADComp x Peasant Labs',
    location: 'Burnaby, BC',
    period: 'Feb 2026 – Present',
    image: '/images/padcomppeasantlabs.webp',
    tags: ['Go', 'Electron', 'LLM Agents'],
    seeMore: true,
    description: 'Building developer tooling and observability infrastructure for LLM coding agents at the SFU PADComp Lab.',
    bullets: [
      'Developed zone, a per-repo Docker workspace manager for LLM coding agents with network sandboxing, adopted by 10+ researchers for safe autonomous code execution',
      'Created Electron-based orchestration dashboard with real PTY terminals via node-pty/xterm.js, enabling researchers to monitor and debug concurrent LLM agent sessions in real time',
      'Built local-first observability platform for AI coding agents with 9-stage ingest pipeline, cross-repo GitHub OAuth (CSRF, credential lifecycle), and a SQLite-to-PostgreSQL sync daemon with anonymization and transcript redaction on AWS EC2'
    ],
    technologies: ['Go', 'PostgreSQL', 'Next.js', 'Electron', 'Docker', 'AWS EC2'],
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
