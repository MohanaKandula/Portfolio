// ============================================================
// portfolioData.js — Centralized configuration for Kandula Mohana Varsha Sri
// All external links, personal info, and content in one place.
// ============================================================

export const personalInfo = {
  name: "Kandula Mohana Varsha Sri",
  firstName: "Mohana Varsha Sri",
  brandName: "Mohana Varsha Sri",
  title: "Software Engineer",
  subtitleHighlight: "Java • Spring Boot • React",
  location: "Ongole, India",
  emails: {
    primary: "kandulamohana14@gmail.com",
  },
  summary:
    "Computer Science undergraduate at RGUKT Ongole with strong expertise in Java, Spring Boot, Microservices, REST APIs, and Data Structures & Algorithms. Experienced in building scalable backend applications using distributed systems, event-driven architecture, and relational databases through academic projects and internship experience.",
  resumeUrl: "/Resume.pdf",
};

export const socialLinks = {
  github: "https://github.com/MohanaKandula",
  linkedin: "https://linkedin.com/in/kandula-mohana-varsha-sri-960a85349",
};

export const heroContent = {
  greeting: "Hi, I'm Kandula Mohana Varsha Sri",
  titleHighlight: "Software Engineer",
  subtitle:
    "Building scalable backend systems with Spring Boot, designing modern React applications, and solving real-world problems through clean and efficient software.",
  ctaPrimary: { text: "View Projects", href: "#projects" },
  ctaSecondary: { text: "Contact Me", href: "#contact" },
  ctaResume: { text: "Download Resume", href: "/Resume.pdf" },
};

// Highlights Strip metrics displayed directly below Hero
export const heroHighlights = [
  { value: "5+", label: "Projects Built" },
  { value: "15+", label: "Technologies Used" },
  { value: "3", label: "Certifications" },
  { value: "100+", label: "LeetCode Solved" },
];

// Core stack icons shown in the Hero section
export const coreTechnologies = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

export const aboutContent = {
  heading: "Hello!",
  bio: `Hi, my name is <span class="text-black text-xl font-black mx-1 tracking-wide uppercase">Kandula Mohana Varsha Sri</span>. I am a Computer Science undergraduate at RGUKT Ongole with a strong passion for backend development and problem solving. I specialize in engineering scalable REST APIs, microservices, and distributed applications using Java & Spring Boot, while designing intuitive frontend interfaces using React. Driven by continuous learning, I love breaking down complex architectural challenges and writing clean, maintainable code.`,
  techStack: ["Java", "Spring Boot", "React"],
};

export const skillsContent = {
  badge: "My Process",
  heading: "Turning Ideas into Production-Grade Code",
  description:
    "I follow a structured, design-driven, and highly technical approach to engineering full-stack applications.",
  cards: [
    {
      number: "01",
      title: "Research & Design",
      text: "Analyzing requirements, sketching database schemas, and planning RESTful API endpoints for robust system scalability.",
    },
    {
      number: "02",
      title: "Backend Development",
      text: "Building microservices using Java and Spring Boot, configuring Kafka pipelines, and optimizing PostgreSQL database queries.",
    },
    {
      number: "03",
      title: "Frontend Integration",
      text: "Connecting backends to responsive React frontends, handling global application states, and integrating interactive dashboards.",
    },
    {
      number: "04",
      title: "Deployment & Audit",
      text: "Dockerizing services, running manual/automated tests, optimizing assets, and ensuring high-performance standards.",
    },
  ],
  endText: "Built to scale!",
};

// Grouped Technical Skills
export const technicalSkills = {
  categories: [
    {
      title: "Languages",
      skills: ["Java", "Python", "JavaScript", "SQL"],
    },
    {
      title: "Backend",
      skills: ["Spring Boot", "Spring MVC", "Spring Security", "Hibernate", "JPA"],
    },
    {
      title: "Frontend",
      skills: ["React", "HTML5", "CSS3", "TailwindCSS"],
    },
    {
      title: "Database",
      skills: ["MySQL", "PostgreSQL", "Redis"],
    },
    {
      title: "DevOps",
      skills: ["Docker", "Maven", "Git", "GitHub"],
    },
    {
      title: "Architecture & Messaging",
      skills: ["REST APIs", "Microservices", "Apache Kafka"],
    },
  ],
  currentlyLearning: ["Spring AI", "Microservices Architecture", "Docker & Kubernetes", "System Design"],
};

// Developer Metrics (Replacing fake GitHub graph)
export const developerMetrics = {
  publicRepos: 12,
  featuredRepos: 5,
  primaryLanguages: ["Java", "Spring Boot", "MySQL"],
  problemSolvingCount: "100+ solved on LeetCode",
};

