import * as React from 'react'
import { useTheme } from '@/shared/hooks/useTheme'

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: 'light' | 'dark' | 'system'
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const { setTheme } = useTheme()

  React.useEffect(() => {
    // Set default theme on mount if no theme is stored
    const storedTheme = localStorage.getItem('theme-preference')
    if (!storedTheme) {
      setTheme(defaultTheme)
    }
  }, [defaultTheme, setTheme])

  return <>{children}</>
}

// Theme toggle button component
export interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'ghost' | 'default'
}

export function ThemeToggle({
  className = '',
  size = 'md',
  variant = 'outline',
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      )
    }

    if (resolvedTheme === 'dark') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41-1.41" />
        <path d="m19.07 4.93-1.41-1.41" />
      </svg>
    )
  }

  const getTitle = () => {
    if (theme === 'system') return 'System theme'
    if (theme === 'dark') return 'Dark theme'
    return 'Light theme'
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        variant === 'outline'
          ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
          : variant === 'ghost'
            ? 'hover:bg-accent hover:text-accent-foreground'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
      } ${
        size === 'sm'
          ? 'h-9 rounded-md px-3'
          : size === 'lg'
            ? 'h-11 rounded-md px-8'
            : 'h-10 px-4 py-2'
      } ${className}`}
      onClick={handleThemeChange}
      title={getTitle()}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
