import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, ContactFormData, Project, Experience } from "@/lib/api";

console.log("use-api.ts - Module loaded");
console.log("use-api.ts - apiClient imported:", apiClient);
console.log(
  "use-api.ts - apiClient.getFeaturedProjects:",
  apiClient?.getFeaturedProjects
);
console.log("use-api.ts - apiClient type:", typeof apiClient);
console.log(
  "use-api.ts - apiClient constructor:",
  apiClient?.constructor?.name
);

// Projects hooks
export const useProjects = () => {
  console.log("useProjects hook called");
  console.log("useProjects - apiClient:", apiClient);

  if (!apiClient) {
    console.error("❌ apiClient is undefined in useProjects!");
    throw new Error("API client is not initialized");
  }

  return useQuery({
    queryKey: ["projects"],
    queryFn: apiClient.getProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedProjects = () => {
  console.log("useFeaturedProjects hook called");
  console.log("useFeaturedProjects - apiClient:", apiClient);
  console.log(
    "useFeaturedProjects - apiClient.getFeaturedProjects:",
    apiClient?.getFeaturedProjects
  );
  console.log("useFeaturedProjects - apiClient type:", typeof apiClient);

  if (!apiClient) {
    console.error("❌ apiClient is undefined in useFeaturedProjects!");
    throw new Error("API client is not initialized");
  }

  if (typeof apiClient.getFeaturedProjects !== "function") {
    console.error(
      "❌ apiClient.getFeaturedProjects is not a function:",
      apiClient.getFeaturedProjects
    );
    throw new Error("API client method not found");
  }

  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: apiClient.getFeaturedProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => apiClient.getProject(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Experience hooks
export const useExperiences = () => {
  console.log("useExperiences hook called");
  console.log("useExperiences - apiClient:", apiClient);

  if (!apiClient) {
    console.error("❌ apiClient is undefined in useExperiences!");
    throw new Error("API client is not initialized");
  }

  return useQuery({
    queryKey: ["experiences"],
    queryFn: apiClient.getExperiences,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useExperience = (id: string) => {
  return useQuery({
    queryKey: ["experiences", id],
    queryFn: () => apiClient.getExperience(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Contact form hook
export const useContactForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ContactFormData) => apiClient.submitContactForm(data),
    onSuccess: () => {
      // Invalidate and refetch projects if needed
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

// Health check hook
export const useHealthCheck = () => {
  console.log("useHealthCheck hook called");
  console.log("useHealthCheck - apiClient:", apiClient);

  if (!apiClient) {
    console.error("❌ apiClient is undefined in useHealthCheck!");
    throw new Error("API client is not initialized");
  }

  return useQuery({
    queryKey: ["health"],
    queryFn: apiClient.healthCheck,
    refetchInterval: 30000, // Check every 30 seconds
    retry: 3,
  });
};
