'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaGitlab, FaGlobe, FaMoon, FaSun } from 'react-icons/fa'
import Image from 'next/image'

// Define types for skills, projects, experiences, and nonTechnicalExperiences
type Skill = {
  [key: string]: string[]
}

type Project = {
  name: string
  description: string
  tech: string[]
  link: string
  image?: string
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

const skills: Skill = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'C++', 'C#', 'SQL', 'Java', 'GD Script', 'Dart', 'Bash', 'Perl', 'HTML', 'CSS'],
  machineLearning: ['NumPy', 'PyTorch', 'Pandas'],
  frontend: ['React', 'Next.js', 'Angular', 'Flask', 'Django', 'Spring MVC', 'SASS', 'jQuery', 'Flutter', 'Bootstrap', 'Tailwind'],
  backend: ['SQL', 'PostgreSQL', 'MySQL', 'SQLAlchemy', 'SQLite3', 'ORM', 'Express', 'MongoDB', 'JWT', 'FastAPI', 'Flask', 'Spring Boot', 'Bcrypt'],
  deployment: ['AWS', 'Kubernetes', 'Docker', 'Git', 'Defang', 'CI/CD', 'InMotion Hosting', 'Cloudflare', 'SSL', 'Nginx'],
  other: ['QT6', 'Protobuf', 'MERN', 'JavaFX', 'Godot4', 'Unity', 'TensorFlow', 'Keras', 'Regex', 'Scripting', 'OOP', 'API', 'REST', 'Bcrypt']
}

const projects: Project[] = [
  {
    name: 'ChronoCal',
    description: 'A feature-rich calendar application with AI-powered task creation and expense tracking. Includes CRUD functionality for events and an intuitive user interface.',
    tech: ['MongoDB', 'Express.js', 'Next.js', 'Node.js', 'GPT-4'],
    link: 'https://github.com/jonathanung/chronocal',
    image: '/images/chronocal.png'
  },
  {
    name: 'Transcribr',
    description: 'A Discord bot designed for recording, transcribing, and summarizing meetings, utilizing Discord.js, ffmpeg, and GPT-Whisper API for transcription.',
    tech: ['Discord.js', 'Opus', 'ffmpeg', 'GPT-Whisper API'],
    link: 'https://github.com/jonathanung/transcribr',
    image: '/images/transcribr.png'
  },
  {
    name: 'Sewjo (FABCycle x CMPT 276)',
    description: 'A fabric and sewing pattern tracking app made for FABCycle.',
    tech: ['Next.js', 'Tailwind', 'Java Spring'],
    link: 'https://github.com/niomedev/sewjo',
    image: '/images/sewjo.png'
  },
  {
    name: 'Chaoscribe',
    description: 'A news categorization tool developed for ChaosHacks2024, categorizing articles based on chaos levels.',
    tech: ['Next.js', 'FastAPI', 'GPT-4'],
    link: 'https://github.com/jonathanung/chaoscribe',
    image: '/images/chaoscribe.jpg'
  },
  {
    name: 'AccessMart',
    description: 'A tool developed during NWHacks2024 using MappedIn, helping shoppers navigate their way through stores.',
    tech: ['React.js', 'Firebase', 'MappedIn API'],
    link: 'https://github.com/jonathanung/accessmart',
    image: '/images/accessmart.jpg'
  },
  {
    name: 'ShreddedWizards',
    description: 'A game created during StormHacks2024, using a fighting game style, with usable items and powerups.',
    tech: ['Godot4', 'GDScript'], 
    link: 'https://github.com/jonathanung/shreddedwizards',
    image: '/images/shreddedwizards.jpg'
  },
  {
    name: 'Pignance',
    description: 'A web app created during StormHacks2024V2 to help kids with finance tracking and literacy using a home-hosted Gemma2 LLM and OCR.',
    tech: ['Gemma2 LLM', 'OCR', 'Next.js', 'Tailwind', 'FastAPI'],
    link: 'https://github.com/jonathanung/532-finance',
    image: '/images/pignance.png'
  }
]

