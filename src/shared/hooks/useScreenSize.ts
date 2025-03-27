import { useCallback, useEffect, useState } from "react";

import { SCREEN_BREAKPOINTS } from "@/shared/constants";

interface IScreenSize {
  width: number;
  height: number;
  isMobile: boolean; // < 768px
  isTablet: boolean; // >= 768px && <= 1024px
  isDesktop: boolean; // > 1024px
  isLargeDesktop: boolean; // >= 1280px
}

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<IScreenSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  });

  const calculateScreenSize = useCallback((width: number, height: number): IScreenSize => {
    return {
      width,
      height,
      isMobile: width < SCREEN_BREAKPOINTS.MOBILE,
      isTablet: width >= SCREEN_BREAKPOINTS.MOBILE && width < SCREEN_BREAKPOINTS.TABLET,
      isDesktop: width >= SCREEN_BREAKPOINTS.TABLET && width < SCREEN_BREAKPOINTS.DESKTOP,
      isLargeDesktop: width >= SCREEN_BREAKPOINTS.DESKTOP,
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Init screen size
    setScreenSize(calculateScreenSize(window.innerWidth, window.innerHeight));

    let timeoutId: NodeJS.Timeout;

    // Handle resize with debounce
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenSize(calculateScreenSize(window.innerWidth, window.innerHeight));
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [calculateScreenSize]);

  return screenSize;
};

export { useScreenSize };
