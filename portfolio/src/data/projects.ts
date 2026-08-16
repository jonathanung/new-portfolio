import { ProjectItem } from './types'

export const projects: ProjectItem[] = [
  {
    id: 'strike',
    title: 'Strike',
    description: 'Agentic coding TUI with an event-sourced Go engine, multi-agent coordination, and JSONL session logs for decoupled terminal and web clients.',
    image: '/images/strike.svg',
    technologies: ['Go', 'Bubble Tea', 'WebSocket/SSE', 'Docker', 'Nix', 'GitHub Actions'],
    tags: ['Featured', 'Developer Tools'],
    projectTags: ['AI', 'Developer Tools', 'Autonomous Agents'],
    link: 'https://github.com/jonathanung/strike',
    deploymentLink: 'https://strike.jonathanung.ca/',
    status: 'completed',
    seeMore: true,
    bullets: [
      'Architected an event-sourced Go engine emitting protocol events to decoupled TUI and web clients over JSONL session logs',
      'Designed a multi-agent coordination protocol with compare-and-swap task claims and boundary-checked message passing'
    ]
  },
  {
    id: 'finesse-plugin',
    title: 'Finesse Plugin',
    description: 'A Claude Code plugin for autonomous development workflow planning and execution. Orchestrates multi-agent validation, prompt construction, and iterative development loops.',
    image: '/images/finesse.png',
    technologies: ['Python', 'Docker', 'Shell', 'tmux', 'Claude Code Plugin API'],
    tags: ['Featured', 'AI'],
    projectTags: ['AI', 'Developer Tools', 'Autonomous Agents'],
    link: 'https://github.com/jonathanung/finesse',
    status: 'completed',
    seeMore: true,
    bullets: [
      'Built meta-planning phase for Claude Code orchestrating 6 parallel validation agents across 6 task-specific workflows',
      'Designed wave-based task decomposition with dependency-aware scheduling, automatically splitting large tasks into parallel sub-workflows across isolated git worktrees with tmux orchestration and merge reconciliation'
    ]
  },
  {
    id: 'vetool',
    title: 'VeTool',
    description: 'Real-time matchmaking system for Captains draft and Map pick/bans for esports tournaments and scrims with sub-150ms state sync.',
    image: '/images/vetool.png',
    technologies: ['.NET', 'PostgreSQL', 'Next.js', 'SignalR', 'JWT', 'Redis', 'Redux', 'Docker'],
    tags: ['Featured', 'Web'],
    projectTags: ['Full-stack', 'Real-time', 'Esports'],
    link: 'https://github.com/jonathanung/vetool',
    deploymentLink: 'https://vetool.jonathanung.ca/',
    status: 'completed',
    seeMore: true,
    bullets: [
      'Architected SignalR and Redis event layer achieving sub-150ms state sync across horizontally scaled API instances',
      'Implemented Redis distributed coordination using monotonic sequence generators and SETNX idempotency with TTL'
    ]
  },
  {
    id: 'nasdaq-itch-aggregator',
    title: 'Nasdaq ITCH Aggregator',
    description: 'GPU-accelerated Nasdaq ITCH 5.0 pipeline streaming full-day TotalView feeds through a CPU parser into CUDA aggregation kernels.',
    image: '/images/nasdaq-itch.svg',
    technologies: ['C++', 'CUDA', 'CMake', 'Python', 'zlib'],
    tags: ['Featured', 'Systems'],
    projectTags: ['GPU Computing', 'Market Data', 'Systems'],
    link: 'https://github.com/jonathanung/itch_aggregator',
    status: 'completed',
    seeMore: true,
    bullets: [
      'Computed per-symbol VWAP, order imbalance, and bid/ask spread across 16,384 symbols'
    ]
  },
  {
    id: 'follow-ahead',
    title: 'Follow-Ahead Robot Navigation',
    description: 'MCTS + RL motion planning for frontal human-following robots, pairing an LSTM motion predictor with UCB-guided tree search, deployed on a Quanser QBot.',
    image: '/images/follow-ahead.jpg',
    technologies: ['C++', 'PyTorch', 'ROS2', 'Stable Baselines3', 'Gymnasium'],
    tags: ['Featured', 'Robotics'],
    projectTags: ['Robotics', 'Motion Planning', 'Reinforcement Learning'],
    link: 'https://s-gemmin.github.io/follow-ahead-web/',
    status: 'completed',
    seeMore: true,
    bullets: [
      'Trained LSTM human motion predictor achieving 90% accuracy, integrated predicted action probabilities into MCTS UCB selection for frontal following behavior',
      'Deployed real-time navigation on Quanser QBot with ZED camera and Vicon localization, running at 5Hz planning frequency'
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
