const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const Project = require("../models/Project");
const Experience = require("../models/Experience");
require("dotenv").config();

const projectsData = [
  {
    title: "Realtime Social News Platform",
    description:
      "Developed a social news platform using Hono, Tanstack, and Drizzle ORM. Features include infinite scrolling, advanced caching, and real-time updates with under 200ms latency.",
    shortDescription:
      "A high-performance social news platform with real-time updates and advanced caching.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
    tags: ["Hono", "Tanstack", "Drizzle ORM", "Real-time", "Caching"],
    technologies: [
      "Hono",
      "Tanstack",
      "Drizzle ORM",
      "TypeScript",
      "Real-time APIs",
    ],
    features: [
      "Infinite scrolling for better UX",
      "Advanced caching mechanisms",
      "Real-time updates under 200ms",
      "Responsive design for all devices",
    ],
    status: "completed",
    category: "Web Application",
    priority: 9,
    startDate: new Date("2024-01-01"),
    completionDate: new Date("2024-01-15"),
    estimatedHours: 120,
    actualHours: 110,
    challenges: [
      "Achieving sub-200ms latency for real-time updates",
      "Implementing efficient caching strategies",
      "Handling high concurrent user loads",
    ],
    solutions: [
      "Used WebSocket connections for real-time updates",
      "Implemented Redis caching with intelligent invalidation",
      "Applied connection pooling and load balancing",
    ],
    metrics: {
      usersReached: 5000,
      performanceImprovement: "200ms latency",
      costReduction: "30% server costs",
      efficiencyGain: "40% faster loading",
    },
    isFeatured: true,
    isPublic: true,
    liveUrl: "https://social-news-platform.com",
    githubUrl: "https://github.com/username/social-news-platform",
  },
  {
    title: "Flutter-based HRMS System",
    description:
      "Built a comprehensive HR management system for 500+ employees. Automated payroll, attendance tracking, and leave management workflows handling 1,500+ transactions monthly.",
    shortDescription:
      "Enterprise HR management system automating payroll and employee workflows.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    tags: ["Flutter", "HRMS", "Automation", "Payroll", "Workflow"],
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "REST APIs",
      "State Management",
    ],
    features: [
      "Employee management system",
      "Automated payroll processing",
      "Attendance tracking",
      "Leave management workflows",
      "Real-time notifications",
    ],
    status: "completed",
    category: "Mobile Application",
    priority: 8,
    startDate: new Date("2024-02-01"),
    completionDate: new Date("2024-06-20"),
    estimatedHours: 400,
    actualHours: 380,
    challenges: [
      "Handling complex payroll calculations",
      "Managing large employee datasets",
      "Ensuring data security and privacy",
    ],
    solutions: [
      "Implemented modular payroll calculation engine",
      "Used efficient database indexing and pagination",
      "Applied role-based access control and encryption",
    ],
    metrics: {
      usersReached: 500,
      performanceImprovement: "35% efficiency gain",
      costReduction: "25% operational costs",
      efficiencyGain: "35% faster processing",
    },
    isFeatured: true,
    isPublic: true,
    liveUrl: "https://hrms-app.com",
    githubUrl: "https://github.com/username/hrms-system",
  },
  {
    title: "NudgeMath Educational Platform",
    description:
      "Developed an educational platform with real-time error detection, used by 2000+ students. Features include logical step validation, instant feedback, and accuracy analytics.",
    shortDescription:
      "Educational platform with real-time error detection and adaptive learning.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80",
    tags: ["Education", "Real-time", "Analytics", "Mobile", "Learning"],
    technologies: [
      "React Native",
      "Node.js",
      "MongoDB",
      "Real-time APIs",
      "Analytics",
    ],
    features: [
      "Real-time error detection",
      "Logical step validation",
      "Instant feedback system",
      "Student progress analytics",
      "Adaptive learning algorithms",
    ],
    status: "completed",
    category: "Educational Platform",
    priority: 7,
    startDate: new Date("2022-05-01"),
    completionDate: new Date("2022-08-15"),
    estimatedHours: 300,
    actualHours: 280,
    challenges: [
      "Implementing real-time error detection algorithms",
      "Processing large volumes of student submissions",
      "Creating intuitive user interface for complex math problems",
    ],
    solutions: [
      "Used pattern recognition and machine learning for error detection",
      "Implemented efficient data processing pipelines",
      "Applied user-centered design principles",
    ],
    metrics: {
      usersReached: 2000,
      performanceImprovement: "50% learning time reduction",
      costReduction: "40% development time",
      efficiencyGain: "100,000+ solutions processed",
    },
    isFeatured: true,
    isPublic: true,
    liveUrl: "https://nudgemath.com",
    githubUrl: "https://github.com/username/nudgemath",
  },
  {
    title: "Decentralized Messaging System",
    description:
      "Integrated Nostr protocol for a decentralized real-time messaging system with end-to-end encryption, generating 40% increase in daily active conversations.",
    shortDescription:
      "Decentralized messaging system using Nostr protocol with end-to-end encryption.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
    tags: [
      "Nostr Protocol",
      "Encryption",
      "Decentralized",
      "Real-time",
      "Security",
    ],
    technologies: [
      "Nostr Protocol",
      "WebRTC",
      "End-to-end Encryption",
      "P2P",
      "Security",
    ],
    features: [
      "Decentralized architecture",
      "End-to-end encryption",
      "Real-time messaging",
      "Cross-platform compatibility",
      "Enhanced security protocols",
    ],
    status: "in-progress",
    category: "API",
    priority: 10,
    startDate: new Date("2024-09-01"),
    completionDate: new Date("2024-12-01"),
    estimatedHours: 250,
    actualHours: 120,
    challenges: [
      "Implementing Nostr protocol integration",
      "Ensuring end-to-end encryption security",
      "Managing decentralized network architecture",
    ],
    solutions: [
      "Used established Nostr protocol libraries",
      "Applied industry-standard encryption algorithms",
      "Implemented robust peer-to-peer networking",
    ],
    metrics: {
      usersReached: 1000,
      performanceImprovement: "40% conversation increase",
      costReduction: "60% infrastructure costs",
      efficiencyGain: "Enhanced security and privacy",
    },
    isFeatured: true,
    isPublic: true,
    liveUrl: "https://decentralized-messaging.com",
    githubUrl: "https://github.com/username/decentralized-messaging",
  },
];

