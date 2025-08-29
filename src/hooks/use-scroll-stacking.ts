import { useEffect, useRef, useState } from "react";

interface UseScrollStackingOptions {
  threshold?: number;
  slideOffset?: number;
}

export const useScrollStacking = (options: UseScrollStackingOptions = {}) => {
  const { threshold = 100, slideOffset = 50 } = options;

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const windowHeight = window.innerHeight;
      let newActiveIndex = 0;
      let maxVisibility = 0;

      // Find which experience should be active based on scroll position
      itemRefs.current.forEach((itemRef, index) => {
        if (!itemRef) return;

        const itemRect = itemRef.getBoundingClientRect();
        const itemTop = itemRect.top;
        const itemBottom = itemRect.bottom;

        // Calculate how much of the item is visible
        const visibleTop = Math.max(itemTop, 0);
        const visibleBottom = Math.min(itemBottom, windowHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // If this item is more visible than the current active one, make it active
        if (visibleHeight > maxVisibility) {
          maxVisibility = visibleHeight;
          newActiveIndex = index;
        }
      });

      setActiveIndex(newActiveIndex);
    };

    // Use a longer throttle to reduce conflicts with scroll navigation
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleScroll();
      }, 100); // Increased delay to reduce conflicts
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [threshold]);

  const registerItem = (index: number, ref: HTMLDivElement | null) => {
    itemRefs.current[index] = ref;
  };

  const getStackStyle = (index: number) => {
    if (index < activeIndex) {
      // Items before the active one are hidden below with enhanced effects
      return {
        transform: `translateY(${slideOffset * 2}px) scale(0.92) rotateX(5deg)`,
        opacity: 0.2,
        zIndex: 1,
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative" as const,
        pointerEvents: "none" as const,
        filter: "blur(1px)",
        transformOrigin: "center bottom",
      };
    }

    if (index === activeIndex) {
      // Active item is fully visible with enhanced focus
      return {
        transform: "translateY(0px) scale(1) rotateX(0deg)",
        opacity: 1,
        zIndex: 20,
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative" as const,
        pointerEvents: "auto" as const,
        filter: "blur(0px)",
        transformOrigin: "center center",
        boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15)",
      };
    }

    // Items after the active one are stacked above with perspective
    const stackIndex = index - activeIndex;
    const scaleFactor = Math.max(0.85, 1 - stackIndex * 0.08);
    const opacityFactor = Math.max(0.3, 1 - stackIndex * 0.15);

    return {
      transform: `translateY(-${
        slideOffset * stackIndex
      }px) scale(${scaleFactor}) rotateX(-${stackIndex * 2}deg)`,
      opacity: opacityFactor,
      zIndex: 20 - stackIndex,
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      transformOrigin: "center top",
      position: "relative" as const,
      pointerEvents: "none" as const,
      filter: `blur(${stackIndex * 0.5}px)`,
    };
  };

  return {
    containerRef,
    registerItem,
    getStackStyle,
    activeIndex,
  };
};