const experiences: Experience[] = [
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
    title: 'Code Sensei',
    company: 'Code Ninjas - Richmond, BC',
    date: 'August 2023 - PRESENT',
    description: 'Advised students on curriculum progression, integrated technology into the curriculum, and learned Unity for larger projects. Aided in deploying a scalable NAS for student project data storage.',
    tech: ['Unity', 'Game Development', 'Teaching'],
    link: 'https://www.codeninjas.com/richmond-bc-ca',
    image: '/images/code-ninjas.png'
  },
  {
    title: 'Executive Advisor,Vice President, Lead Hackathon Coordinator',
    company: 'Langara Computer Science Club - Vancouver, BC',
    date: 'April 2023 - April 2024',
    description: 'Led the creation of inaugural Langara Hacks, managed committee for event quality, and created organizational standards for club tasks and meetings.',
    tech: ['Event Management', 'Leadership'],
    link: 'https://langaracs.ca/',
    image: '/images/langara-cs-club.png'
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

const nonTechnicalExperiences: NonTechnicalExperience[] = [
  {
    title: 'Scheduling Manager, Kitchen Supervisor and Line Cook',
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

export default function Page() {
  const [activeTab, setActiveTab] = useState<'technical' | 'nonTechnical'>('technical')
  const [isLoaded, setIsLoaded] = useState<boolean>(true)
  const [darkMode, setDarkMode] = useState<boolean>(false)

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const experienceRef = useRef(null)
  const contactRef = useRef(null)

  const aboutInView = useInView(aboutRef, { once: true, amount: 0.2 })
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 })
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.2 })
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 })
  const contactInView = useInView(contactRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} font-sans`}
    >
      <div className="relative z-10">
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
        </button>

        <header className="h-screen flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <Image 
                src="/images/headshot.png" 
                alt="Jonathan Ung" 
                width={250} 
                height={250} 
                className="rounded-full border-4 border-gray-800 shadow-lg hover:scale-110 hover:border-gray-100 transition duration-300"
              />
            </div>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Jonathan Ung
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-8">
              Software Developer | AI Enthusiast | Problem Solver
            </p>
            <a
              href="#contact"
              className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700 hover:scale-110 transition duration-300 ease-in-out"
            >
              Let's Connect
            </a>
          </motion.div>
        </header>

        <motion.section 
          ref={aboutRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 50 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          id="about" 
          className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>About Me</h2>
            <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              I'm a passionate software developer based in Vancouver, BC, with a keen interest in AI, Data Science, Networking, and Embedded Systems. As a 3rd-year SFU Co-op student, I bring over two years of experience in software development to the table.
            </p>
            <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Currently, I'm serving as the Software Team Lead for the SFU Robot Soccer Team (Bandits FC), where I'm honing my skills in distributed systems, embedded systems, and autonomous movement. I'm also a Code Sensei at Code Ninjas, teaching kids how to code and run game development projects.
            </p>
            <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              My diverse project portfolio demonstrates my ability to quickly adapt to new technologies and deliver innovative solutions. From developing AI-powered applications to creating games and tools for accessibility, I've consistently pushed the boundaries of what's possible with code.
            </p>
            <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              I'm not just a coder; I'm a problem solver and a team player. My experience in leadership roles has honed my communication and project management skills, making me an asset to any development team. I'm eager to bring my enthusiasm, technical skills, and fresh perspectives to a challenging co-op position where I can contribute meaningfully and continue to grow as a developer.
            </p>
          </div>
        </motion.section>

        <motion.section 
          ref={skillsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: skillsInView ? 1 : 0, y: skillsInView ? 0 : 50 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          id="skills" 
          className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                  <h3 className={`text-xl font-semibold mb-4 capitalize ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item: string) => (
                      <span key={item} className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} px-2 py-1 rounded text-sm`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          ref={projectsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: projectsInView ? 1 : 0, y: projectsInView ? 0 : 50 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          id="projects" 
          className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project: Project, index: number) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-6 rounded-lg flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  {project.image && (
                    <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg relative">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain border border-gray-300 dark:border-gray-600"
                      />
                    </div>
                  )}
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{project.name}</h3>
                  <p className={`mb-4 flex-grow ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string) => (
                      <span key={tech} className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} px-2 py-1 rounded text-sm`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline mt-auto`}>
                    View Project
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          ref={experienceRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: experienceInView ? 1 : 0, y: experienceInView ? 0 : 50 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          id="experience" 
          className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
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
                  } hover:bg-gray-700 hover:text-white transition duration-300`}
                >
                  Technical Experiences
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
                  } hover:bg-gray-700 hover:text-white transition duration-300`}
                >
                  Non-Technical Experiences
                </button>
              </div>
              <div className="space-y-6">
                {(activeTab === 'technical' ? experiences : nonTechnicalExperiences).map((exp: Experience | NonTechnicalExperience, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-6 rounded-lg flex items-center transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    {exp.image && (
                      <div className="flex-shrink-0 mr-6">
                        <Image
                          src={exp.image}
                          alt={exp.company}
                          width={100}
                          height={100}
                          className="rounded-lg border border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{exp.title}</h3>
                      <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.company}</p>
                      <p className="text-sm mb-4 text-gray-600">{exp.date}</p>
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>
                      {'tech' in exp && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.tech.map((tech: string, techIndex: number) => (
                            <span key={techIndex} className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} px-2 py-1 rounded-full text-sm`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {'link' in exp && (
                        <div className="flex space-x-4">
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                            Learn More
                          </a>
                          {exp.gitLink && (
                            <a href={exp.gitLink} target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
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
        </motion.section>

        <motion.section 
          ref={contactRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: contactInView ? 1 : 0, y: contactInView ? 0 : 50 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          id="contact" 
          className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Let's Connect</h2>
            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              I'm always open to new opportunities and collaborations. Feel free to reach out!
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
              <a  href="https://gitlab.com/jonathan.keith.ung" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-300`}>
                <FaGitlab className="w-8 h-8" />
              </a>
              <a href="https://jonathanung.ca/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-300`}>
                <FaGlobe className="w-8 h-8" />
              </a>
            </div>
            <a
              href="#contact"
              className={`inline-block ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out`}
            >
              Get in Touch
            </a>
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}