const experiencesData = [
  {
    company: "Agaamin Technologies",
    position: "Software Engineer",
    duration: {
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-02-01"),
      isCurrent: false,
    },
    location: "Remote",
    workType: "Full-time",
    achievements: [
      "Architected scalable server-side infrastructure for mobile application using Agile methodologies, supporting new features and leading to a 30% improvement in user engagement.",
      "Integrated Nostr protocol for a decentralized real-time messaging system with end-to-end encryption, generating a 40% increase in daily active conversations and enhanced security protocols.",
      "Engineered a custom domain registration system by building APIs to connect university email accounts with free domain provisioning services, driving a 25% growth in platform adoption.",
      "Instrumented CI/CD pipelines with Cloud Build and Container Registry, shrinking release cycles 40% while ensuring zero-downtime rollouts.",
    ],
    technologies: [
      "Agile",
      "Nostr Protocol",
      "APIs",
      "CI/CD",
      "Cloud Build",
      "Container Registry",
    ],
    companyDescription:
      "Agaamin Technologies is a forward-thinking software company specializing in innovative mobile and web solutions.",
    impact: {
      userEngagement: "30% improvement",
      dailyConversations: "40% increase",
      platformAdoption: "25% growth",
      releaseCycles: "40% reduction",
    },
    highlights: [
      "Led infrastructure architecture decisions",
      "Implemented cutting-edge protocols",
      "Optimized deployment processes",
      "Enhanced security measures",
    ],
    responsibilities: [
      "Lead backend architecture and development",
      "Implement CI/CD pipelines",
      "Ensure system security and performance",
      "Mentor junior developers",
    ],
    teamSize: 8,
    projectBudget: 50000,
    isPublic: true,
    priority: 9,
    skills: [
      "Backend Development",
      "Cloud Architecture",
      "DevOps",
      "Security",
      "API Design",
    ],
  },
  {
    company: "Appfoster Technologies",
    position: "Software Engineer",
    duration: {
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-08-01"),
      isCurrent: false,
    },
    location: "Remote",
    workType: "Full-time",
    achievements: [
      "Delivered comprehensive Flutter-based HRMS platform managing payroll and leave tracking workflows for 200+ employees, improving operational efficiency by 35%.",
      "Optimized API performance by implementing caching mechanisms, pagination strategies, and asynchronous processing, reducing system response times by 30%.",
      "Containerized micro-services with Docker and orchestrated staging on GKE, cutting cloud costs 18%.",
      "Fortified application reliability by implementing automated testing frameworks and SonarQube static code analysis, decreasing post-deployment defects by 20%.",
    ],
    technologies: [
      "Flutter",
      "HRMS",
      "APIs",
      "Docker",
      "GKE",
      "SonarQube",
      "Testing",
    ],
    companyDescription:
      "Appfoster Technologies is a mobile app development company focused on creating enterprise solutions.",
    impact: {
      operationalEfficiency: "35% improvement",
      responseTime: "30% reduction",
      cloudCosts: "18% reduction",
      postDeploymentDefects: "20% reduction",
    },
    highlights: [
      "Built enterprise HRMS platform",
      "Implemented performance optimizations",
      "Reduced cloud infrastructure costs",
      "Enhanced code quality and testing",
    ],
    responsibilities: [
      "Develop mobile applications using Flutter",
      "Design and implement REST APIs",
      "Optimize application performance",
      "Implement testing strategies",
    ],
    teamSize: 12,
    projectBudget: 75000,
    isPublic: true,
    priority: 8,
    skills: [
      "Flutter",
      "Mobile Development",
      "API Development",
      "Performance Optimization",
      "Testing",
    ],
  },
  {
    company: "Benciti Technologies",
    position: "Software Developer",
    duration: {
      startDate: new Date("2022-05-01"),
      endDate: new Date("2022-08-01"),
      isCurrent: false,
    },
    location: "Remote",
    workType: "Internship",
    achievements: [
      "Developed a NudgeMath educational platform with real-time error detection, used by 2000+ students.",
      "Refactored the core math engine to validate logical steps and provide instant feedback, processing over 100,000 submitted solutions with categorized error tracking and accuracy analytics.",
      "Crafted interactive mobile learning solution utilizing adaptive guidance algorithms, reducing average time from 8 to 4 minutes and enhancing conceptual understanding methodology.",
    ],
    technologies: [
      "Educational Platform",
      "Real-time",
      "Analytics",
      "Mobile Learning",
      "Algorithms",
    ],
    companyDescription:
      "Benciti Technologies specializes in educational technology solutions for K-12 and higher education.",
    impact: {
      studentsReached: "2000+ students",
      solutionsProcessed: "100,000+ solutions",
      learningTimeReduction: "50% reduction (8 to 4 minutes)",
      accuracyTracking: "Comprehensive analytics",
    },
    highlights: [
      "Developed educational platform",
      "Implemented real-time error detection",
      "Created adaptive learning algorithms",
      "Processed large-scale student data",
    ],
    responsibilities: [
      "Develop educational software features",
      "Implement real-time processing algorithms",
      "Create user-friendly interfaces",
      "Analyze user data and feedback",
    ],
    teamSize: 5,
    projectBudget: 25000,
    isPublic: true,
    priority: 7,
    skills: [
      "Educational Technology",
      "Algorithm Development",
      "Data Analysis",
      "User Experience",
      "Real-time Systems",
    ],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await Contact.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});

    console.log("🧹 Cleared existing data");

    // Insert seed data
    const projects = await Project.insertMany(projectsData);
    const experiences = await Experience.insertMany(experiencesData);

    console.log(`✅ Seeded ${projects.length} projects`);
    console.log(`✅ Seeded ${experiences.length} experiences`);
    console.log("🎉 Database seeding completed successfully!");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, projectsData, experiencesData };
