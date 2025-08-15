# Development Guide

This guide covers the development workflow for the React Boilerplate project.

## Quick Start

1. **Install dependencies**:
   \`\`\`bash
   bun install
   \`\`\`

2. **Start development server**:
   \`\`\`bash
   bun run dev
   \`\`\`

3. **Open your browser** to `http://localhost:3000`

## Project Structure

\`\`\`
src/
├── components/ # UI components (Atomic Design)
│ ├── ui/ # Atoms (Button, Input, etc.)
│ ├── molecules/ # Molecules (SearchInput, UserAvatar)
│ ├── organisms/ # Organisms (NavigationBar)
│ └── templates/ # Templates (Layout components)
├── domains/ # Domain-driven features
│ ├── auth/ # Authentication domain
│ ├── users/ # User management domain
│ └── dashboard/ # Dashboard domain
├── shared/ # Shared utilities
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions
│ ├── store/ # Zustand stores
│ ├── types/ # TypeScript types
│ └── api/ # API client setup
├── pages/ # Route components
└── assets/ # Static assets
\`\`\`

## Development Workflow

### 1. Feature Development

1. **Create a new branch**:
   \`\`\`bash
   git checkout -b feat/your-feature-name
   \`\`\`

2. **Start development server**:
   \`\`\`bash
   bun run dev
   \`\`\`

3. **Write your code** following the established patterns

4. **Add tests** for your components and functions

5. **Run tests** to ensure everything works:
   \`\`\`bash
   bun run test:run
   bun run test:e2e
   \`\`\`

### 2. Code Quality

The project enforces code quality through:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Husky** - Git hooks for automated checks

### 3. Testing

- **Unit Tests** - Vitest for component and function testing
- **E2E Tests** - Playwright for full application testing
- **Coverage** - Track test coverage with `bun run test:coverage`

### 4. Git Workflow

1. **Stage your changes**:
   \`\`\`bash
   git add .
   \`\`\`

2. **Commit with conventional format**:
   \`\`\`bash
   git commit -m "feat: add user authentication"
   \`\`\`

3. **Push to your branch**:
   \`\`\`bash
   git push origin feat/your-feature-name
   \`\`\`

4. **Create a Pull Request**

## Naming Conventions

### Components

- **PascalCase** for component names: `UserProfile`, `NavigationBar`
- **PascalCase** for component files: `UserProfile.tsx`

### Functions and Variables

- **camelCase** for functions: `getUserData`, `handleSubmit`
- **camelCase** for variables: `userData`, `isLoading`

### Files and Directories

- **camelCase** for utility files: `apiClient.ts`, `formatDate.ts`
- **kebab-case** for non-component files: `user-types.ts`

### Constants

- **UPPER_SNAKE_CASE** for constants: `API_BASE_URL`, `DEFAULT_TIMEOUT`

## Atomic Design System

The project follows Atomic Design principles:

### Atoms

Basic building blocks (Button, Input, Typography)
\`\`\`tsx
// src/components/ui/Button.tsx
export function Button({ children, ...props }) {
return <button {...props}>{children}</button>
}
\`\`\`

### Molecules

Simple combinations of atoms (SearchInput, UserAvatar)
\`\`\`tsx
// src/components/molecules/SearchInput.tsx
import { Input } from '@/components/ui/Input'
import { Search } from 'lucide-react'

export function SearchInput({ onSearch }) {
return (

<div className="relative">
<Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
<Input placeholder="Search..." className="pl-10" />
</div>
)
}
\`\`\`

### Organisms

Complex UI components (NavigationBar, UserList)
\`\`\`tsx
// src/components/organisms/NavigationBar.tsx
import { SearchInput } from '@/components/molecules/SearchInput'
import { UserAvatar } from '@/components/molecules/UserAvatar'

export function NavigationBar() {
return (

<nav>
<SearchInput />
<UserAvatar />
</nav>
)
}
\`\`\`

### Templates

Page-level layouts (DashboardLayout, AuthLayout)
\`\`\`tsx
// src/components/templates/DashboardLayout.tsx
import { NavigationBar } from '@/components/organisms/NavigationBar'

export function DashboardLayout({ children }) {
return (

<div>
<NavigationBar />
<main>{children}</main>
</div>
)
}
\`\`\`

## State Management

### Zustand Stores

- **Auth Store** - User authentication state
- **Theme Store** - UI theme preferences
- **UI Store** - Global UI state

### TanStack Query

- **Server State** - API data caching and synchronization
- **Mutations** - API calls for data modification

## API Integration

### API Client Setup

\`\`\`typescript
// src/shared/lib/apiClient.ts
import axios from 'axios'

export const apiClient = axios.create({
baseURL: process.env.VITE_API_BASE_URL,
timeout: 10000,
})
\`\`\`

### Using TanStack Query

\`\`\`typescript
// src/domains/users/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/users'

export function useUsers() {
return useQuery({
queryKey: ['users'],
queryFn: getUsers,
})
}
\`\`\`

## Environment Variables

Create a \`.env.local\` file for local development:

\`\`\`env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=React Boilerplate
\`\`\`

## Troubleshooting

### Common Issues

1. **Port already in use**:
   \`\`\`bash

   # Kill process using port 3000

   lsof -ti:3000 | xargs kill -9
   \`\`\`

2. **Module not found errors**:
   \`\`\`bash

   # Clear cache and reinstall

   bun run clean:all
   \`\`\`

3. **Type errors**:
   \`\`\`bash

   # Check TypeScript configuration

   bun run type-check
   \`\`\`

4. **Test failures**:
   \`\`\`bash
   # Run tests with UI for debugging
   bun run test:ui
   \`\`\`

### Getting Help

- Check the [Development Scripts](./development-scripts.md) guide
- Review existing components for patterns
- Run tests to understand expected behavior
- Check the GitHub Issues for similar problems
