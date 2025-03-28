'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useAnimation } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaGitlab, FaGlobe, FaMoon, FaSun, FaBars, FaTimes, FaFileDownload } from 'react-icons/fa'
import Image from 'next/image'
import Head from 'next/head'

// Define types for skills, projects, experiences, nonTechnicalExperiences, and education
type Skill = {
  [key: string]: string[]
}

type Project = {
  name: string
  description: string
  tech: string[]
  link: string
  image?: string
  tags?: string[]
}

type Experience = {
  title: string
  company: string
  date: string
  description: string
  tech: string[]
  link: string
  image: string
  gitLink?: string
}

type NonTechnicalExperience = {
  title: string
  company: string
  date: string
  description: string
  image: string
}

type Education = {
  degree: string
  date: string
  institution: string
  image: string
}

// Updated skills: added any missing technical skills from the projects section.
const skills: Skill = {
  languages: [
    'Python',
    'TypeScript',
    'JavaScript',
    'C++',
    'C#',
    'SQL',
    'Java',
    'GD Script',
    'Dart',
    'Bash',
    'Perl',
    'HTML',
    'CSS'
  ],
  'machine learning': ['NumPy', 'PyTorch', 'Pandas', 'TensorFlow', 'Keras'],
  frontend: [
    'React',
    'Next.js', 
    'Angular',
    'Flask',
    'Django',
    'Spring MVC',
    'Flutter',
    'Bootstrap',
    'Tailwind',
    'Svelte'
  ],
  backend: [
    'PostgreSQL',
    'MySQL',
    'SQLite3',
    'Express',
    'MongoDB',
    'FastAPI',
    'Flask',
    'Spring Boot',
    'Firebase',
    'Node.js'
  ],
  deployment: [
    'AWS',
    'Kubernetes',
    'Docker',
    'Git',
    'CI/CD',
    'Nginx',
    'DigitalOcean'
  ],
  miscellaneous: [
    'QT6',
    'MERN Stack',
    'Unity/Godot',
    'ROS',
    'CARLA API',
    'OpenCV',
    'LLMs (Gemma2, GPT-4)',
    'Socket.io',
    'REST APIs'
  ]
}

