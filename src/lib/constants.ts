// Portfolio Constants and Configuration

export const PORTFOLIO_CONFIG = {
  name: "Jayaram Uday Marali",
  title: "Software Engineer & GCP Certified Associate Cloud Engineer",
  email: "jayaramuday17@gmail.com",
  phone: "+91 6302595694",
  location: "Remote",
  summary:
    "A passionate Software Engineer with expertise in cloud infrastructure and scalable applications",

  social: {
    github: "https://github.com/Uday1772002",
    linkedin: "https://www.linkedin.com/in/jayaramuday-marali/",
    twitter: "https://x.com/UdayMarali86687",
  },

  skills: [
    "Dart",
    "JavaScript",
    "Flutter",
    "React",
    "Redux",
    "Node.js",
    "Express.js",
    "HTML5",
    "CSS3",
    "GCP",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "MongoDB",
    "MySQL",
    "Firebase",
    "Git",
    "Microservices",
    "Distributed Systems",
  ],

  highlights: [
    {
      title: "Full-Stack Development",
      description:
        "Building scalable applications with React, Node.js, and Flutter",
      icon: "Code",
    },
    {
      title: "Cloud & DevOps",
      description:
        "GCP certified engineer with expertise in containerization and CI/CD",
      icon: "Cloud",
    },
    {
      title: "Mobile Development",
      description:
        "Creating cross-platform mobile apps with Flutter and React Native",
      icon: "Smartphone",
    },
    {
      title: "Database Design",
      description:
        "Working with MongoDB, MySQL, and Firebase for data management",
      icon: "Database",
    },
  ],
};

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  endpoints: {
    health: "/health",
    contact: "/contact",
    projects: "/projects",
    experience: "/experience",
  },
  timeouts: {
    request: 10000, // 10 seconds
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // 1 minute
  },
};

export const UI_CONFIG = {
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280,
  },
};
