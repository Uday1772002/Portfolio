import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useScrollNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const isScrollingRef = useRef(false);

  // Get all sections
  useEffect(() => {
    sectionsRef.current = {
      about: document.getElementById("about"),
      experience: document.getElementById("experience"),
      projects: document.getElementById("projects"),
      contact: document.getElementById("contact"),
    };
  }, []);

  // Handle scroll and update URL
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + 100; // Offset for better detection
      let currentSection = "";

      // Find which section is currently in view
      Object.entries(sectionsRef.current).forEach(([sectionId, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = sectionId;
          }
        }
      });

      // Update URL if section changed
      if (currentSection && location.hash !== `#${currentSection}`) {
        isScrollingRef.current = true;
        navigate(`#${currentSection}`, { replace: true });

        // Reset flag after a short delay
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 100);
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [navigate, location.hash]);

  // Handle programmatic scrolling (when clicking header links)
  const scrollToSection = (sectionId: string) => {
    console.log("🎯 scrollToSection called with:", sectionId);
    const element = sectionsRef.current[sectionId];
    console.log("🎯 Found element:", element);

    if (element) {
      console.log("🎯 Scrolling to element:", element);
      isScrollingRef.current = true;
      element.scrollIntoView({ behavior: "smooth" });

      // Update URL immediately for header clicks
      navigate(`#${sectionId}`, { replace: true });

      // Reset flag after scroll animation
      setTimeout(() => {
        isScrollingRef.current = false;
        console.log("🎯 Scroll animation completed");
      }, 1000);
    } else {
      console.error("❌ Element not found for section:", sectionId);
      console.log("🎯 Available sections:", sectionsRef.current);
    }
  };

  return { scrollToSection };
};