const projects: Project[] = [
  {
    name: 'AutoStop (APP WIP)',
    description: 'An app that simulates a self-braking vehicle using CARLA API.',
    tech: ['PyQt', 'CARLA API', 'Open3D', 'OpenCV'],
    link: 'https://github.com/jonathanung/autostop',
    image: '/images/autostop.jpg',
    tags: ['Computer Vision', 'Self-Driving Cars', 'Simulated Controls']
  },
  {
    name: 'BlackjackNN',
    description: 'A Blackjack simulator using reinforcement learning to learn optimal strategies.',
    tech: ['PyTorch', 'NumPy', 'Pandas'],
    link: 'https://github.com/jonathanung/blackjacknn',
    image: '/images/blackjacknn.png',
    tags: ['Reinforcement Learning', '2-Day Hack']
  },
  {
    name: 'Traffic Light YOLO Analysis (WIP)',
    description: 'A YOLO model trained to detect traffic lights and classify them as red, yellow, or green, then analyzed using inferential statistics.',
    tech: ['YOLO', 'PyTorch', 'NumPy', 'Pandas', 'Inferential Statistics'],
    link: 'https://github.com/jonathanung/traffic-yolo-analysis',
    image: '/images/traffic-yolo-analysis.jpg',
    tags: ['Computer Vision', 'Data Analysis', 'Data Science', 'Model Training']
  },
  {
    name: 'WeMote',
    description: 'An ESP32-based motion controller that uses IMU data to control custom Pygame games. DreamHacks 2025 winner.',
    tech: ['ESP32', 'Arduino', 'C++', 'Pygame', 'Sockets', 'Serial Communication'],
    link: 'https://github.com/jonathanung/weMote',
    image: '/images/weMote.jpg',
    tags: ['Embedded Systems', 'Networking', 'IoT', 'DreamHacks Winner', '1-Day Hack']
  },
  {
    name: 'Pignance',
    description: 'A web app created during StormHacks2024V2 to help kids with finance tracking and literacy using a home-hosted Gemma2 LLM and OCR.',
    tech: ['Gemma2 LLM', 'OCR', 'Next.js', 'Tailwind', 'FastAPI'],
    link: 'https://github.com/jonathanung/532-finance',
    image: '/images/pignance.png',
    tags: ['Web Development', '2-Day Hack']
  },
  {
    name: 'local-llm-api',
    description: 'A local LLM API to run local LLMs from a server. Used as a helper for the Pignance project and made during StormHacks2024V2.',
    tech: ['FastAPI', 'Ollama'],
    link: 'https://github.com/jonathanung/local-llm-api',
    image: '/images/local-llm-api.jpg',
    tags: ['REST API', '2-Day Hack']
  },
  {
    name: 'ChronoCal (BACKEND WIP)',
    description: 'A feature-rich calendar application with AI-powered task creation and expense tracking. Includes CRUD functionality for events and an intuitive user interface.',
    tech: ['MongoDB', 'Express.js', 'Next.js', 'Node.js', 'GPT-4'],
    link: 'https://github.com/jonathanung/chronocal',
    image: '/images/chronocal.png',
    tags: ['Web Development', 'Productivity']
  },
  {
    name: 'Sewjo (FABCycle x CMPT 276)',
    description: 'A fabric and sewing pattern tracking app made for FABCycle.',
    tech: ['Next.js', 'Tailwind', 'Java Spring'],
    link: 'https://www.fabcycle.shop/',
    image: '/images/sewjo.png',
    tags: ['Web Development']
  },
  {
    name: 'ShreddedWizards',
    description: 'A game created during StormHacks2024, using a fighting game style, with usable items and powerups.',
    tech: ['Godot4', 'GDScript'], 
    link: 'https://github.com/jonathanung/shreddedwizards',
    image: '/images/shreddedwizards.jpg',
    tags: ['Game Development', 'Networking', '2-Day Hack']
  },
  {
    name: 'Transcribr',
    description: 'A Discord bot designed for recording, transcribing, and summarizing meetings, utilizing Discord.js, ffmpeg, and GPT-Whisper API for transcription.',
    tech: ['Discord.js', 'Opus', 'ffmpeg', 'GPT-Whisper API'],
    link: 'https://github.com/jonathanung/transcribr',
    image: '/images/transcribr.png',
    tags: ['Discord Bot', 'Audio Processing']
  },
  {
    name: 'Chaoscribe',
    description: 'A news categorization tool developed for ChaosHacks2024, categorizing articles based on chaos levels.',
    tech: ['Next.js', 'FastAPI', 'GPT-4'],
    link: 'https://github.com/jonathanung/chaoscribe',
    image: '/images/chaoscribe.jpg',
    tags: ['Web Development', '1-Day Hack']
  },
  {
    name: 'AccessMart',
    description: 'A tool developed during NWHacks2024 using MappedIn, helping shoppers navigate their way through stores.',
    tech: ['React.js', 'Firebase', 'MappedIn API'],
    link: 'https://github.com/jonathanung/accessmart',
    image: '/images/accessmart.jpg',
    tags: ['Web Development', '2-Day Hack']
  },
  {
    name: 'jsonlookup',
    description: 'A tool to lookup JSON data from an API',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://github.com/jonathanung/jsonlookup',
    image: '/images/jsonlookup.png',
    tags: ['Web Development', 'Data Parsing', '1-Day Hack']
  },
  {
    name: 'ChattyThingy',
    description: 'A socket-based chat application built with Node.js, Express, and Socket.io to learn about basic socket development.',
    tech: ['React.js', 'Node.js', 'Express', 'Socket.io'],
    link: 'https://github.com/jonathanung/chattythingy',
    image: '/images/chattythingy.png',
    tags: ['Web Development', 'Networking', '1-Day Hack']
  },
  {
    name: 'Sked',
    description: 'A web app simulating basic calendar functionality.',
    tech: ['React.js', 'React-bootstrap', 'day.js', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://github.com/jonathanung/sked',
    image: '/images/sked.png',
    tags: ['Web Development']
  },
  {
    name: 'Memory React',
    description: 'A web app to play the memory card game.',
    tech: ['React.js', 'Firebase'],
    link: 'https://github.com/jonathanung/memory_react',
    image: '/images/memory-react.jpg',
    tags: ['Web Development', '1-Day Hack']
  },
  {
    name: 'Valorant Stats',
    description: 'A web app to see the overview of a valorant agents.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Valorant API'],
    link: 'https://github.com/jonathanung/valorant_stats',
    image: '/images/valorant-stats.jpg',
    tags: ['Web Development', '1-Day Hack']
  }
]

