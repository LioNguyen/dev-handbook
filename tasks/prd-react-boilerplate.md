# PRD: React Boilerplate with Atomic Design System

## 1. Introduction/Overview

This React boilerplate provides a comprehensive, production-ready starter template for senior developers who need a standardized foundation for building modern web applications. The boilerplate implements atomic design principles with a complete component library, CRUD operation examples, and best practices for scalable React applications.

The boilerplate serves as a foundation that can be quickly adapted for various project types while maintaining consistent code quality, architecture patterns, and development workflows.

## 2. Goals

1. **Accelerate Development**: Reduce project setup time from days to hours
2. **Standardize Architecture**: Provide consistent patterns for component organization, state management, and API integration
3. **Demonstrate Best Practices**: Showcase modern React patterns with TypeScript, proper testing, and performance optimizations
4. **Ensure Scalability**: Implement atomic design and domain-driven architecture for maintainable codebases
5. **Maximize Developer Experience**: Include comprehensive tooling, linting, and debugging capabilities

## 3. User Stories

**As a senior React developer, I want to:**

- Clone a boilerplate and have a fully configured development environment ready in minutes
- See examples of atomic design components that I can extend for my specific needs
- Access pre-built CRUD operations that demonstrate proper data fetching, caching, and error handling
- Use a complete design system with consistent styling and accessibility features
- Have confidence that the codebase follows industry best practices for testing, performance, and maintainability

**As a development team lead, I want to:**

- Ensure all team members start with the same architectural patterns and coding standards
- Have consistent folder structure and naming conventions across all projects
- Reduce onboarding time for new developers joining the team

**As a project stakeholder, I want to:**

- See rapid prototyping capabilities that allow quick feature demonstrations
- Have confidence in code quality through comprehensive testing and type safety

## 4. Functional Requirements

1. **Component Library**: Must provide atomic design components (atoms, molecules, organisms) using ShadcnUI
2. **CRUD Operations**: Must include complete Create, Read, Update, Delete examples with proper state management
3. **Authentication Flow**: Must demonstrate login, registration, and protected routes
4. **Data Management**: Must showcase Zustand for client state and React Query for server state
5. **Form Handling**: Must include complex form examples with React Hook Form and Zod validation
6. **Responsive Design**: Must work seamlessly across all device sizes using Tailwind CSS breakpoints
7. **Error Handling**: Must provide comprehensive error boundaries and user-friendly error messages
8. **Loading States**: Must implement skeleton screens and loading indicators for all async operations
9. **Accessibility**: Must meet WCAG 2.1 AA standards with proper ARIA attributes
10. **Performance**: Must implement code splitting, lazy loading, and bundle optimization
11. **Testing**: Must include unit, integration, and E2E test examples
12. **Development Tools**: Must include ESLint, Prettier, Husky, and GitHub Actions configuration

## 5. Component Architecture

### Component Hierarchy

```
src/components/
├── ui/                    # Atoms (ShadcnUI base components)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── ...
├── molecules/             # Molecules (combined atoms)
│   ├── SearchInput.tsx
│   ├── UserAvatar.tsx
│   └── FormField.tsx
├── organisms/             # Organisms (complex components)
│   ├── NavigationBar.tsx
│   ├── DataTable.tsx
│   └── UserProfileForm.tsx
└── templates/             # Page templates
    ├── DashboardLayout.tsx
    └── AuthLayout.tsx
```

### Props Interface

```typescript
// Base component props
interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  'data-testid'?: string
}

// CRUD operation props
interface CrudOperationProps<T> {
  data: T[]
  loading: boolean
  error: string | null
  onAdd: (item: Omit<T, 'id'>) => Promise<void>
  onUpdate: (id: string, item: Partial<T>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}
```

### State Structure

- **Local State**: Form inputs, UI toggles, temporary data
- **Zustand Store**: User preferences, theme, global UI state, complex business logic
- **React Query**: Server data, API responses, caching

