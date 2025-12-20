export interface SkillCategory {
  id: string
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    skills: ['Python', 'C++', 'C#', 'Java', 'Kotlin', 'JavaScript', 'TypeScript', 'SQL', 'Bash']
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    skills: ['FastAPI', '.NET', 'Node.js', 'Express.js', 'Spring Boot', 'REST', 'WebSockets', 'SignalR', 'gRPC']
  },
  {
    id: 'databases',
    title: 'Databases & Data',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ETL Pipelines', 'Spark', 'Pandas', 'NumPy']
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    skills: ['Docker', 'GitLab CI/CD', 'AWS', 'EC2', 'S3', 'Lambda', 'Linux', 'Microservices']
  },
  {
    id: 'ml',
    title: 'Machine Learning & Vision',
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'YOLO', 'CNNs', 'Object Detection', 'OCR', 'Kalman Filters']
  },
  {
    id: 'robotics',
    title: 'Robotics & Embedded',
    skills: ['Behavior Trees', 'Multi-Agent Systems', 'Sensor Fusion', 'IMU Processing', 'Path Planning', 'Qt6', 'Android', 'ESP32']
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind', 'Redux', 'HTML/CSS']
  },
  {
    id: 'other',
    title: 'Game Dev & Other',
    skills: ['Unity', 'Godot', 'GDScript', 'Game Development', 'Networking', 'TCP/UDP', 'Sockets']
  }
]

// Flat list for backward compatibility
export const allSkills: string[] = skillCategories.flatMap(cat => cat.skills)