const experiences: Experience[] = [
  {
    title: 'Infotainment System Developer Co-op',
    company: 'Rivian and Volkswagen Group Technologies',
    date: 'May 2025 - December 2025',
    description: 'Incoming co-op at Rivian and Volkswagen Group Technologies for infotainment system development.',
    tech: ['Android Development'],
    link: 'https://rivianvw.tech/',
    image: '/images/RVTech.jpg',
  },
  {
    title: 'Code Sensei, Assistant Center Director',
    company: 'Code Ninjas - Richmond, BC',
    date: 'August 2023 - PRESENT',
    description: 'Advised students on curriculum progression, integrated technology into the curriculum, and learned Unity for larger projects. Aided in deploying a scalable NAS for student project data storage.',
    tech: ['Unity', 'Game Development', 'Teaching'],
    link: 'https://www.codeninjas.com/richmond-bc-ca',
    image: '/images/code-ninjas.png'
  },
  {
    title: 'Software Engineering Intern',
    company: 'MVP IT Solutions - Daytona Beach, FL, USA (Remote)',
    date: 'August - November 2022',
    description: 'Engineered functional components in Flutter, enhanced development plans during scrum meetings, and optimized API calls to reduce resource usage and cost.',
    tech: ['Flutter', 'Scrum', 'API Optimization'],
    link: 'https://mvpitsolutions.com/',
    image: '/images/mvp-it-solutions.jpg'
  },
]

const extracurricularExperiences: Experience[] = [
    {
    title: 'Software Team Lead, C++ Software Developer',
    company: 'SFU Robot Soccer Club (Bandits FC)',
    date: 'February 2024 - PRESENT',
    description: 'Led the creation of network protocols, integrated manual and automatic overrides, and managed a team of software developers. Currently leading the development of an autonomous, game-playing agent utilizing HFSMs.',
    tech: ['C++', 'Network Protocols', 'Autonomous Systems'],
    link: 'https://sfurobotsoccer.com/',
    image: '/images/sfu-robot-soccer.png',
    gitLink: 'https://gitlab.com/sfurs/software'
  },
  {
    title: 'Executive Advisor, Vice President, Lead Hackathon Coordinator',
    company: 'Langara Computer Science Club - Vancouver, BC',
    date: 'April 2023 - April 2024',
    description: 'Led the creation of inaugural Langara Hacks, managed committee for event quality, and created organizational standards for club tasks and meetings.',
    tech: ['Event Management', 'Leadership'],
    link: 'https://langaracs.ca/',
    image: '/images/langara-cs-club.png'
  },
    {
    title: 'New Student Orientation Speaker',
    company: 'Langara College - Vancouver, BC',
    date: 'November 2023 - December 2023',
    description: 'Spoke to new students about the experiences of a college student at Langara College.',
    tech: ['Speaking'],
    link: 'https://langara.ca/',
    image: '/images/langara.png'
  }
]