### Custom Hooks

- `useAuth()` - Authentication state and actions
- `useCrud()` - Generic CRUD operations
- `useLocalStorage()` - Persistent local storage
- `useTheme()` - Theme switching functionality

### Domain Organization

```
src/domains/
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── types/
│   └── api/
├── users/
│   ├── components/
│   ├── hooks/
│   ├── types/
│   └── api/
└── dashboard/
    ├── components/
    ├── hooks/
    ├── types/
    └── api/
```

## 6. TypeScript Definitions

### Interfaces

```typescript
// Core user interface
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: Date
  updatedAt: Date
}

// API response wrapper
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// Pagination interface
interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

### API Types

```typescript
// Authentication requests
interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest extends LoginRequest {
  name: string
  confirmPassword: string
}

// CRUD operation types
interface CreateUserRequest {
  name: string
  email: string
  role: 'admin' | 'user'
}

interface UpdateUserRequest extends Partial<CreateUserRequest> {}
```

### Component Props

```typescript
// Button component props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

// Data table props
interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  pagination?: PaginationConfig
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void
}
```

### Store Types

```typescript
// Zustand store interfaces
interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface ThemeStore {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}
```

## 7. User Interface Requirements

### Tailwind Classes

- **Layout**: `container mx-auto px-4 sm:px-6 lg:px-8`
- **Grid Systems**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Spacing**: `space-y-4`, `space-x-2`, `p-4`, `m-2`
- **Typography**: `text-sm`, `text-base`, `text-lg`, `font-medium`, `font-semibold`

### Responsive Design

- **Mobile (sm)**: Single column layouts, collapsible navigation
- **Tablet (md)**: Two-column layouts, expanded navigation
- **Desktop (lg/xl)**: Multi-column layouts, sidebar navigation
- **Breakpoint Classes**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

### Interactive Elements

- **Forms**: ShadcnUI form components with validation states
- **Buttons**: Primary, secondary, outline, and ghost variants
- **Modals**: Dialog components with proper focus management
- **Navigation**: Responsive navbar with mobile menu

### Loading & Error States

- **Skeleton Screens**: Custom skeleton components for different content types
- **Loading Spinners**: Consistent spinner component with size variants
- **Error Messages**: Toast notifications and inline error displays
- **Empty States**: Meaningful empty state illustrations and messages

### Icons

- **Lucide React Icons**: User, Settings, Search, Plus, Edit, Trash, ChevronDown, Menu, X
- **Consistent Sizing**: 16px (sm), 20px (md), 24px (lg)

### Animations

- **Framer Motion**: Page transitions, modal animations, hover effects
- **Tailwind Transitions**: `transition-all duration-200 ease-in-out`

## 8. Data Flow & API Integration

### React Query

- **Query Keys**: Hierarchical structure (`['users', 'list']`, `['users', 'detail', id]`)
- **API Functions**: Centralized in domain `api/` folders
- **Caching Strategies**: Stale-while-revalidate with 5-minute default stale time
- **Optimistic Updates**: For CRUD operations

### API Endpoints

```typescript
// User management endpoints
GET    /api/users          // List users with pagination
POST   /api/users          // Create new user
GET    /api/users/:id      // Get user details
PUT    /api/users/:id      // Update user
DELETE /api/users/:id      // Delete user

// Authentication endpoints
POST   /api/auth/login     // User login
POST   /api/auth/register  // User registration
POST   /api/auth/logout    // User logout
GET    /api/auth/me        // Current user info
```

### Data Fetching Strategy

- **useQuery**: For data fetching with automatic caching
- **useMutation**: For create/update/delete operations
- **useInfiniteQuery**: For paginated data with infinite scroll
- **Suspense**: For component-level loading states

### Zustand Store

```typescript
// Store structure in src/shared/store
interface AppStore {
  // UI state
  sidebar: {
    isOpen: boolean
    toggle: () => void
  }

