import { useEffect, useState } from "react";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface ScreenSizeConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

// Default breakpoints (can be customized)
const defaultBreakpoints: ScreenSizeConfig = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Hook to detect current screen size based on window width
 * @param customBreakpoints Optional custom breakpoints configuration
 * @returns Current screen size and boolean flags for each breakpoint
 */
export function useScreenSize(customBreakpoints?: Partial<ScreenSizeConfig>) {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };

  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Initial measurement
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine current screen size
  const getCurrentSize = (): ScreenSize => {
    if (windowWidth >= breakpoints["2xl"]) return "2xl";
    if (windowWidth >= breakpoints.xl) return "xl";
    if (windowWidth >= breakpoints.lg) return "lg";
    if (windowWidth >= breakpoints.md) return "md";
    if (windowWidth >= breakpoints.sm) return "sm";
    return "xs";
  };

  const currentSize = getCurrentSize();

  // Boolean flags for each breakpoint
  const isXs = currentSize === "xs";
  const isSm = currentSize === "sm";
  const isMd = currentSize === "md";
  const isLg = currentSize === "lg";
  const isXl = currentSize === "xl";
  const is2Xl = currentSize === "2xl";

  // Shorthand combinators
  const isMobile = isXs || isSm;
  const isTablet = isMd;
  const isDesktop = isLg || isXl || is2Xl;

  return {
    width: windowWidth,
    currentSize,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isMobile,
    isTablet,
    isDesktop,
  };
}