const nonTechnicalExperiences: NonTechnicalExperience[] = [
  {
    title: 'Scheduling Manager, Kitchen Supervisor, Line Cook',
    company: 'Katsu San - Richmond, BC',
    date: 'August 2021 - December 2022',
    description: 'Created weekly schedules for kitchen staff, managed staff time-off and sick call requests. Supervised the kitchen on-site and conducted training of all new kitchen staff. Worked closely with the restaurant owner to ensure premium product quality.',
    image: '/images/katsusan.jpg'
  },
  {
    title: 'Crew Member',
    company: "McDonald's - Richmond, BC",
    date: 'June 2018 - August 2021',
    description: 'Handled the cash register of the restaurant drive-thru with high accuracy. Delivered direct, prompt, and friendly customer service to patrons. Assisted team members in completing duties to meet rigorous restaurant standards.',
    image: '/images/mcdonalds.png'
  }
]

// New education array using the new type
const educations: Education[] = [
  {
    degree: 'B.Sc Computing Science, Statistics Minor',
    date: 'January 2024 - August 2027',
    institution: 'Simon Fraser University - Burnaby, BC, Canada',
    image: '/images/sfu.png'
  },
  {
    degree: 'Computer Science Transfer',
    date: 'September 2021 - April 2022, April 2023 - December 2024',
    institution: 'Langara College - Vancouver, BC, Canada',
    image: '/images/langara.png'
  },
  {
    degree: 'Web Development Certificate',
    date: 'May 2022 - August 2022',
    institution: 'Coding Dojo (Colorado Technical University) - Colorado Springs, CO, USA',
    image: '/images/codingdojo.png'
  }
]

