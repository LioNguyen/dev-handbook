// Global component types for atomic design system

// Base component props that all components should extend
export interface BaseComponentProps {
  /**
   * CSS class name to apply to the component
   */
  className?: string
  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string
  /**
   * Unique identifier for the component
   */
  id?: string
}

// Atomic Design Component Types

// Atoms - Basic building blocks
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  error?: string
  onChange?: (value: string) => void
}

export interface CardProps extends BaseComponentProps {
  children: React.ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'sm' | 'md' | 'lg'
}

// Molecules - Simple combinations of atoms
export interface SearchInputProps extends BaseComponentProps {
  placeholder?: string
  value?: string
  onSearch?: (query: string) => void
  onClear?: () => void
  loading?: boolean
}

export interface UserAvatarProps extends BaseComponentProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showBadge?: boolean
  badgeColor?: 'green' | 'red' | 'yellow' | 'blue'
}

export interface FormFieldProps extends BaseComponentProps {
  label?: string
  error?: string
  required?: boolean
  helpText?: string
  children: React.ReactNode
}

// Organisms - Complex UI components
export interface NavigationBarProps extends BaseComponentProps {
  logo?: React.ReactNode
  menuItems?: NavigationItem[]
  user?: User
  onLogout?: () => void
  showNotifications?: boolean
  notificationCount?: number
}

export interface HeaderProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export interface SidebarProps extends BaseComponentProps {
  items?: SidebarItem[]
  collapsed?: boolean
  onToggle?: () => void
  user?: User
}

// Templates - Page-level layouts
export interface DashboardLayoutProps extends BaseComponentProps {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
  loading?: boolean
}

export interface AuthLayoutProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  showLogo?: boolean
}

export interface PublicLayoutProps extends BaseComponentProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

// Supporting types
export interface NavigationItem {
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
  children?: NavigationItem[]
  badge?: string | number
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface SidebarItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  active?: boolean
  children?: SidebarItem[]
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

// Page component types
export interface PageProps extends BaseComponentProps {
  title?: string
  description?: string
  children?: React.ReactNode
}

// Common layout types
export type LayoutVariant =
  | 'centered'
  | 'sidebar'
  | 'full-width'
  | 'two-column'
  | 'three-column'
export type ThemeMode = 'light' | 'dark' | 'system'
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ComponentVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'outline'
