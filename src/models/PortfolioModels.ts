// Portfolio Data Models and Interfaces

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  duration: {
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
  };
  location: string;
  achievements: string[];
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  duration: {
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
  };
  location: string;
  description: string;
  achievements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "devops" | "database" | "mobile";
  proficiency: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    profileImage: string;
  };
  skills: Skill[];
  socialLinks: SocialLink[];
}
