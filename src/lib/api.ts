const API_BASE_URL = "http://localhost:5001/api";

console.log("API_BASE_URL:", API_BASE_URL);

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
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  technologies: string[];
  featured: boolean;
  likes: number;
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

interface ApiResponse<T> {
  success: boolean;
  count?: number;
  projects?: T[];
  experiences?: T[];
  project?: T;
  experience?: T;
}

class ApiClient {
  constructor() {
    console.log("ApiClient constructor called");
    console.log("API_BASE_URL in constructor:", API_BASE_URL);

    // Bind all methods to preserve 'this' context
    this.submitContactForm = this.submitContactForm.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.getFeaturedProjects = this.getFeaturedProjects.bind(this);
    this.getProject = this.getProject.bind(this);
    this.getExperiences = this.getExperiences.bind(this);
    this.getExperience = this.getExperience.bind(this);
    this.healthCheck = this.healthCheck.bind(this);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("Making request to:", url);

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      // Check if it's a connection error
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          "Backend server is not running. Please start the backend server."
        );
      }
      throw error;
    }
  }

  // Contact API
  async submitContactForm(data: ContactFormData): Promise<{ message: string }> {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Projects API
  async getProjects(): Promise<Project[]> {
    const response = await this.request<ApiResponse<Project>>("/projects");
    return response.projects || [];
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const response = await this.request<ApiResponse<Project>>(
      "/projects/featured"
    );
    return response.projects || [];
  }

  async getProject(id: string): Promise<Project> {
    const response = await this.request<ApiResponse<Project>>(
      `/projects/${id}`
    );
    if (!response.project) {
      throw new Error("Project not found");
    }
    return response.project;
  }

  // Experience API
  async getExperiences(): Promise<Experience[]> {
    const response = await this.request<ApiResponse<Experience>>("/experience");
    return response.experiences || [];
  }

  async getExperience(id: string): Promise<Experience> {
    const response = await this.request<ApiResponse<Experience>>(
      `/experience/${id}`
    );
    if (!response.experience) {
      throw new Error("Experience not found");
    }
    return response.experience;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request("/health");
  }
}

// Create apiClient instance when needed
let _apiClient: ApiClient | null = null;

export const getApiClient = (): ApiClient => {
  if (!_apiClient) {
    console.log("Creating apiClient instance...");
    _apiClient = new ApiClient();
    console.log("apiClient instance created:", _apiClient);
    console.log(
      "apiClient.getFeaturedProjects:",
      _apiClient.getFeaturedProjects
    );
  }
  return _apiClient;
};

// Export for backward compatibility
export const apiClient = getApiClient();
