import { ProjectItem } from './types'

export const projects: ProjectItem[] = [
  {
    id: 'vetool',
    title: 'VeTool',
    description: 'Real-time matchmaking system for Captains draft and Map pick/bans for esports tournaments and scrims with sub-150ms state sync.',
    image: '/images/vetool.png',
    technologies: ['.NET', 'PostgreSQL', 'Next.js', 'SignalR', 'JWT', 'Redis', 'Redux', 'Docker'],
    tags: ['Featured', 'Web'],
    projectTags: ['Full-stack', 'Real-time', 'Esports'],
    link: 'https://github.com/jonathanung/vetool',
    status: 'wip',
    seeMore: true,
    bullets: [
      'Architected SignalR and Redis event layer achieving sub-150ms state sync across horizontally scaled API instances',
      'Implemented Redis distributed coordination using monotonic sequence generators and SETNX idempotency with TTL'
    ]
  },
  {
    id: 'autostop',
    title: 'AutoStop',
    description: 'A self-braking vehicle simulator powered by CARLA API with computer vision for obstacle detection and automatic braking.',
    image: '/images/autostop.jpg',
    technologies: ['PyQt', 'CARLA API', 'Open3D', 'OpenCV', 'Python'],
    tags: ['Featured', 'CV/AI'],
    projectTags: ['Computer Vision', 'Self-Driving Cars', 'Simulated Controls'],
    link: 'https://github.com/jonathanung/autostop',
    status: 'completed',
    seeMore: false
  },
  {
    id: 'wemote',
    title: 'WeMote',
    description: 'ESP32-based motion controller using IMU data to control custom Pygame games. DreamHacks 2025 winner.',
    image: '/images/weMote.jpg',
    technologies: ['ESP32', 'C++', 'Sensor Fusion', 'Serial', 'PyGame'],
    tags: ['Featured', 'Hardware'],
    projectTags: ['Embedded Systems', 'Networking', 'IoT', 'DreamHacks Winner', '1-Day Hack'],
    link: 'https://devpost.com/software/wemote-gs5q28',
    status: 'completed',
    seeMore: true,
    bullets: [
      'Built ESP32 motion controller with MPU-6050 IMU and Kalman-filter fusion, achieving 120Hz sampling, sub-30ms latency',
      'Developed Python serial-to-socket pipeline converting IMU data into structured motion events via PyGame event bus',
      'Awarded DreamHacks Technical Excellence Award for fully integrated real-time embedded-to-application system'
    ]
  },
  {
    id: 'blackjacknn',
    title: 'BlackjackNN',
    description: 'Q-Learning agent trained in PyTorch that converges to optimal ~42% win rate with parallelized training environments.',
    image: '/images/blackjacknn.png',
    technologies: ['Python', 'PyTorch', 'Matplotlib', 'NumPy', 'Pickle', 'RL'],
    tags: ['Featured', 'AI'],
    projectTags: ['Machine Learning', 'Reinforcement Learning'],
    link: 'https://github.com/jonathanung/blackjackNN',
    status: 'completed',
    seeMore: true,
    bullets: [
      'Trained Q-Learning agent for Blackjack in PyTorch, converging to optimal ~42% win rate with logged reward curves and epsilon decay',
      'Parallelized training environment to run 10,000+ concurrent episodes per epoch, enabling rapid strategy iteration'
    ]
  },
  {
    id: 'pignance',
    title: 'Pignance',
    description: 'Finance tracking and literacy app for kids using a home-hosted Gemma2 LLM and OCR for receipt scanning.',
    image: '/images/pignance.png',
    technologies: ['Gemma2 LLM', 'OCR', 'Next.js', 'Tailwind', 'FastAPI'],
    tags: ['Featured', 'AI'],
    projectTags: ['Web Development', '2-Day Hack', 'StormHacks'],
    link: 'https://github.com/jonathanung/532-finance',
    status: 'completed',
    seeMore: false
  },
  {
    id: 'traffic-yolo',
    title: 'Traffic Light YOLO Analysis',
    description: 'Vision model benchmarking pipeline comparing YOLOv3, v5, v8 on traffic light detection with ETL and PR curve analysis.',
    image: '/images/traffic-yolo-analysis.jpg',
    technologies: ['Python', 'OpenCV', 'Pandas', 'NumPy', 'PyTorch'],
    tags: ['Featured', 'CV/AI'],
    projectTags: ['Computer Vision', 'Data Analysis', 'Data Science', 'Model Training'],
    link: 'https://github.com/jonathanung/traffic-yolo-analysis',
    status: 'completed',
    seeMore: true,
    bullets: [
      'Created ETL pipeline producing 20,000+ model-ready samples from LISA traffic footage with normalized annotations',
      'Benchmarked YOLOv3, v5, v8 across 50 epochs with reproducible eval framework and PR curve analysis',
      'Reduced runtime 40% through vectorized preprocessing and consolidated annotation parsing'
    ]
  },
  {
    id: 'transcribr',
    title: 'Transcribr',
    description: 'Discord bot for recording, transcribing, and summarizing meetings using Whisper API.',
    image: '/images/transcribr.png',
    technologies: ['Discord.js', 'Opus', 'ffmpeg', 'GPT-Whisper API'],
    tags: ['Featured', 'AI'],
    projectTags: ['Discord Bot', 'Audio Processing'],
    link: 'https://github.com/jonathanung/transcribr',
    status: 'completed',
    seeMore: false
  },
  {
    id: 'sewjo',
    title: 'Sewjo',
    description: 'Fabric and sewing pattern tracking app built for FABCycle as part of CMPT 276.',
    image: '/images/sewjo.png',
    technologies: ['Next.js', 'Tailwind', 'Java Spring'],
    tags: ['Featured', 'Web'],
    projectTags: ['Web Development', 'Client Project'],
    link: 'https://www.fabcycle.shop/',
    status: 'completed',
    seeMore: false
  },
  {
    id: 'chaoscribe',
    title: 'Chaoscribe',
    description: 'News categorization tool that classifies articles based on chaos levels. Built for ChaosHacks 2024.',
    image: '/images/chaoscribe.jpg',
    technologies: ['Next.js', 'FastAPI', 'GPT-4'],
    tags: ['Featured', 'AI'],
    projectTags: ['Web Development', '1-Day Hack'],
    link: 'https://github.com/jonathanung/chaoscribe',
    status: 'completed',
    seeMore: false
  },
  {
    id: 'shreddedwizards',
    title: 'ShreddedWizards',
    description: 'Multiplayer fighting game with items and powerups, built during StormHacks 2024.',
    image: '/images/shreddedwizards.jpg',
    technologies: ['Godot 4', 'GDScript'],
    tags: ['Featured', 'Game Dev'],
    projectTags: ['Game Development', 'Networking', '2-Day Hack'],
    link: 'https://github.com/jonathanung/shreddedwizards',
    status: 'completed',
    seeMore: false
  }
]

// All projects are now featured
export const featuredProjects = projects