// 5 Structured Projects
export const projects = [
  {
    id: "payvora",
    number: "01",
    badge: "🚀 Flagship Project",
    title: "PayVora",
    type: "Personal Project",
    overview: "An event-driven digital banking and core ledger platform built to guarantee transactional safety and high throughput.",
    problem: "Traditional banking backends struggle with service coupling, high latency, and race conditions during simultaneous ledger balance updates.",
    approach: "Architected 5 Spring Boot microservices with a database-per-service architecture. Created an event-driven transaction processing pipeline using Apache Kafka for asynchronous projections, and built a transaction-safe double-entry ledger ensuring accounting consistency.",
    techTags: ["React", "Spring Boot", "Apache Kafka", "Redis", "Zipkin", "PostgreSQL", "OpenTelemetry", "Microservices"],
    challenges: "Handling rapid sequential ledger entries without state corruption. Solved using Redis distributed caching and sequential Kafka message routing.",
    outcomes: "Engineered a transaction-safe ledger with overdraft validation and developed automated APY compounding workflows.",
    links: {
      github: "https://github.com/MohanaKandula/payvora",
    },
    isFlagship: true,
  },
  {
    id: "airbnb",
    number: "02",
    badge: "⭐ Core System",
    title: "Airbnb Backend Clone",
    type: "Personal Project",
    overview: "A highly scalable backend clone of Airbnb providing RESTful APIs for property listings, user bookings, and secure login.",
    problem: "Ensuring secure role-based operations and resolving double-booking contentions in a high-concurrency listing search portal.",
    approach: "Developed a Spring Boot API integrated with PostgreSQL. Implemented JWT authentication and Role-Based Access Control (RBAC). Modeled secure SDLC booking workflows and exception-handling frameworks.",
    techTags: ["Spring Boot", "PostgreSQL", "REST APIs", "Docker", "Postman", "Java", "JWT"],
    challenges: "Managing concurrent booking windows. Solved by implementing database-level transaction isolation and custom query locks.",
    outcomes: "Delivered a fully documented and secure marketplace backend tested rigorously via Postman.",
    links: {
      github: "https://github.com/MohanaKandula/Airbnb-Backend-Clone",
    },
    isFlagship: false,
  },
  {
    id: "ai_government_sahayak",
    number: "03",
    badge: "AI & Automation",
    title: "AI-Sahayak: Government Scheme Analyzer",
    type: "Academic Project",
    overview: "An intelligent Streamlit web application that simplifies complex Indian Government schemes into clear, structured summaries in both English and Telugu.",
    problem: "Official government scheme documents are long, complex, and written in jargon, making it difficult for citizens to check eligibility or understand how to apply.",
    approach: "Engineered a multi-layer content extraction scraper (Playwright → Selenium → Readability → Requests) and an AI summarizer using OpenRouter API. Built Telugu translation, gTTS voice output, local PDF exports, and a smart Q&A engine.",
    techTags: ["Streamlit", "Python", "OpenRouter API", "SQLite", "gTTS", "ReportLab", "Playwright", "Selenium"],
    challenges: "Extracting content reliably from dynamic, slow-loading department websites. Resolved by designing a self-healing scraping pipeline with progressive fallbacks.",
    outcomes: "Simplified eligibility discovery, translation, and local report sharing (WhatsApp & PDF), allowing citizens to query scheme details using natural language.",
    links: {
      github: "https://github.com/MohanaKandula/government_scheme_analyzer",
    },
    isFlagship: false,
  },
  {
    id: "tutortrace",
    number: "04",
    badge: "Full Stack",
    title: "TutorTrace — Student-Tutor Management Platform",
    type: "Personal Project",
    overview: "A centralized platform for managing learning activities, tracking academic progress, and improving communication between students and tutors.",
    problem: "Traditional academic tracking and communication between tutors and students are often fragmented and rely on manual, time-consuming efforts.",
    approach: "Built using React and Flask. Integrates modern web technologies and intelligent features to streamline attendance, assignment management, performance monitoring, and tutor-student interactions.",
    techTags: ["React", "Python", "Flask", "APIs", "Machine Learning"],
    challenges: "Handling real-time state synchronization for performance monitoring and securing student-tutor access control boundaries.",
    outcomes: "Delivered a reliable digital platform that improves decision-making, saves time, and empowers both students and tutors to achieve better educational outcomes.",
    links: {
      github: "https://github.com/MohanaKandula/AI_Youtube_Analytics",
    },
    isFlagship: false,
  },
  {
    id: "fitness_square",
    number: "05",
    badge: "Full Stack",
    title: "Fitness Square",
    type: "Academic Project",
    overview: "Fitness Square is a full-stack health and fitness platform that helps users build healthier lifestyles by tracking workouts, nutrition, hydration, sleep, and recovery, enabling seamless collaboration with trainers.",
    problem: "Health tracking is often fragmented across disparate apps, lacking secure access, interactive analytics, and professional trainer-member workflows.",
    approach: "Developed a scalable RESTful backend using Spring Boot and MongoDB, secured with JWT and Google OAuth2. Built modular trackers, interactive Chart.js dashboards, and a trainer collaboration module with scheduling.",
    techTags: ["Spring Boot", "Java", "MongoDB", "Spring Security", "JWT", "OAuth2", "Chart.js", "JavaScript"],
    challenges: "Achieving near real-time notification syncing between members and trainers. Resolved by designing an asynchronous polling service and Role-Based Access Control.",
    outcomes: "Delivered a comprehensive fitness platform featuring multi-channel authentication, progress analytics, and trainer-member communication workflows.",
    links: {
      github: "https://github.com/MohanaKandula/Fitness_Square",
    },
    isFlagship: false,
  },
];

