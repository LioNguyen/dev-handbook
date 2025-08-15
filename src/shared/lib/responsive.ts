// Responsive Design Utilities and Patterns

/**
 * Common responsive design patterns and utilities
 */

// Responsive breakpoints
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1600px',
} as const

// Container sizes
export const containerSizes = {
  sm: 'max-w-screen-sm', // 640px
  md: 'max-w-screen-md', // 768px
  lg: 'max-w-screen-lg', // 1024px
  xl: 'max-w-screen-xl', // 1280px
  '2xl': 'max-w-screen-2xl', // 1536px
  full: 'max-w-full',
} as const

// Grid responsive patterns
export const gridPatterns = {
  // Auto-fit grids
  autoFit: {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
  },
  // Card grids
  cards: {
    sm: 'grid-cols-1 sm:grid-cols-2',
    md: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    lg: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  },
  // Dashboard grids
  dashboard: {
    sidebar: 'grid-cols-1 lg:grid-cols-[280px_1fr]',
    twoColumn: 'grid-cols-1 lg:grid-cols-2',
    threeColumn: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  },
} as const

// Flexbox responsive patterns
export const flexPatterns = {
  // Navigation patterns
  nav: {
    mobile: 'flex-col space-y-2',
    desktop: 'flex-row space-x-4 space-y-0',
    responsive: 'flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0',
  },
  // Content patterns
  content: {
    stack: 'flex-col space-y-4',
    inline: 'flex-row space-x-4',
    responsive: 'flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0',
  },
  // Layout patterns
  layout: {
    center: 'justify-center items-center',
    spaceBetween: 'justify-between items-center',
    start: 'justify-start items-center',
    end: 'justify-end items-center',
  },
} as const

// Typography responsive patterns
export const typographyPatterns = {
  heading: {
    h1: 'text-2xl font-bold md:text-3xl lg:text-4xl',
    h2: 'text-xl font-bold md:text-2xl lg:text-3xl',
    h3: 'text-lg font-semibold md:text-xl lg:text-2xl',
    h4: 'text-base font-semibold md:text-lg lg:text-xl',
    h5: 'text-sm font-semibold md:text-base lg:text-lg',
    h6: 'text-xs font-semibold md:text-sm lg:text-base',
  },
  body: {
    lead: 'text-lg md:text-xl lg:text-2xl',
    large: 'text-base md:text-lg',
    default: 'text-sm md:text-base',
    small: 'text-xs md:text-sm',
    muted: 'text-xs text-muted-foreground md:text-sm',
  },
} as const

// Spacing responsive patterns
export const spacingPatterns = {
  padding: {
    xs: 'p-2 md:p-3',
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
    xl: 'p-8 md:p-12',
  },
  margin: {
    xs: 'm-2 md:m-3',
    sm: 'm-3 md:m-4',
    md: 'm-4 md:m-6',
    lg: 'm-6 md:m-8',
    xl: 'm-8 md:m-12',
  },
  gap: {
    xs: 'gap-2 md:gap-3',
    sm: 'gap-3 md:gap-4',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8',
    xl: 'gap-8 md:gap-12',
  },
} as const

// Common responsive component patterns
export const componentPatterns = {
  // Card patterns
  card: {
    base: 'rounded-lg border bg-card text-card-foreground shadow-sm',
    responsive: 'p-4 md:p-6',
    hover: 'transition-shadow hover:shadow-md',
  },
  // Button patterns
  button: {
    responsive: 'px-3 py-2 text-sm md:px-4 md:py-2 md:text-base',
    fullMobile: 'w-full sm:w-auto',
  },
  // Input patterns
  input: {
    responsive: 'text-sm md:text-base',
    fullMobile: 'w-full',
  },
  // Modal patterns
  modal: {
    responsive: 'w-full max-w-lg mx-4 md:mx-auto',
    fullMobile: 'h-full md:h-auto',
  },
} as const

// Utility functions for responsive design
export const responsive = {
  // Check if screen size matches breakpoint
  isBreakpoint: (breakpoint: keyof typeof breakpoints) => {
    if (typeof window === 'undefined') return false
    const query = window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`)
    return query.matches
  },

  // Get current breakpoint
  getCurrentBreakpoint: (): keyof typeof breakpoints => {
    if (typeof window === 'undefined') return 'sm'

    const width = window.innerWidth
    if (width >= parseInt(breakpoints['3xl'])) return '3xl'
    if (width >= parseInt(breakpoints['2xl'])) return '2xl'
    if (width >= parseInt(breakpoints.xl)) return 'xl'
    if (width >= parseInt(breakpoints.lg)) return 'lg'
    if (width >= parseInt(breakpoints.md)) return 'md'
    if (width >= parseInt(breakpoints.sm)) return 'sm'
    return 'xs'
  },

  // Create responsive class string
  createClasses: (...classes: (string | undefined | false)[]): string => {
    return classes.filter(Boolean).join(' ')
  },
}

// Common responsive hooks patterns - moved to hooks/useResponsive.ts
// This was causing export conflicts, so removing from here

// Export commonly used patterns
export const commonPatterns = {
  // Page layouts
  pageContainer: 'container mx-auto px-4 sm:px-6 lg:px-8',
  sectionSpacing: 'py-8 md:py-12 lg:py-16',

  // Navigation
  navContainer: 'px-4 sm:px-6 lg:px-8',
  navHeight: 'h-16',

  // Content areas
  contentArea: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  sidebarLayout: 'grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8',

  // Forms
  formContainer: 'max-w-md mx-auto',
  formSpacing: 'space-y-4 md:space-y-6',

  // Cards and components
  cardGrid: gridPatterns.cards.md,
  cardSpacing: spacingPatterns.gap.md,
}
