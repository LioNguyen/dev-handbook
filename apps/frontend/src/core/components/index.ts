// Component Barrel Exports
// Central export point for all components following atomic design principles

// Atomic Design Exports
export * from './atoms' // Atoms: Basic building blocks
export * from './molecules' // Molecules: Simple combinations of atoms
export * from './organisms' // Organisms: Complex UI components
export * from './templates' // Templates: Page-level layouts

// Re-export commonly used components for convenience
export { Button, Input, Card } from './atoms'
export { SearchInput, UserAvatar } from './molecules'
export { NavigationBar } from './organisms'
export { DashboardLayout, AuthLayout } from './templates'
