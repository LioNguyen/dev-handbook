````markdown
# Technical Architecture Documentation

## ⚠️ CRITICAL: Modern React Application Architecture

**THIS REPOSITORY CONTAINS A MODERN REACT APPLICATION WITH CONTEMPORARY TOOLING. Backend services are external dependencies.**

### Architecture Scope:

- **React Application**: Single-page application built with React 19 and TypeScript
- **Build System**: Vite bundler with modern development experience
- **Package Management**: Bun for fast package management and script execution
- **Testing Stack**: Vitest for unit testing, Playwright for end-to-end testing
- **State Management**: Zustand for application state, React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui components for design system

### Styling Standards:

**ALWAYS use Tailwind CSS with shadcn/ui for consistent styling across the application:**

- **Primary Approach**: Tailwind CSS utility-first methodology for component styling
- **Component Library**: shadcn/ui for pre-built, accessible component primitives
- **Design System**: Consistent design tokens through Tailwind configuration
- **Customization**: Extend Tailwind config for project-specific design requirements
- **Performance**: Optimized CSS bundle through utility purging

**shadcn/ui Integration Guidelines:**

- Use shadcn/ui components as foundation for custom component development
- Customize shadcn/ui components through Tailwind utility classes
- Maintain design consistency through centralized component variants
- Follow shadcn/ui naming conventions and component structure
- Leverage Radix UI primitives for accessibility and behavior

### Version Compatibility Verification:

**ALWAYS check package.json for current versions and fetch online documentation:**

- **Current Tailwind Version**: Check `package.json` for `tailwindcss` version (currently v4.1.12)
- **Current Radix Version**: Verify `@radix-ui/*` package versions for compatibility
- **Documentation Fetching**: Reference official docs matching exact version numbers
- **API Compatibility**: Ensure code examples match current version capabilities
- **Migration Guides**: Follow official migration guides for version updates

**Version Check Process:**

1. Run `grep -E "(tailwindcss|@radix-ui)" package.json` to identify current versions
2. Visit official documentation for exact version matches
3. Verify API compatibility for all used features
4. Check for deprecated features in current versions
5. Update implementation to match current version best practices

### External Dependencies (Not in This Repository):