  // User preferences
  preferences: {
    language: string
    notifications: boolean
    setPreference: (key: string, value: any) => void
  }
}
```

### Form State

- **React Hook Form**: Form validation and submission
- **Zod Schemas**: Type-safe validation in `src/shared/lib/validations.ts`
- **Error Handling**: Field-level and form-level error displays

## 9. Non-Goals (Out of Scope)

- **Backend Implementation**: No server-side code or database setup
- **Deployment Configuration**: No specific hosting platform configurations
- **Advanced Analytics**: No analytics tracking or reporting features
- **Payment Integration**: No payment gateway or e-commerce functionality
- **Real-time Features**: No WebSocket or real-time data synchronization
- **Mobile App**: No React Native or mobile app components
- **SEO Optimization**: Basic meta tags only, no advanced SEO features
- **Internationalization**: English-only, no multi-language support in initial version

## 10. Technical Implementation

### Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.28.0",
    "@tanstack/react-query": "^5.56.0",
    "zustand": "^5.0.0",
    "axios": "^1.7.0",
    "react-hook-form": "^7.53.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0",
    "tailwindcss": "^3.4.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-dropdown-menu": "^2.1.0",
    "lucide-react": "^0.447.0",
    "framer-motion": "^11.11.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^8.8.0",
    "@typescript-eslint/parser": "^8.8.0",
    "eslint": "^9.11.0",
    "prettier": "^3.3.0",
    "vitest": "^2.1.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.5.0",
    "playwright": "^1.47.0",
    "husky": "^9.1.0",
    "lint-staged": "^15.2.0"
  }
}
```

### File Structure

```
src/
├── components/
│   ├── ui/                # ShadcnUI components
│   ├── molecules/         # Atomic design molecules
│   ├── organisms/         # Atomic design organisms
│   └── templates/         # Page templates
├── pages/                 # Route components
├── domains/               # Feature-based organization
│   ├── auth/
│   ├── users/
│   └── dashboard/
├── shared/
│   ├── hooks/
│   ├── lib/
│   ├── store/
│   ├── types/
│   ├── assets/
│   └── styles/
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

### Performance

- **React.memo**: For expensive components
- **useMemo**: For complex calculations
- **useCallback**: For event handlers passed to children
- **Code Splitting**: Route-based and component-based lazy loading
- **Bundle Analysis**: Vite bundle analyzer integration

### Accessibility

- **ARIA Attributes**: Proper labeling and descriptions
- **Keyboard Navigation**: Tab order and keyboard shortcuts
- **Screen Reader**: Semantic HTML and ARIA live regions
- **Color Contrast**: WCAG AA compliant color schemes

### Testing Strategy

- **Unit Tests**: Utilities, hooks, and pure functions
- **Component Tests**: React Testing Library for UI components
- **Integration Tests**: API integration and user workflows
- **E2E Tests**: Playwright for critical user journeys

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/domains': path.resolve(__dirname, './src/domains'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
})
```

## 11. Success Metrics

- **Developer Onboarding**: New developers can create a feature within 2 hours of setup
- **Code Quality**: 90%+ test coverage with zero TypeScript errors
- **Performance**: Lighthouse score of 95+ for performance
- **Accessibility**: WCAG AA compliance with automated testing
- **Bundle Size**: Initial bundle under 200KB gzipped
- **Build Time**: Development server starts in under 5 seconds
- **Developer Satisfaction**: Positive feedback on development experience

## 12. Implementation Checklist

### Component Files

- [ ] `src/components/ui/` - All ShadcnUI base components
- [ ] `src/components/molecules/SearchInput.tsx`
- [ ] `src/components/molecules/UserAvatar.tsx`
- [ ] `src/components/molecules/FormField.tsx`
- [ ] `src/components/organisms/NavigationBar.tsx`
- [ ] `src/components/organisms/DataTable.tsx`
- [ ] `src/components/organisms/UserProfileForm.tsx`
- [ ] `src/components/templates/DashboardLayout.tsx`
- [ ] `src/components/templates/AuthLayout.tsx`

