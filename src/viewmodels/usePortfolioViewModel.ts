// Portfolio ViewModel - Business Logic and State Management

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { ContactFormData, Project, Experience } from "@/models/PortfolioModels";

export const usePortfolioViewModel = () => {
  const queryClient = useQueryClient();
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: boolean;
  }>({});

  // Projects
  const useProjects = () => {
    console.log("🔍 ViewModel: useProjects hook called");
    return useQuery({
      queryKey: ["projects"],
      queryFn: async () => {
        console.log("🔍 ViewModel: Fetching all projects...");
        const result = await apiService.getProjects();
        console.log("🔍 ViewModel: Projects result:", result);
        return result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useFeaturedProjects = () => {
    console.log("🔍 ViewModel: useFeaturedProjects hook called");
    return useQuery({
      queryKey: ["featured-projects"],
      queryFn: async () => {
        console.log("🔍 ViewModel: Fetching featured projects...");
        const result = await apiService.getFeaturedProjects();
        console.log("🔍 ViewModel: Featured projects result:", result);
        return result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useProject = (id: string) => {
    return useQuery({
      queryKey: ["project", id],
      queryFn: () => apiService.getProject(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Experience
  const useExperiences = () => {
    console.log("🔍 ViewModel: useExperiences hook called");
    return useQuery({
      queryKey: ["experiences"],
      queryFn: async () => {
        console.log("🔍 ViewModel: Fetching experiences...");
        const result = await apiService.getExperiences();
        console.log("🔍 ViewModel: Experiences result:", result);
        return result;
      },
      staleTime: 5 * 1000, // 5 minutes
    });
  };

  const useExperience = (id: string) => {
    return useQuery({
      queryKey: ["experience", id],
      queryFn: () => apiService.getExperience(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Contact Form
  const useContactForm = () => {
    return useMutation({
      mutationFn: (data: ContactFormData) => apiService.submitContactForm(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contact"] });
      },
    });
  };

  // Health Check
  const useHealthCheck = () => {
    return useQuery({
      queryKey: ["health"],
      queryFn: apiService.healthCheck,
      staleTime: 30 * 1000, // 30 seconds
      refetchInterval: 60 * 1000, // 1 minute
    });
  };

  // Card Expansion Logic
  const toggleCardExpansion = useCallback((cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  }, []);

  const isCardExpanded = useCallback(
    (cardId: string) => {
      return expandedCards[cardId] || false;
    },
    [expandedCards]
  );

  // Utility Functions
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }, []);

  const truncateText = useCallback((text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }, []);

  return {
    // Queries
    useProjects,
    useFeaturedProjects,
    useProject,
    useExperiences,
    useExperience,
    useHealthCheck,

    // Mutations
    useContactForm,

    // State Management
    toggleCardExpansion,
    isCardExpanded,

    // Utilities
    formatDate,
    truncateText,
  };
};