- Backend APIs and microservices
- Database systems and data storage
- Authentication servers and identity providers
- Backend infrastructure and DevOps systems
- Server-side business logic and processing

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture Principles](#2-architecture-principles)
3. [System Architecture](#3-system-architecture)
4. [Application Layer](#4-application-layer)
5. [Component Architecture](#5-component-architecture)
6. [Development Infrastructure](#6-development-infrastructure)
7. [Build and Deployment](#7-build-and-deployment)
8. [Testing Strategy](#8-testing-strategy)
9. [Development Guidelines](#9-development-guidelines)

## 1. Overview

### 1.1 Project Description

React Boilerplate is a modern React application built with contemporary tools and best practices. The system follows domain-driven design principles with atomic design methodology for component organization, providing a scalable foundation for building complex user interfaces.

### 1.2 Technology Stack

- **Framework**: React 19 with TypeScript (Latest React features)
- **Build Tool**: Vite for fast development and optimized builds
- **Package Manager**: Bun (ultra-fast JavaScript runtime and package manager)
- **Styling**: Tailwind CSS with utility-first approach
- **State Management**: Zustand for client state, React Query for server state
- **Testing**: Vitest for unit testing, Playwright for E2E testing
- **Code Quality**: ESLint, Prettier, Husky for git hooks
- **API Integration**: Axios for HTTP client with React Query integration

## 2. Architecture Principles

### 2.1 Modern React Principles

- **Functional Components**: Use function components with hooks exclusively
- **Composition over Inheritance**: Favor component composition patterns
- **Declarative Programming**: Write declarative, predictable React code
- **Performance by Default**: Implement performance optimizations from the start

### 2.2 Code Organization Principles

- **Domain-Driven Design**: Code organized by business domains
- **Atomic Design**: UI components follow atomic design methodology
- **Single Responsibility**: Each module has a single, well-defined purpose
- **Dependency Inversion**: High-level modules don't depend on low-level modules

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Boilerplate                       │
├─────────────────────────────────────────────────────────────┤
│                     Single React App                       │
│                     (Port 3000)                            │
├─────────────────────────────────────────────────────────────┤
│                    Component Layers                        │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │   Atoms     │  Molecules  │  Organisms  │  Templates  │  │
│  ├─────────────┼─────────────┼─────────────┼─────────────┤  │
│  │   Domains   │   Shared    │    Core     │    Pages    │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Application Communication

- **Component Props**: Data flow through component hierarchy
- **React Context**: Shared state for component trees
- **Zustand Stores**: Global state management for complex state
- **React Query**: Server state management and caching

## 4. Application Layer

### 4.1 Application Structure

The application follows a domain-driven structure:

```
src/
├── components/
│   ├── atoms/             # Basic UI building blocks
│   ├── molecules/         # Composite components
│   ├── organisms/         # Complex UI sections
│   └── templates/         # Page layout components
├── domains/               # Business domain modules
│   ├── auth/              # Authentication domain
│   ├── dashboard/         # Dashboard domain
│   └── users/             # User management domain
├── pages/                 # Page components
├── core/                  # Core application logic
│   ├── api/               # API layer and React Query setup
│   ├── config/            # Application configuration
│   ├── hooks/             # Shared custom hooks
│   ├── i18n/              # Internationalization
│   └── routing/           # Route configuration
└── shared/                # Shared utilities and resources
    ├── components/        # Shared UI components
    ├── hooks/             # Shared custom hooks
    ├── lib/               # Utility functions
    ├── store/             # Global state stores
    ├── types/             # TypeScript type definitions
    └── utils/             # Helper functions
```

### 4.2 Component Standards

#### 4.2.1 React Component Standards

- **Use React.FC<> with memo**: All functional components must use React.FC<> type annotation and be wrapped with memo from React
- **Props Interface**: Define props interface above component with alphabetical ordering
- **Memo Usage**: Use memo for performance optimization, especially for components with object props

```typescript
// Standard component with simple props
import { memo } from 'react';
import type { FC } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = memo(({
  children,
  disabled = false,
  onClick,
  variant = 'primary'
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

// Complex props with objects - use memo with custom comparison
import { memo } from 'react';
import { isEqual } from 'lodash';
import type { FC } from 'react';

interface UserCardProps {
  onUpdate: (user: User) => void;
  user: User;
}

export const UserCard: FC<UserCardProps> = memo(({
  onUpdate,
  user
}) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onUpdate(user)}>Update</button>
    </div>
  );
}, isEqual);
```

#### 4.2.2 Import Organization Standards

- **Library imports first**: External libraries and React imports
- **Custom imports second**: Internal modules and components
- **Alphabetical ordering**: Within each group, maintain alphabetical order
- **Alias imports**: Use @/ for internal module imports

```typescript
// ✅ Correct import organization
import { memo, useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'

import { Button } from '@/components/atoms'
import { UserService } from '@/core/api/UserService'
import { useAuthStore } from '@/shared/store/auth'
import type { User } from '@/shared/types/User'
```

#### 4.2.3 Technology Preferences

- **State Management**: Use Zustand for new global state management
- **Server State**: Use React Query (TanStack Query) for all server state
- **Styling**: Use Tailwind CSS utility classes for styling
- **Components**: Build components following atomic design principles

```typescript
// State management with Zustand
import { create } from 'zustand'

interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

// Server state with React Query
import { useQuery } from '@tanstack/react-query'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  })
}
```

### 4.3 Route Structure

```typescript
// Route configuration pattern
export const appRoutes = {
  home: '/',
  dashboard: '/dashboard',
  users: '/users',
  userDetail: '/users/:id',
  login: '/login',
  profile: '/profile'
} as const;

// Route component organization
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={appRoutes.home} element={<HomePage />} />
      <Route path={appRoutes.dashboard} element={<DashboardPage />} />
      <Route path={appRoutes.users} element={<UsersPage />} />
      <Route path={appRoutes.userDetail} element={<UserDetailPage />} />
      <Route path={appRoutes.login} element={<LoginPage />} />
      <Route path={appRoutes.profile} element={<ProfilePage />} />
    </Routes>
  );
};
```

### 4.4 State Management Patterns

#### 4.4.1 Zustand Store Template

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserState {
  users: User[]
  selectedUser: User | null
  loading: boolean
  error: string | null
}

interface UserActions {
  setUsers: (users: User[]) => void
  selectUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    (set) => ({
      // State
      users: [],
      selectedUser: null,
      loading: false,
      error: null,

      // Actions
      setUsers: (users) => set({ users }),
      selectUser: (selectedUser) => set({ selectedUser }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    { name: 'user-store' }
  )
)
```

#### 4.4.2 React Query Integration

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/core/api/userService'

// Query hook
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Mutation hook
export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### 4.5 API Structure

```typescript
// Base API Service
export class BaseApiService {
  protected baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }
}

// Domain-specific service
export class UserService extends BaseApiService {
  async getUsers(): Promise<User[]> {
    const response = await this.request<User[]>('/users')
    return response.data
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    return response.data
  }
}

export const userService = new UserService(process.env.VITE_API_URL!)
```

## 5. Component Architecture

### 5.1 Atomic Design Structure

- **Atoms**: Basic building blocks (Button, Input, Typography)
- **Molecules**: Simple combinations (SearchInput, FormField)
- **Organisms**: Complex UI sections (NavigationBar, UserCard)
- **Templates**: Page layouts (AuthLayout, DashboardLayout)

### 5.2 Component Organization

```
src/components/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── index.ts
├── molecules/
│   ├── SearchInput/
│   │   ├── SearchInput.tsx
│   │   ├── SearchInput.test.tsx
│   │   └── index.ts
│   └── index.ts
├── organisms/
│   ├── NavigationBar/
│   │   ├── NavigationBar.tsx
│   │   ├── NavigationBar.test.tsx
│   │   └── index.ts
│   └── index.ts
└── templates/
    ├── DashboardLayout/
    │   ├── DashboardLayout.tsx
    │   ├── DashboardLayout.test.tsx
    │   └── index.ts
    └── index.ts
```

### 5.3 Component Documentation Standards

Each component should include:

- **Props interface** with JSDoc comments
- **Usage examples** in component file
- **Test coverage** for all props and interactions
- **Storybook stories** for visual documentation

## 6. Development Infrastructure

### 6.1 Vite Configuration

- **Fast Development**: Vite provides extremely fast HMR and development server
- **Modern Build**: Optimized production builds with tree shaking and code splitting
- **TypeScript Support**: First-class TypeScript support with type checking

### 6.2 Build Configuration

- **Vite**: Fast development server and optimized production builds
- **TypeScript**: Strict type checking across the application
- **Bundle Optimization**: Code splitting and tree shaking for optimal performance

## 7. Build and Deployment

### 7.1 Build Process

- **Development**: `bun dev` for local development with hot reload
- **Production**: `bun build` for optimized production builds
- **Testing**: `bun test` for running test suites
- **Type Checking**: `bun type-check` for TypeScript validation

### 7.2 Bun Scripts

```json
{
  "scripts": {
    "dev": "npx vite",
    "build": "npx tsc -b && npx vite build",
    "preview": "npx vite preview",
    "lint": "npx eslint .",
    "test": "npx vitest",
    "test:e2e": "npx playwright test",
    "type-check": "npx tsc --noEmit"
  }
}
```

## 8. Testing Strategy

### 8.1 Unit Testing

- **Framework**: Vitest with React Testing Library
- **Coverage**: Minimum 80% code coverage requirement
- **Mocking**: Mock Service Worker (MSW) for API mocking

### 8.2 End-to-End Testing

- **Framework**: Playwright for cross-browser testing
- **Test Organization**: Page Object Model pattern
- **CI Integration**: Automated testing in deployment pipeline

### 8.3 Testing Best Practices

```typescript
// Component testing example
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should call onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Click me</Button>);

    await user.click(screen.getByRole('button', { name: /click me/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

## 9. Development Guidelines

### 9.1 Architecture Guidelines

- **Domain Organization**: Domain-driven module structure
- **Component Architecture**: Atomic design principles with React.FC and memo
- **Import Standards**: Library imports first, alphabetical ordering, alias usage

### 9.2 Performance Guidelines

- **Optimization Strategies**: Code splitting, lazy loading, memoization
- **Memory Management**: Proper cleanup of subscriptions and event listeners
- **Bundle Analysis**: Regular monitoring of bundle sizes with Vite build analyzer

### 9.3 Documentation Standards

- **Code Documentation**: Comprehensive inline comments for complex logic
- **Component Documentation**: Props interfaces with JSDoc comments
- **API Documentation**: Clear documentation for all service endpoints

This document serves as the comprehensive guide for developing within the React Boilerplate workspace, ensuring consistency, maintainability, and scalability across the application.
````