### Hook Files

- [ ] `src/shared/hooks/useAuth.ts`
- [ ] `src/shared/hooks/useCrud.ts`
- [ ] `src/shared/hooks/useLocalStorage.ts`
- [ ] `src/shared/hooks/useTheme.ts`
- [ ] `src/domains/users/hooks/useUsers.ts`
- [ ] `src/domains/auth/hooks/useAuthForm.ts`

### Type Files

- [ ] `src/shared/types/api.ts`
- [ ] `src/shared/types/user.ts`
- [ ] `src/shared/types/auth.ts`
- [ ] `src/domains/users/types/index.ts`
- [ ] `src/domains/auth/types/index.ts`

### Test Files

- [ ] `src/components/ui/__tests__/Button.test.tsx`
- [ ] `src/shared/hooks/__tests__/useAuth.test.ts`
- [ ] `src/domains/users/__tests__/users.test.tsx`
- [ ] `tests/e2e/authFlow.spec.ts`
- [ ] `tests/e2e/crudOperations.spec.ts`

### API Functions

- [ ] `src/domains/auth/api/auth.ts`
- [ ] `src/domains/users/api/users.ts`
- [ ] `src/shared/lib/api.ts`

### Store Setup

- [ ] `src/shared/store/authStore.ts`
- [ ] `src/shared/store/themeStore.ts`
- [ ] `src/shared/store/uiStore.ts`
- [ ] `src/shared/store/index.ts`

### Shared Utilities

- [ ] `src/shared/lib/utils.ts`
- [ ] `src/shared/lib/validations.ts`
- [ ] `src/shared/lib/constants.ts`
- [ ] `src/shared/lib/apiClient.ts`

## 13. Code Examples

### Component Signature

```typescript
// User profile form component
interface UserProfileFormProps {
  user?: User
  onSubmit: (data: UpdateUserRequest) => Promise<void>
  loading?: boolean
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  user,
  onSubmit,
  loading = false,
}) => {
  // Implementation
}
```

### API Function

```typescript
// Users API with React Query
export const useUsers = () => {
  return useQuery({
    queryKey: ['users', 'list'],
    queryFn: async (): Promise<PaginatedResponse<User>> => {
      const response = await apiClient.get('/users')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: CreateUserRequest): Promise<User> => {
      const response = await apiClient.post('/users', userData)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### Zod Schema

```typescript
// User validation schemas
export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user']),
})

export const updateUserSchema = createUserSchema.partial()

export type CreateUserData = z.infer<typeof createUserSchema>
export type UpdateUserData = z.infer<typeof updateUserSchema>
```

### Test Cases

```typescript
// Component test example
describe("UserProfileForm", () => {
  it("should submit form with valid data", async () => {
    const mockSubmit = vi.fn();
    render(<UserProfileForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
    });
  });
});
```

## 14. Open Questions

1. **Mock Data Strategy**: Should we include a complete mock API server (MSW) or simple JSON files?
2. **Authentication Provider**: Should we include examples for specific providers (Auth0, Firebase, Supabase)?
3. **Database Integration**: Should we include examples for different database adapters?
4. **Deployment Examples**: Should we include Docker configuration and deployment scripts?
5. **Component Documentation**: Should we include Storybook for component documentation?
6. **Advanced Patterns**: Should we include examples of advanced React patterns (render props, compound components)?
7. **Monitoring Setup**: Should we include error tracking (Sentry) and analytics setup?

---

This PRD provides a comprehensive foundation for building a production-ready React boilerplate that follows modern best practices and atomic design principles. The implementation should focus on providing clear examples that senior developers can quickly understand and extend for their specific project needs.