export default function Page() {
  const [activeTab, setActiveTab] = useState<'technical' | 'nonTechnical' | 'extracurricular'>('technical')
  const [isLoaded, setIsLoaded] = useState<boolean>(true)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const { scrollY } = useScroll()
  const navControls = useAnimation()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  const linkContainsGit = (link: string) => {
    return link.includes('github') || link.includes('gitlab');
  }

  useEffect(() => {
    // Check for user's preference in localStorage or system preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
      (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    // Update localStorage and apply dark mode class to body
    localStorage.setItem('darkMode', darkMode.toString())
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 50) {
        navControls.start({ backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)' })
      } else {
        navControls.start({ backgroundColor: 'rgba(0, 0, 0, 0)' })
      }
    })
  }, [scrollY, navControls, darkMode])

  useEffect(() => {
    const sections : string[] = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact']
    const sectionRefs : (React.RefObject<HTMLDivElement> | null)[] = [null, aboutRef, experienceRef, skillsRef, projectsRef, educationRef, contactRef]

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset to trigger slightly before reaching the section

      for (let i = sections.length - 1; i >= 0; i--) {
        const ref = sectionRefs[i]
        if (ref && ref.current) {
          if (scrollPosition >= ref.current.offsetTop) {
            setActiveSection(sections[i])
            break
          }
        } else if (i === 0) {
          setActiveSection('home')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const experienceRef = useRef(null)
  const educationRef = useRef(null)
  const contactRef = useRef(null)

  const aboutInView = useInView(aboutRef, { once: true, amount: 0.05 })
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.05 })
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.05 })
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.05 })
  const educationInView = useInView(educationRef, { once: true, amount: 0.05 })
  const contactInView = useInView(contactRef, { once: true, amount: 0.05 })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const startPosition = window.scrollY;
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - 50;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));

        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  };

  // Easing function for smooth acceleration and deceleration
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const toggleResume = () => setIsResumeOpen(!isResumeOpen);

  // Compute all unique tags (sorted alphabetically) and tech items (sorted alphabetically) from the projects array
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags || []))).sort((a, b) => a.localeCompare(b));
  const allTech = Array.from(new Set(projects.flatMap(project => project.tech))).sort((a, b) => a.localeCompare(b));

  // Filter the projects by checking all text fields along with filtering by tag and tech.
  const filteredProjects = projects.filter((project: Project) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tech.some(tech => tech.toLowerCase().includes(query)) ||
      (project.tags && project.tags.some(tag => tag.toLowerCase().includes(query)));
    
    const matchesTag = selectedTag === 'All' || (project.tags && project.tags.includes(selectedTag));
    const matchesTech = selectedTech === 'All' || project.tech.includes(selectedTech);
    return matchesQuery && matchesTag && matchesTech;
  });

  return (
    <>
      <Head>
        <title>Jonathan Ung&apos;s Portfolio</title>
        <meta name="title" content="Jonathan Ung's Portfolio" key="title" />
        <meta name="description" content="A portfolio website for Jonathan Ung" key="description" />
        <meta property="og:title" content="Jonathan Ung's Portfolio" key="title" />
        <meta property="og:description" content="A portfolio website for Jonathan Ung" key="description" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className={`min-h-screen ${darkMode ? 'dark' : ''}`}
      >
        {/* Unified background */}
        <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 overflow-hidden">
          {/* Dark mode background */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: darkMode ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-blue-300 opacity-30"
                  style={{
                    width: Math.random() * 3 + 1 + 'px',
                    height: '100%',
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 100}%`,
                  }}
                  animate={{
                    top: ['0%', '100%'],
                    transition: {
                      delay: Math.random(), // Random initial delay between 0-1 seconds
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      repeatDelay: 0, // No delay on subsequent loops
                      ease: 'linear',
                      repeatType: 'loop',
                    },
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Light mode background */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: darkMode ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 animate-gradient">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-0 animate-gradient"
                  style={{ animationDelay: `${i * 4}s` }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-lg transition-colors duration-300`}>
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <button onClick={() => scrollToSection('home')} className="text-2xl font-bold text-gray-800 dark:text-gray-100">JU</button>
            <div className="flex items-center">
              <ul className={`md:flex md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 right-0 md:top-auto ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none backdrop-blur-sm`}>
                {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                  <li key={item} className="mb-2 md:mb-0">
                    <button
                      onClick={() => {
                        scrollToSection(item.toLowerCase())
                        setIsMenuOpen(false)
                      }}
                      className={`${
                        activeSection === item.toLowerCase()
                          ? 'text-blue-500'
                          : darkMode
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      } transition duration-300 block w-full text-left md:inline`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center space-x-4 ml-4">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} focus:outline-none md:hidden`}
                >
                  {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} transition-colors duration-300`}
                >
                  {darkMode ? <FaSun className="w-3 h-3 text-gray-100" /> : <FaMoon className="w-3 h-3 text-gray-800" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative z-10">
          <header id="home" className="min-h-screen flex items-center justify-center text-center px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="mb-6">
                <Image 
                  src="/images/headshot.png" 
                  alt="Jonathan Ung" 
                  width={250} 
                  height={250} 
                  className="rounded-full border-4 border-gray-800 dark:border-gray-100 shadow-lg hover:scale-110 hover:border-gray-100 dark:hover:border-gray-800 transition duration-300"
                />
              </div>
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Jonathan Ung
              </h1>
              <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8">
                Software Developer | CV/AI Enthusiast
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700 hover:scale-110 transition duration-300 ease-in-out"
                >
                  Let&apos;s Connect
                </button>
                <button
                  onClick={toggleResume}
                  className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 hover:scale-110 transition duration-300 ease-in-out"
                >
                  <FaFileDownload className="inline-block mr-2" />
                  View Resume
                </button>
              </div>
            </motion.div>
          </header>

          {/* About Section */}
          <section ref={aboutRef} id="about" className={`py-20 px-4 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'}`}>
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                About Me
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                  I am a dedicated software developer with a passion for creating innovative solutions. From building web applications and mobile apps to exploring the realms of AI and machine learning, I thrive on tackling complex challenges and delivering impactful work.
                </p>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                  My journey in technology has taught me the value of continuous learning, collaboration, and perseverance. I enjoy working on diverse projects, always seeking opportunities to enhance my skills and contribute to meaningful projects.
                </p>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  I am particularly excited about applying computer vision and AI technologies to automotive applications. Building on projects like AutoStop and working at Rivian-VW in the future, I look forward to developing more innovative solutions in the self-driving and autonomous vehicle space.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Experience section */}
          <section 
            ref={experienceRef}
            id="experience" 
            className={`py-20 px-4 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'}`}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Experience</h2>
              <div className="mb-8">
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setActiveTab('technical')}
                    className={`px-4 py-2 rounded-full ${
                      activeTab === 'technical'
                        ? darkMode
                          ? 'bg-gray-600 text-white'
                          : 'bg-gray-800 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-200 text-gray-700'
                    } hover:bg-gray-700 hover:text-white transition duration-300 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)] `}
                  >
                    Technical Experiences
                  </button>
                  <button
                    onClick={() => setActiveTab('extracurricular')}
                    className={`px-4 py-2 rounded-full ${
                      activeTab === 'extracurricular'
                        ? darkMode
                          ? 'bg-gray-600 text-white'
                          : 'bg-gray-800 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-200 text-gray-700'
                    } hover:bg-gray-700 hover:text-white transition duration-300 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)] `}
                  >
                    Extracurricular Experiences
                  </button>
                  <button
                    onClick={() => setActiveTab('nonTechnical')}
                    className={`px-4 py-2 rounded-full ${
                      activeTab === 'nonTechnical'
                        ? darkMode
                          ? 'bg-gray-600 text-white'
                          : 'bg-gray-800 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-200 text-gray-700'
                    } hover:bg-gray-700 hover:text-white transition duration-300 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)] `}
                  >
                    Non-Technical Experiences
                  </button>
                </div>
                <div className="space-y-6">
                  {(activeTab === 'technical' ? experiences : activeTab === 'extracurricular' ? extracurricularExperiences : nonTechnicalExperiences).map((exp: Experience | NonTechnicalExperience, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0, delay: index * 0.1 }}
                      className={`border ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'} p-6 rounded-lg flex items-center transition-all duration-300 hover:scale-120 hover:shadow-xl backdrop-blur-lg dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)]`}
                    >
                      {exp.image && (
                        <div className="flex-shrink-0 mr-6">
                          <Image
                            src={exp.image}
                            alt={exp.company}
                            width={100}
                            height={100}
                            className="rounded-lg border border-gray-300 dark:border-gray-600 hover:scale-105 hover:shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)]"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{exp.title}</h3>
                        <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.company}</p>
                        <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">{exp.date}</p>
                        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>
                        {'tech' in exp && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {exp.tech.map((tech: string, techIndex: number) => (
                              <span key={techIndex} className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} px-2 py-1 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)]`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {'link' in exp && (
                          <div className="flex space-x-4">
                            <a href={exp.link} target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline hover:scale-105 transition-all duration-300`}>
                              Learn More
                            </a>
                            {exp.gitLink && (
                              <a href={exp.gitLink} target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline hover:scale-105 transition-all duration-300`}>
                                View Code
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Skills section */}
          <section 
            ref={skillsRef}
            id="skills" 
            className={`py-20 px-4 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'}`}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className={`border ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'} p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-lg dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)]`}>
                    <h3 className={`text-xl font-semibold mb-4 capitalize ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item: string) => (
                        <span 
                          key={item} 
                          className={`
                            ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} 
                            px-2 py-1 rounded text-sm
                            transition-all duration-300
                            hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.5)]
                            dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)]
                          `}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects section */}
          <section 
            ref={projectsRef}
            id="projects" 
            className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Projects</h2>
              
              {/* Project Filter */}
              <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <input
                  type="text"
                  placeholder="Query a project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border p-2 rounded w-full md:w-1/2"
                />
                <div className="flex flex-wrap gap-4">
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="All">All Tags</option>
                    {allTags.map((tag: string) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="All">All Tech</option>
                    {allTech.map((tech: string) => (
                      <option key={tech} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project: Project, index: number) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`border ${darkMode ? 
                        'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'} 
                        p-6 rounded-lg flex flex-col transition-all duration-300 
                        hover:scale-105 hover:shadow-xl backdrop-blur-lg dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)]`}
                    >
                      {project.image && (
                        <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg relative">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain rounded-lg transition duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-lg"
                          />
                        </div>
                      )}
                      <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{project.name}</h3>
                      <p className={`mb-4 flex-grow ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech: string) => (
                          <span
                            key={tech}
                            className={`
                              ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} 
                              px-2 py-1 rounded text-sm
                              transition-all duration-300
                              hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.5)]
                              dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)]
                            `}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, tagIndex: number) => (
                            <span 
                              key={tagIndex} 
                              className={`
                                ${darkMode ? 'bg-purple-700 text-purple-200' : 'bg-purple-200 text-purple-700'} 
                                px-2 py-1 rounded text-sm
                                transition-all duration-300
                                hover:shadow-[0_0_10px_3px_rgba(128,90,213,0.5)]
                              `}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline mt-auto`}>
                        {linkContainsGit(project.link) ? 'View Project' : 'Learn More'}
                      </a>
                    </motion.div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-600 dark:text-gray-300">No projects match your criteria.</p>
                )}
              </div>
            </div>
          </section>

          {/* Education section */}
          <section
            ref={educationRef}
            id="education"
            className={`py-20 px-4 ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-md`}
          >
            <div className="max-w-4xl mx-auto">
              <h2
                className={`text-4xl font-bold mb-8 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Education
              </h2>
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`border ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'} p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-lg dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)]`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-6">
                        <Image
                          src={edu.image}
                          alt={edu.institution}
                          width={100}
                          height={100}
                          className="rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-120 hover:shadow-xl backdrop-blur-lg dark:hover:shadow-[0_0_10px_3px_rgba(96,165,250,0.5)]"
                        />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{edu.degree}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{edu.date}</p>
                        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{edu.institution}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact section */}
          <section 
            ref={contactRef}
            id="contact" 
            className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-lg`}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Let&apos;s Connect</h2>
              <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I&apos;m always open to new opportunities and collaborations. Feel free to reach out!
              </p>
              <div className="flex justify-center space-x-6 mb-8">
                <a href="mailto:jua10@sfu.ca" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-300`}>
                  <FaEnvelope className="w-8 h-8" />
                </a>
                <a href="https://www.linkedin.com/in/jonathan-ung-1193a2238/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-300`}>
                  <FaLinkedin className="w-8 h-8" />
                </a>
                <a href="https://github.com/jonathanung" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-300`}>
                  <FaGithub className="w-8 h-8" />
                </a>
                <a href="https://gitlab.com/jonathan.keith.ung" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-300`}>
                  <FaGitlab className="w-8 h-8" />
                </a>
                <a href="https://jonathanung.ca/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-300`}>
                  <FaGlobe className="w-8 h-8" />
                </a>
              </div>
              <div className="flex justify-center space-x-4">
                <a
                  href="mailto:jua10@sfu.ca"
                  className={`inline-block ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out`}
                >
                  Get in Touch
                </a>
                <button
                  onClick={toggleResume}
                  className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 hover:scale-110 transition duration-300 ease-in-out"
                >
                  <FaFileDownload className="inline-block mr-2" />
                  View Resume
                </button>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
      {isResumeOpen && (
        <div className={`fixed inset-0 z-50 overflow-hidden ${darkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} backdrop-blur-sm flex items-center justify-center p-8`}>
          <div className="relative w-full max-w-5xl">
            <button
              onClick={toggleResume}
              className="absolute -top-4 -right-4 w-8 h-8 bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full flex items-center justify-center shadow-lg transition duration-200 hover:scale-110"
            >
              <FaTimes size={20} />
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full h-[85vh] shadow-2xl">
              <iframe
                src="/resume.pdf"
                className="w-full h-full rounded-lg"
                title="Resume"
              />
              
              <div className="p-4 flex justify-center">
                <a
                  href="/resume.pdf"
                  download="Jonathan_Ung_Resume.pdf"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 hover:scale-105"
                >
                  <FaFileDownload size={20} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}