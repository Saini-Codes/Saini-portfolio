export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  motivation: string;
  challenges: string;
  learnings: string;
  folderStructure: string;
  features: string[];
  techStack: string[];
  architecture?: string;
  futureImprovements?: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  category: "web" | "mobile" | "ai";
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
  detailsUrl?: string;
}

export interface Activity {
  role: string;
  organization: string;
  duration: string;
  description: string;
  image: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  verifyUrl: string;
  certificateUrl?: string;
  image: string;
  summary?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  resumeUrl: string;
  lastUpdatedResume: string;
  location: string;

  socials: {
    github: string;
    linkedin: string;
    email: string;
    leetcode?: string;
  };

  education: {
    institution: string;
    degree: string;
    specialization: string;
    duration: string;
    gpa?: string;
  }[];

  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    aiMl: string[];
  };

  projects: Project[];

  achievements: Achievement[];

  activities: Activity[];

  certificates: Certificate[];
}

export const portfolioData: PortfolioData = {
  name: "Saini Paul",

  title: "MCA Student | Full Stack Developer | AI/ML Enthusiast",

  subtitle: "Building ideas into impactful digital experiences.",

  bio: "I’m an MCA student and full-stack developer passionate about building modern, practical applications. I enjoy turning ideas into clean, user-focused solutions while exploring AI and emerging technologies.",

  resumeUrl: "/Saini_Resume.pdf",

  lastUpdatedResume: "July 2026",

  location: "Halisahar, West Bengal, India",

  socials: {
    github: "https://github.com/saini-codes",
    linkedin: "https://linkedin.com/in/saini-codes",
    email: "sainipaul.professional@gmail.com",
    leetcode: "https://leetcode.com/u/SainiPaul/",
  },

  education: [
    {
      institution: "Techno India, Hooghly",
      degree: "MCA",
      specialization: "Python, AI/ML, Full Stack Development",
      duration: "2025 - 2027",
      gpa: "8.82",
    },
  ],

  skills: {
    languages: [
      "Python",
      "Java",
      "C++",
      "HTML/CSS",
      "TypeScript",
      "JavaScript",
    ],

    frameworks: [
      "React",
      "Node.js",
      "Tailwind CSS",
      "Spring Boot",
    ],

    databases: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "SQL",
    ],

    tools: [
      "Git",
      "GitHub Actions",
      "Vite",
      "Linux",
      "Postman",
      "Vercel",
      "Cloudinary",
    ],

    aiMl: [
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "GAN",
      "RASA",
    ],
  },

  projects: [
    {
      id: "smarthire",

      title: "SmartHire",

      tagline: "AI-Powered Recruitment & Job Management Platform",

      description:
        "A full-stack recruitment platform connecting students, recruiters, and administrators through a centralized hiring workflow. It includes job posting, student applications, recruiter approval, applicant management, and AI-based resume scoring.",

      problem:
        "Traditional recruitment workflows can be fragmented and time-consuming. SmartHire centralizes job discovery, applications, recruiter management, and candidate evaluation.",

      motivation:
        "Built to create a practical recruitment ecosystem where students can discover and apply for jobs while recruiters can efficiently manage drives and applicants.",

      challenges:
        "Integrating student, recruiter, and admin workflows with authentication, resume uploads, application status management, recruiter approval, and AI-assisted resume evaluation.",

      learnings:
        "Strengthened full-stack development skills using React, Spring Boot, MySQL, REST APIs, Cloudinary, authentication, and AI-based resume evaluation.",

      folderStructure:
        "Frontend: React + Vite | Backend: Spring Boot + Java | Database: MySQL",

      features: [
        "Student registration, email verification, login, job browsing, applications, and application tracking.",
        "Recruiter registration with admin approval, job posting, and applicant management.",
        "Admin dashboard for managing students, recruiters, jobs, and platform activity.",
        "Resume upload and cloud storage using Cloudinary.",
        "AI-based resume scoring for evaluating candidate compatibility with job requirements.",
        "Application status management including shortlist, approve, and reject workflows.",
      ],

      techStack: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Spring Boot",
        "Java",
        "MySQL",
        "Cloudinary",
        "REST API",
      ],

      architecture:
        "React frontend communicates with a Spring Boot REST API. The backend manages authentication, users, jobs, recruiters, applications, and resume processing. MySQL stores application data while Cloudinary stores uploaded resumes.",

      futureImprovements: [
        "JWT-based authentication and refresh tokens.",
        "Advanced AI resume and job matching.",
        "Recruiter analytics dashboard.",
        "Automated email notifications.",
        "Interview scheduling and calendar integration.",
        "Real-time application status notifications.",
      ],

      githubUrl: "https://github.com/Jit-codes-ez/SmartHire",

      liveUrl: "https://sainipaul.vercel.app/",

      image: "/placeholders/smarthire.svg",

      category: "ai",
    },

    {
      id: "online-tutor-finder",

      title: "Online Tutor Finder",

      tagline: "AI-Integrated Full Stack Tutor Discovery Platform",

      description:
        "A full-stack web application connecting students with tutors through location-based search and verified tutor profiles, with an AI chatbot for user assistance.",

      problem:
        "Students can find it difficult to discover suitable tutors based on location, subject requirements, and tutor credibility.",

      motivation:
        "Built to make tutor discovery more accessible through search, verification, authentication, and AI-powered assistance.",

      challenges:
        "Implementing authentication, location-based search, tutor verification, and AI chatbot integration in one application.",

      learnings:
        "Developed practical experience in full-stack web development, database integration, authentication, location-based search, and AI chatbot implementation.",

      folderStructure:
        "Frontend: HTML + CSS + JavaScript | Backend: PHP | Database: MySQL | AI: Python + RASA",

      features: [
        "Email OTP authentication.",
        "Location-based tutor search.",
        "Tutor verification.",
        "Tutor profile management.",
        "AI chatbot using RASA.",
      ],

      techStack: [
        "PHP",
        "MySQL",
        "HTML",
        "CSS",
        "JavaScript",
        "Python",
        "RASA",
      ],

      architecture:
        "The web frontend communicates with the PHP backend, which manages authentication, tutor profiles, search, and database operations. The RASA chatbot provides AI-powered assistance to users.",

      futureImprovements: [
        "Online tutor booking.",
        "Integrated payment system.",
        "Tutor ratings and reviews.",
        "Video calling functionality.",
        "AI-powered tutor recommendations.",
      ],

      githubUrl: "https://github.com/Saini-Codes/TutorFinder",

      image: "/placeholders/tutor-finder.svg",

      category: "web",
    },

    {
      id: "cgan-ml-kem",

      title: "CGAN-Based Trace Augmentation for ML-KEM",

      tagline: "Machine Learning Research for Side-Channel Analysis",

      description:
        "A research project using Conditional Generative Adversarial Networks (CGAN) to generate synthetic side-channel traces and improve machine learning-based side-channel attack performance against ML-KEM.",

      problem:
        "Side-channel analysis can be limited by the availability and quality of trace data. Synthetic trace generation can help augment datasets for machine learning-based analysis.",

      motivation:
        "Explored generative AI techniques for creating synthetic traces and improving machine learning-based side-channel attack performance.",

      challenges:
        "Designing a CGAN-based approach for realistic trace augmentation while maintaining useful characteristics for downstream analysis.",

      learnings:
        "Gained experience in machine learning, generative models, cybersecurity concepts, side-channel analysis, and research-oriented experimentation.",

      folderStructure:
        "Python Project | Data Processing | CGAN Model | ML-KEM Trace Analysis",

      features: [
        "Conditional GAN-based synthetic trace generation.",
        "Trace augmentation for machine learning-based side-channel analysis.",
        "Evaluation of augmented traces for ML-KEM attack performance.",
        "Machine learning-based trace analysis.",
      ],

      techStack: [
        "Python",
        "TensorFlow",
        "GAN",
        "Machine Learning",
        "ML-KEM",
      ],

      architecture:
        "Raw side-channel traces are processed and used to train a Conditional GAN. The trained model generates synthetic traces which are combined with real traces to augment the dataset and evaluate machine learning attack performance.",

      futureImprovements: [
        "Improve synthetic trace quality.",
        "Experiment with advanced GAN architectures.",
        "Evaluate against larger datasets.",
        "Compare different data augmentation techniques.",
      ],

      githubUrl: "https://github.com/Saini-Codes",

      image: "/placeholders/cgan.svg",

      category: "ai",
    },
  ],

 achievements: [
  {
    title: "Best Paper Award – CGAN-Based Trace Augmentation for ML-KEM",
    issuer: "Academic Research Conference",
    date: "2026",
    description:
      "Received the Best Paper Award for research on CGAN-based trace augmentation for ML-KEM, focusing on synthetic side-channel trace generation and improving machine learning-based side-channel analysis.",
    image: "/placeholders/best-paper-award.svg",
  },
],