// Certifications for the unified Timeline
export const certifications = [
  { name: "Cloud Computing Certification (Score: 95%)", issuer: "NPTEL", icon: "☁️" },
  { name: "Infosys Springboard Virtual Intern – Java Backend Development", issuer: "Infosys", icon: "☕" },
  { name: "Elevate Labs – Java Developer Internship", issuer: "Elevate Labs", icon: "💼" },
];

// Unified Timeline Data (Chronological: Nov 2021 – Present)
export const timelineEvents = [
  {
    date: "November 2021",
    type: "Education",
    title: "Joined RGUKT Ongole",
    subtitle: "Rajiv Gandhi University of Knowledge Technologies",
    description: "Started Pre-University Course at RGUKT, building strong foundations in Mathematics, Physics, Programming, and Computer Science.",
    badge: "Education",
  },
  {
    date: "August 2023",
    type: "Education",
    title: "Started B.Tech in CSE",
    subtitle: "Rajiv Gandhi University of Knowledge Technologies",
    description: "Focused on Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Software Engineering.",
    badge: "Education",
  },
  {
    date: "2025",
    type: "Project",
    title: "Government Scheme Analyzer",
    subtitle: "Academic Project",
    description: "Developed an intelligent platform to simplify access to government schemes through automated scraping and structured summaries.",
    badge: "Project",
  },
  {
    date: "2025",
    type: "Project",
    title: "TutorTrace",
    subtitle: "Personal Project",
    description: "Centralized academic platform for attendance, assignment management, progress tracking, and student-tutor communication.",
    badge: "Project",
  },
  {
    date: "2025",
    type: "Internship",
    title: "Elevate Labs Java Developer Internship",
    subtitle: "Java • Spring Boot • Spring Security • Hibernate/JPA • MySQL • JWT • REST APIs",
    description: "Completed internship tasks in Java backend development, REST APIs, and database integration.\n\nFeatured Project: Airbnb Backend Clone (Built a Spring Boot backend with JWT auth, booking workflows, and MySQL database integration).",
    badge: "Internship",
  },
  {
    date: "November 2025",
    type: "Certification",
    title: "Cloud Computing Certification",
    subtitle: "NPTEL / SWAYAM",
    description: "Completed NPTEL Cloud Computing certification course with a score of 95%.",
    badge: "Certification",
  },
  {
    date: "2026",
    type: "Internship",
    title: "Infosys Springboard Virtual Internship",
    subtitle: "Java • Spring Boot • React • MySQL • REST APIs",
    description: "Completed virtual internship by developing WellNest (Fitness Square), a full-stack health tracker with workout/nutrition logs, caloric analytics, and trainer collaboration.",
    badge: "Internship",
  },
  {
    date: "2026",
    type: "Project",
    title: "AI YouTube Analytics Dashboard",
    subtitle: "Personal Project",
    description: "Developed a Python analytics dashboard providing YouTube channel insights, metrics, and video relationship graphs.",
    badge: "Project",
  },
  {
    date: "2026",
    type: "Project",
    title: "PayVora",
    subtitle: "Personal Project",
    description: "Built an event-driven digital banking ledger featuring secure, high-concurrency transaction processing.",
    badge: "Project",
  },
  {
    date: "Present",
    type: "Career",
    title: "Seeking Software Engineer Opportunities",
    subtitle: "Career Milestone",
    description: "Learning Spring AI, Microservices, Docker, Kubernetes, and System Design while building scalable backends and preparing for software engineering roles.",
    badge: "Career",
  },
];

export const softSkillsList = [
  { name: "Problem Solving", icon: "🧩", desc: "Breaking down complex engineering tasks into clean, logical, and modular backend code." },
  { name: "Team Collaboration", icon: "🤝", desc: "Working in sync with frontend developers, planners, and mentors using Git." },
  { name: "Communication", icon: "💬", desc: "Writing clean documentations and communicating core technical ideas effectively." },
  { name: "Adaptability", icon: "🌟", desc: "Quickly picking up new tools, database models, messaging systems, or deployment configurations." },
];

export const footerContent = {
  taglines: [
    "Software Engineering & Web Dev",
    "Java · Spring Boot · React",
    "Distributed Backend Applications",
  ],
  credential: "B.Tech CSE Student @ RGUKT Ongole",
  copyright: `© ${new Date().getFullYear()} Kandula Mohana Varsha Sri | All rights reserved`,
};

// EmailJS Configuration
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
