import { EducationItem } from './types'

export const education: EducationItem[] = [
  {
    id: 'sfu',
    title: 'B.Sc. Computing Science, Statistics Minor',
    institution: 'Simon Fraser University',
    location: 'Burnaby, BC',
    period: 'Jan 2024 – Aug 2027',
    image: '/images/sfu.png',
    tags: ['Current'],
    seeMore: true,
    description: 'Pursuing a Bachelor of Science in Computing Science with a minor in Statistics.',
    courses: [
      'CMPT 307 - Data Structures and Algorithms',
      'CMPT 310 - Intro to Artificial Intelligence',
      'CMPT 353 - Computational Data Science',
      'CMPT 361 - Intro to Computer Vision and Computer Graphics',
      'CMPT 365 - Multimedia Systems',
      'CMPT 371 - Networking'
    ]
  },
  {
    id: 'langara',
    title: 'Computer Science Transfer',
    institution: 'Langara College',
    location: 'Vancouver, BC',
    period: 'Sep 2021 – Dec 2024',
    image: '/images/langara.png',
    seeMore: false,
    description: 'Completed transfer credits for Computer Science before transferring to SFU.'
  },
  {
    id: 'coding-dojo',
    title: 'Web Development Certificate',
    institution: 'Coding Dojo (Colorado Technical University)',
    location: 'Colorado Springs, CO (Online)',
    period: 'May 2022 – Aug 2022',
    image: '/images/codingdojo.png',
    seeMore: false,
    description: 'Intensive full-stack web development bootcamp covering Python, JavaScript, and MERN stack.'
  }
]
