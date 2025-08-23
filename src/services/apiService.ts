// API Service Layer - Handles all external API calls

import { ContactFormData, Project, Experience } from "@/models/PortfolioModels";

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

console.log("🔍 API Service: API_BASE_URL =", API_BASE_URL);
console.log(
  "🔍 API Service: VITE_API_URL env var =",
  import.meta.env.VITE_API_URL
);

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    console.log("🔍 API Request:", { url, options });

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log("🔍 Fetching URL:", url);
      const response = await fetch(url, config);
      console.log("🔍 Response status:", response.status);
      console.log("🔍 Response headers:", response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🔍 Response data:", data);
      return data;
    } catch (error) {
      console.error("🔍 API Error:", error);
      throw new Error(
        `API request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Contact Form
  async submitContactForm(data: ContactFormData): Promise<{ message: string }> {
    return this.request<{ message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    const response = await this.request<{ projects: Project[] }>("/projects");
    return response.projects || [];
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const response = await this.request<{ projects: Project[] }>(
      "/projects/featured"
    );
    return response.projects || [];
  }

  async getProject(id: string): Promise<Project> {
    const response = await this.request<{ project: Project }>(
      `/projects/${id}`
    );
    if (!response.project) {
      throw new Error("Project not found");
    }
    return response.project;
  }

  // Experience
  async getExperiences(): Promise<Experience[]> {
    const response = await this.request<{ experiences: Experience[] }>(
      "/experience"
    );
    return response.experiences || [];
  }

  async getExperience(id: string): Promise<Experience> {
    const response = await this.request<{ experience: Experience }>(
      `/experience/${id}`
    );
    if (!response.experience) {
      throw new Error("Experience not found");
    }
    return response.experience;
  }

  // Health Check
  async healthCheck(): Promise<{
    message: string;
    version: string;
    database: string;
  }> {
    return this.request<{ message: string; version: string; database: string }>(
      "/health"
    );
  }
}

// Export singleton instance
export const apiService = new ApiService();