activities: [
  {
    role: "Poster Maker – Inter-College Event",
    organization: "Inter-College Competition",
    duration: "2025",
    description:
      "Participated in an inter-college poster-making competition, demonstrating creativity, visual communication, and the ability to present ideas effectively through engaging poster designs.",
    image: "/placeholders/poster-making.svg",
  },
],
  certificates: [
    {
      title: "Tata Cybersecurity Security Analyst Job Simulation",

      issuer: "Tata",

      date: "2025",

      credentialId: "",

      skills: [
        "Cybersecurity",
        "Security Analysis",
      ],

      verifyUrl: "",

      image: "/placeholders/cybersecurity.svg",

      summary:
        "Completed a cybersecurity-focused job simulation covering practical security analyst tasks.",
    },

    {
      title: "Applied AI using Python",

      issuer: "Way to AI",

      date: "2025",

      credentialId: "",

      skills: [
        "Artificial Intelligence",
        "Python",
        "Machine Learning",
      ],

      verifyUrl: "",

      image: "/placeholders/ai.svg",

      summary:
        "Completed training focused on applying Artificial Intelligence concepts using Python.",
    },

    {
      title: "International Conference Participation",

      issuer: "International Conference",

      date: "2025",

      credentialId: "",

      skills: [
        "Research",
        "Technical Communication",
      ],

      verifyUrl: "",

      image: "/placeholders/conference.svg",

      summary:
        "Participated in an international technical conference and gained exposure to current research and technology.",
    },
  ],
};
