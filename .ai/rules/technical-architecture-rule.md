# Technical Architecture Documentation

## 1. ⚠️ CRITICAL: Bun + Turborepo Monorepo Architecture

**THIS REPOSITORY IS A PRODUCTION-READY MONOREPO featuring React frontend, NestJS backend, and Python FastAPI data service, orchestrated with Turborepo and Bun.**

### 1.1. Architecture Scope:

- **Monorepo Structure**: Turborepo workspace with multiple applications and shared packages
- **Frontend Application**: React 19 + Vite + TypeScript single-page application
- **Backend API**: NestJS API server for file upload and proxy to data service
- **Data Service**: Python FastAPI service for data analysis (Excel, XML)
- **Shared Package**: TypeScript types shared across frontend and backend
- **Package Management**: Bun for fast package management and script execution
- **Build Orchestration**: Turborepo for efficient task running and caching
- **Testing Stack**: Vitest for unit testing, Playwright for end-to-end testing
- **State Management**: Zustand for application state, React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui components for design system

### 1.2. Monorepo Structure:

```
monorepo/
├── apps/
│   ├── frontend/       # React 19 + Vite + TailwindCSS (Port 5173)
│   ├── backend/        # NestJS API server (Port 3000)
│   └── data-service/   # Python FastAPI data processing (Port 8000)
├── packages/
│   └── shared/         # Shared TypeScript types
├── package.json        # Root workspace config
├── turbo.json          # Turborepo configuration
└── .env                # Environment variables
```

### 1.3. Service Communication:

```
Frontend (5173) → Backend (3000) → Python Service (8000)
     ↓                ↓                    ↓
  UI Layer      API Gateway        Data Processing
     ↓                ↓                    ↓
React Query      NestJS             FastAPI + Pandas
```

### 1.4. Styling Standards:

**ALWAYS use Tailwind CSS with shadcn/ui for consistent styling across the application:**

- **Primary Approach**: Tailwind CSS utility-first methodology for component styling
- **Component Library**: shadcn/ui for pre-built, accessible component primitives
- **Design System**: Consistent design tokens through Tailwind configuration
- **Customization**: Extend Tailwind config for project-specific design requirements
- **Performance**: Optimized CSS bundle through utility purging

### 1.3. shadcn/ui Integration Guidelines:

- Use shadcn/ui components as foundation for custom component development
- Customize shadcn/ui components through Tailwind utility classes
- Maintain design consistency through centralized component variants
- Follow shadcn/ui naming conventions and component structure
- Leverage Radix UI primitives for accessibility and behavior

### 1.4. Version Compatibility Verification:

**ALWAYS check package.json for current versions and fetch online documentation:**

- **Current Tailwind Version**: Check `package.json` for `tailwindcss` version (currently v4.1.12)
- **Current Radix Version**: Verify `@radix-ui/*` package versions for compatibility
- **Documentation Fetching**: Reference official docs matching exact version numbers
- **API Compatibility**: Ensure code examples match current version capabilities
- **Migration Guides**: Follow official migration guides for version updates

### 1.5. Version Check Process:

1. Run `grep -E "(tailwindcss|@radix-ui)" apps/frontend/package.json` to identify current versions
2. Visit official documentation for exact version matches
3. Verify API compatibility for all used features
4. Check for deprecated features in current versions
5. Update implementation to match current version best practices

### 1.6. Service Responsibilities:

**Frontend (apps/frontend):**

- React 19 UI with Atomic Design components
- Vite dev server with hot module replacement
- API integration via React Query
- File upload functionality for Excel/XML
- Tailwind CSS + shadcn/ui styling

**Backend (apps/backend):**

- NestJS API gateway
- CORS-enabled for frontend communication
- Multer for file upload handling
- Proxy layer to Python data service
- Health check endpoints

**Python Service (apps/data-service):**

- FastAPI data processing service
- Excel analysis with Pandas
- XML structure analysis
- File validation and cleanup
- RESTful API endpoints

**Shared Package (packages/shared):**

- TypeScript type definitions for Excel/XML analysis
- File validation utilities
- Common constants and enums
- Accessible via workspace protocol

## 2. Overview

### 2.1. Project Description

This is a production-ready Bun + Turborepo monorepo featuring a modern React frontend, NestJS backend API, and Python FastAPI data processing service. The system follows domain-driven design principles with atomic design methodology for component organization, providing a scalable foundation for building full-stack applications with data analysis capabilities.

### 2.2. Technology Stack

**Workspace Tools:**

- **Monorepo**: Turborepo 2.5.8 for task orchestration
- **Package Manager**: Bun 1.1.33 (ultra-fast JavaScript runtime)
- **Workspaces**: Bun workspaces for dependency management

**Frontend (apps/frontend):**

- **Framework**: React 19.1.1 with TypeScript 5.8.3
- **Build Tool**: Vite 7.1.2 for fast development and optimized builds
- **Styling**: TailwindCSS 4.1.12 with utility-first approach
- **State Management**: Zustand 5.0.7 for client state, React Query 5.85.3 for server state
- **Testing**: Vitest for unit testing, Playwright for E2E testing
- **Code Quality**: ESLint, Prettier, Husky for git hooks
- **Routing**: React Router 7.8.0
- **Forms**: React Hook Form with Zod validation

**Backend (apps/backend):**

- **Framework**: NestJS 10.3.0 with TypeScript 5.8.3
- **File Upload**: Multer for multipart form data
- **HTTP Client**: Axios for Python service communication
- **CORS**: Enabled for frontend integration
- **Build**: Webpack with ts-loader

**Data Service (apps/data-service):**

- **Framework**: FastAPI 0.109.0 (Python web framework)
- **Server**: Uvicorn 0.27.0 (ASGI server)
- **Data Processing**: Pandas 2.2.0 for data analysis
- **Excel Support**: OpenPyXL 3.1.2 for Excel file handling
- **CORS**: Configured for backend communication

**Shared (packages/shared):**

- **TypeScript**: Type definitions for cross-service communication
- **Validators**: File validation utilities
- **Constants**: Shared enumerations and constants

## 3. Architecture Principles

### 3.1. Monorepo Principles

- **Workspace Isolation**: Each app has its own dependencies and build configuration
- **Shared Code**: Common types and utilities in shared packages
- **Task Pipeline**: Turborepo orchestrates builds, tests, and lints efficiently
- **Caching**: Task outputs cached for faster subsequent runs
- **Parallel Execution**: Independent tasks run concurrently

### 3.2. Modern React Principles (Frontend)

- **Functional Components**: Use function components with hooks exclusively
- **Composition over Inheritance**: Favor component composition patterns
- **Declarative Programming**: Write declarative, predictable React code
- **Performance by Default**: Implement performance optimizations from the start

### 3.3. Backend API Principles

- **API Gateway Pattern**: Backend acts as gateway to data processing service
- **File Upload Handling**: Multer for robust file handling
- **Proxy Architecture**: Clean separation between API layer and data processing
- **Health Monitoring**: Health check endpoints for service monitoring

### 3.4. Code Organization Principles

- **Domain-Driven Design**: Code organized by business domains (frontend modules)
- **Atomic Design**: UI components follow atomic design methodology
- **Single Responsibility**: Each module has a single, well-defined purpose
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Workspace Dependencies**: Shared package accessible via workspace protocol

## 4. System Architecture

### 4.1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  Bun + Turborepo Monorepo                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │    Frontend      │  │     Backend      │  │    Python    │  │
│  │   React + Vite   │→ │   NestJS API     │→ │   FastAPI    │  │
│  │   Port 5173      │  │   Port 3000      │  │   Port 8000  │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│          ↓                      ↓                     ↓         │
│   ┌─────────────┐        ┌──────────┐         ┌──────────────┐ │
│   │  Component  │        │  Multer  │         │    Pandas    │ │
│   │    Layer    │        │   CORS   │         │   OpenPyXL   │ │
│   └─────────────┘        └──────────┘         └──────────────┘ │
│          ↓                                                      │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │              Shared TypeScript Types                    │  │
│   │         (packages/shared - workspace protocol)          │  │
│   └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2. Service Communication Flow

```
User Action (Upload File)
        ↓
Frontend: File Selection & Validation
        ↓
POST /api/data/excel (React Query)
        ↓
Backend: Multer File Upload
        ↓
POST http://localhost:8000/analyze/excel (Axios)
        ↓
Python: Pandas Analysis
        ↓
Return: ExcelAnalysisResult (from shared types)
        ↓
Backend: Proxy Response
        ↓
Frontend: Display Results
```

### 4.3. Application Communication

**Frontend ↔ Backend:**

- **Protocol**: HTTP/REST via Vite proxy
- **Data Format**: JSON with TypeScript types from shared package
- **State Management**: React Query for server state caching

**Backend ↔ Python:**

- **Protocol**: HTTP/REST via Axios
- **Data Format**: JSON matching shared type definitions
- **File Transfer**: Multipart form data via Axios

**Shared Types:**

- **Access Method**: Workspace protocol (`"shared": "workspace:*"`)
- **Import Path**: `import type { ExcelAnalysisResult } from 'shared'`
- **Type Safety**: Full TypeScript support across frontend and backend

## 5. Application Layer

### 5.1. Frontend Application Structure (apps/frontend)

The frontend follows a modular structure with atomic design principles:

```
apps/frontend/src/
├── core/                  # Core application infrastructure
│   ├── api/               # API layer and React Query setup
│   │   ├── client.ts      # Axios client configuration
│   │   ├── dataApi.ts     # NEW: Excel/XML upload API
│   │   ├── endpoints.ts   # API endpoint definitions
│   │   ├── queryClient.ts # React Query client
│   │   └── QueryProvider.tsx
│   ├── components/        # Reusable UI components (Atomic Design)
│   │   ├── atoms/         # Basic UI building blocks
│   │   ├── molecules/     # Composite components
│   │   ├── organisms/     # Complex UI sections
│   │   └── templates/     # Page layout components
│   ├── config/            # Application configuration
│   ├── hooks/             # Shared custom hooks
│   ├── i18n/              # Internationalization
│   ├── locale/            # Locale translations
│   └── routing/           # Route configuration
├── modules/               # Business domain modules
│   ├── auth/              # Authentication module
│   │   ├── domain/        # Domain layer
│   │   │   ├── types/     # Type definitions
│   │   │   └── enums/     # Enumerations
│   │   ├── api/           # API services
│   │   ├── components/    # Domain-specific components
│   │   └── hooks/         # Domain-specific hooks
│   └── users/             # User management module
├── pages/                 # Page components
├── shared/                # Shared utilities and resources
│   ├── assets/            # Static assets
│   ├── hooks/             # Shared custom hooks
│   ├── lib/               # Utility functions
│   ├── mocks/             # Mock data for development
│   ├── store/             # Global state stores (Zustand)
│   ├── styles/            # Global styles
│   ├── types/             # Shared TypeScript types
│   └── utils/             # Helper functions
└── test/                  # Test configuration and utilities
```

### 5.2. Backend Application Structure (apps/backend)

```
apps/backend/src/
├── main.ts                # NestJS bootstrap with CORS
├── app.module.ts          # Root module
├── app.controller.ts      # Health check endpoint
├── app.service.ts         # Root service
└── data/                  # Data processing module
    ├── data.module.ts     # Module definition
    ├── data.controller.ts # File upload endpoints
    └── data.service.ts    # Proxy to Python service
```

### 5.3. Python Service Structure (apps/data-service)

```
apps/data-service/
├── main.py                # FastAPI app with analysis endpoints
├── requirements.txt       # Python dependencies
├── Procfile              # Railway deployment
├── railway.json          # Railway configuration
└── runtime.txt           # Python version
```

### 5.4. Shared Package Structure (packages/shared)

```
packages/shared/src/
├── types/
│   ├── excel.ts          # ExcelAnalysisResult interface
│   ├── xml.ts            # XMLAnalysisResult interface
│   └── index.ts
├── utils/
│   ├── validators.ts     # File validation utilities
│   └── index.ts
└── index.ts              # Package exports
```

### 5.5. Component Standards (Frontend)

#### 5.5.1. React Component Standards

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

#### 5.5.2. Import Organization Standards (Frontend)

- **Library imports first**: External libraries and React imports
- **Custom imports second**: Internal modules and components
- **Alphabetical ordering**: Within each group, maintain alphabetical order
- **Alias imports**: Use @/ for internal module imports (apps/frontend only)
- **Core Components**: Import from `@/core/components/` for reusable UI components
- **Module Components**: Import from `@/modules/[module-name]/` for domain-specific components
- **Shared Package**: Import types from `shared` package using workspace protocol

```typescript
// ✅ Correct import organization in frontend
import { memo, useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'

import { Button } from '@/core/components/atoms'
import { UserService } from '@/core/api/UserService'
import { useAuthStore } from '@/shared/store/auth'
import type { User } from '@/modules/users/domain/types'

// Import from shared package
import type { ExcelAnalysisResult } from 'shared'
```

**Backend Import Standards:**

```typescript
// ✅ Correct import organization in backend
import { Injectable, HttpException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import type { AxiosResponse } from 'axios'

// Import from shared package
import type { ExcelAnalysisResult, XMLAnalysisResult } from 'shared'
```

#### 5.5.3. Technology Preferences

**Frontend:**

- **State Management**: Use Zustand for new global state management
- **Server State**: Use React Query (TanStack Query) for all server state
- **Styling**: Use Tailwind CSS utility classes for styling
- **Components**: Build components following atomic design principles in `apps/frontend/src/core/components/`
- **Module Organization**: Organize domain logic in `apps/frontend/src/modules/` with domain/types/enums structure
- **API Layer**: Use data API client from `apps/frontend/src/core/api/dataApi.ts` for file uploads

**Backend:**

- **Framework**: NestJS with modular architecture
- **File Handling**: Multer for file uploads
- **HTTP Client**: Axios for Python service communication
- **Validation**: Class-validator for DTO validation
- **Configuration**: @nestjs/config for environment variables

**Python:**

- **Framework**: FastAPI for high-performance APIs
- **Data Processing**: Pandas for Excel/CSV analysis
- **Excel Handling**: OpenPyXL for Excel file operations
- **Server**: Uvicorn ASGI server

**Shared:**

- **Type Definitions**: TypeScript interfaces for cross-service communication
- **Validation**: Shared validation utilities accessible to frontend and backend

```typescript
// State management with Zustand (Frontend)
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

// Server state with React Query (Frontend)
import { useQuery } from '@tanstack/react-query'
import { uploadExcelFile } from '@/core/api/dataApi'
import type { ExcelAnalysisResult } from 'shared'

export const useExcelUpload = (file: File) => {
  return useQuery<ExcelAnalysisResult>({
    queryKey: ['excel-analysis', file.name],
    queryFn: () => uploadExcelFile(file),
    enabled: !!file,
  })
}
```

**Module Structure Pattern (Frontend):**

```typescript
// Module organization example: apps/frontend/src/modules/auth/
auth/
├── domain/           # Domain layer
│   ├── types/        # Type definitions
│   │   └── index.ts
│   ├── enums/        # Enumerations
│   │   └── index.ts
│   └── index.ts      # Domain exports
├── api/              # API services
│   └── authService.ts
├── components/       # Module-specific components
│   └── LoginForm.tsx
├── hooks/            # Module-specific hooks
│   └── useAuth.ts
└── index.ts          # Module exports
```

**Backend Module Pattern:**

```typescript
// NestJS module: apps/backend/src/data/
data/
├── data.module.ts     # Module definition with Multer config
├── data.controller.ts # REST endpoints (POST /data/excel, /data/xml)
└── data.service.ts    # Business logic (proxy to Python service)
```

### 5.6. Route Structure (Frontend)

```typescript
// Route configuration pattern in apps/frontend/src/core/routing/
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

### 5.7. Backend API Endpoints

```typescript
// NestJS controllers in apps/backend/src/
// Health check endpoint
@Get('health')
getHealth() {
  return { status: 'ok', service: 'backend', timestamp: new Date().toISOString() };
}

// Excel upload endpoint
@Post('data/excel')
@UseInterceptors(FileInterceptor('file'))
async uploadExcel(@UploadedFile() file: Express.Multer.File) {
  // Proxy to Python service at http://localhost:8000/analyze/excel
  return await this.dataService.analyzeExcel(file);
}

// XML upload endpoint
@Post('data/xml')
@UseInterceptors(FileInterceptor('file'))
async uploadXML(@UploadedFile() file: Express.Multer.File) {
  // Proxy to Python service at http://localhost:8000/analyze/xml
  return await this.dataService.analyzeXML(file);
}
```

### 5.8. Python Service Endpoints

```python
# FastAPI endpoints in apps/data-service/main.py
@app.get("/")
async def root():
    return {"message": "Python Data Service", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "ok", "service": "python-data-service", "timestamp": datetime.now().isoformat()}

@app.post("/analyze/excel")
async def analyze_excel(file: UploadFile = File(...)):
    # Pandas analysis returning ExcelAnalysisResult
    df = pd.read_excel(file.file)
    return {
        "columns": df.columns.tolist(),
        "rows": len(df),
        "shape": list(df.shape),
        "dtypes": {col: str(dtype) for col, dtype in df.dtypes.items()}
    }

@app.post("/analyze/xml")
async def analyze_xml(file: UploadFile = File(...)):
    # XML parsing returning XMLAnalysisResult
    tree = ET.parse(file.file)
    root = tree.getroot()
    return {
        "root": root.tag,
        "childCount": len(root),
        "allElements": list(set([elem.tag for elem in root.iter()])),
        "attributes": root.attrib
    }
```

### 5.9. State Management Patterns (Frontend)

#### 5.9.1. Zustand Store Template

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

#### 5.9.2. React Query Integration

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadExcelFile, uploadXMLFile } from '@/core/api/dataApi'
import type { ExcelAnalysisResult, XMLAnalysisResult } from 'shared'

// Query hook for Excel upload
export const useExcelAnalysis = (file: File | null) => {
  return useQuery<ExcelAnalysisResult>({
    queryKey: ['excel-analysis', file?.name],
    queryFn: () => uploadExcelFile(file!),
    enabled: !!file,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Mutation hook for file upload
export const useFileUpload = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { file: File; type: 'excel' | 'xml' }) => {
      return data.type === 'excel'
        ? uploadExcelFile(data.file)
        : uploadXMLFile(data.file)
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['file-analysis', variables.file.name], data)
    },
  })
}
```

### 5.10. API Structure

#### 5.10.1. Frontend API Client

```typescript
// Frontend data API in apps/frontend/src/core/api/dataApi.ts
import axios from 'axios'
import type { ExcelAnalysisResult, XMLAnalysisResult } from 'shared'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function uploadExcelFile(
  file: File
): Promise<ExcelAnalysisResult> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await axios.post<ExcelAnalysisResult>(
    `${API_BASE_URL}/data/excel`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return response.data
}

export async function uploadXMLFile(file: File): Promise<XMLAnalysisResult> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await axios.post<XMLAnalysisResult>(
    `${API_BASE_URL}/data/xml`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return response.data
}
```

#### 5.10.2. Backend Service Layer

```typescript
// Backend service in apps/backend/src/data/data.service.ts
import { Injectable, HttpException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import * as FormData from 'form-data'
import * as fs from 'fs'
import type { ExcelAnalysisResult, XMLAnalysisResult } from 'shared'

@Injectable()
export class DataService {
  private readonly pythonApiUrl =
    process.env.PYTHON_API_URL || 'http://localhost:8000'

  constructor(private readonly httpService: HttpService) {}

  async analyzeExcel(file: Express.Multer.File): Promise<ExcelAnalysisResult> {
    const formData = new FormData()
    formData.append('file', fs.createReadStream(file.path), file.originalname)

    try {
      const response = await firstValueFrom(
        this.httpService.post<ExcelAnalysisResult>(
          `${this.pythonApiUrl}/analyze/excel`,
          formData,
          { headers: formData.getHeaders() }
        )
      )
      return response.data
    } finally {
      fs.unlinkSync(file.path) // Cleanup uploaded file
    }
  }

  async analyzeXML(file: Express.Multer.File): Promise<XMLAnalysisResult> {
    const formData = new FormData()
    formData.append('file', fs.createReadStream(file.path), file.originalname)

    try {
      const response = await firstValueFrom(
        this.httpService.post<XMLAnalysisResult>(
          `${this.pythonApiUrl}/analyze/xml`,
          formData,
          { headers: formData.getHeaders() }
        )
      )
      return response.data
    } finally {
      fs.unlinkSync(file.path) // Cleanup uploaded file
    }
  }
}
```

## 6. Component Architecture

### 6.1. Atomic Design Structure

- **Atoms**: Basic building blocks (Button, Input, Typography)
- **Molecules**: Simple combinations (SearchInput, FormField)
- **Organisms**: Complex UI sections (NavigationBar, UserCard)
- **Templates**: Page layouts (AuthLayout, DashboardLayout)

### 6.2. Component Organization (Frontend)

```
apps/frontend/src/core/components/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Card/
│   ├── Input/
│   ├── Loading/
│   └── index.ts
├── molecules/
│   ├── FormErrors/
│   │   ├── FormErrors.tsx
│   │   ├── FormErrors.test.tsx
│   │   └── index.ts
│   ├── SearchInput/
│   ├── UserAvatar/
│   ├── ValidatedInput/
│   ├── FileUploader/       # NEW: File upload component
│   └── index.ts
├── organisms/
│   ├── ErrorBoundary/
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorBoundary.test.tsx
│   │   └── index.ts
│   ├── NavigationBar/
│   ├── DataAnalysisPanel/  # NEW: Data analysis display
│   └── index.ts
└── templates/
    ├── AuthLayout/
    │   ├── AuthLayout.tsx
    │   ├── AuthLayout.test.tsx
    │   └── index.ts
    ├── DashboardLayout/
    └── index.ts
```

### 6.3. Component Documentation Standards

Each component should include:

- **Props interface** with JSDoc comments
- **Usage examples** in component file
- **Test coverage** for all props and interactions
- **Storybook stories** for visual documentation

## 7. Development Infrastructure

### 7.1. Turborepo Configuration

```json
// turbo.json - Task orchestration
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "test": {
      "cache": true,
      "outputs": ["coverage/**"]
    },
    "lint": {
      "cache": true,
      "outputs": []
    }
  }
}
```

### 7.2. Bun Workspace Configuration

```json
// Root package.json
{
  "name": "monorepo",
  "private": true,
  "packageManager": "bun@1.1.33",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "bunx turbo run dev --parallel",
    "dev:all": "bunx concurrently -n frontend,backend,python ...",
    "build": "bunx turbo run build",
    "test": "bunx turbo run test",
    "lint": "bunx turbo run lint",
    "type-check": "bunx turbo run type-check"
  }
}
```

### 7.3. Vite Configuration (Frontend)

```typescript
// apps/frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
```

### 7.4. NestJS Configuration (Backend)

```json
// apps/backend/nest-cli.json
{
  "sourceRoot": "src",
  "entryFile": "apps/backend/src/main",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

```typescript
// apps/backend/src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })

  await app.listen(3000)
}
bootstrap()
```

### 7.5. Python Configuration (Data Service)

```python
# apps/data-service/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 8. Build and Deployment

### 8.1. Build Process

**Development:**

- `bun run dev` - Start all Node.js services via Turborepo
- `bun run dev:all` - Start all services including Python via concurrently
- `bun run dev:python` - Start Python service only

**Production:**

- `bun run build` - Build all apps via Turborepo pipeline
- Frontend: `bunx vite build` → `apps/frontend/dist/`
- Backend: `bunx nest build` → `apps/backend/dist/apps/backend/src/`
- Python: Pre-built, runs with `uvicorn main:app`

**Testing:**

- `bun run test` - Run all test suites
- `bun run test:e2e` - Run E2E tests (frontend)
- `bun run type-check` - TypeScript validation across all apps

### 8.2. Deployment Configuration

**Vercel (Frontend + Backend):**

```json
// vercel.json
{
  "buildCommand": "bunx turbo run build --filter=frontend --filter=backend",
  "outputDirectory": "apps/frontend/dist",
  "framework": "vite",
  "env": {
    "PYTHON_API_URL": "@python-api-url"
  }
}
```

**Railway (Python Service):**

```json
// apps/data-service/railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 8.3. Environment Variables

**Root `.env`:**

```env
NODE_ENV=development
PORT=3000
PYTHON_API_URL=http://localhost:8000
VITE_API_URL=http://localhost:3000
```

**Production:**

```env
NODE_ENV=production
PORT=3000
PYTHON_API_URL=https://your-app.railway.app
VITE_API_URL=https://your-app.vercel.app
```

### 8.4. Bun Scripts (Root)

```json
{
  "scripts": {
    "dev": "bunx turbo run dev --parallel",
    "dev:all": "bunx concurrently -n frontend,backend,python \"bunx turbo run dev --filter=frontend\" \"bunx turbo run dev --filter=backend\" \"bun run dev:python\"",
    "dev:python": "/path/to/python main.py",
    "build": "bunx turbo run build",
    "test": "bunx turbo run test",
    "test:e2e": "bunx turbo run test:e2e",
    "lint": "bunx turbo run lint",
    "lint:fix": "bunx turbo run lint:fix",
    "type-check": "bunx turbo run type-check",
    "clean": "bunx turbo run clean",
    "clean:all": "bun run clean && rm -rf node_modules apps/*/node_modules packages/*/node_modules"
  }
}
```

## 9. Testing Strategy

### 9.1. Frontend Testing (Vitest + Playwright)

- **Framework**: Vitest with React Testing Library
- **Coverage**: Minimum 80% code coverage requirement
- **Mocking**: Mock Service Worker (MSW) for API mocking
- **E2E**: Playwright for cross-browser testing
- **Location**: `apps/frontend/src/**/*.test.tsx` and `apps/frontend/tests/e2e/`

### 9.2. Backend Testing (Jest)

- **Framework**: Jest (NestJS default)
- **Unit Tests**: Service and controller testing
- **Integration Tests**: Full request/response cycle testing
- **Location**: `apps/backend/src/**/*.spec.ts`

### 9.3. Python Testing (pytest)

- **Framework**: pytest for Python testing
- **Coverage**: Unit tests for analysis functions
- **Location**: `apps/data-service/tests/`

### 9.4. Testing Best Practices

```typescript
// Frontend component testing
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

// Backend controller testing
import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';
import { DataService } from './data.service';

describe('DataController', () => {
  let controller: DataController;
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [DataService],
    }).compile();

    controller = module.get<DataController>(DataController);
    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```

## 10. Development Guidelines

### 10.1. Monorepo Architecture Guidelines

- **Workspace Organization**: Apps in `apps/`, shared code in `packages/`
- **Service Independence**: Each service can be developed and deployed independently
- **Shared Types**: Use workspace protocol for TypeScript types across services
- **Task Orchestration**: Leverage Turborepo for efficient builds and tests
- **Port Management**: Frontend (5173), Backend (3000), Python (8000)

### 10.2. Frontend Architecture Guidelines

- **Module Organization**: Business logic in `apps/frontend/src/modules/` with domain/types/enums
- **Component Architecture**: Atomic design in `apps/frontend/src/core/components/`
- **Import Standards**: Library imports first, alphabetical ordering, @/ alias
- **State Management**: Zustand for client state, React Query for server state
- **API Integration**: Use dataApi.ts for file uploads, React Query for caching

### 10.3. Backend Architecture Guidelines

- **Modular Structure**: NestJS modules for different features
- **API Gateway Pattern**: Backend proxies to Python service for data processing
- **File Handling**: Multer middleware for multipart uploads
- **CORS Configuration**: Enabled for frontend origin
- **Error Handling**: Proper HTTP exceptions and error responses

### 10.4. Python Service Guidelines

- **FastAPI Structure**: RESTful endpoints for data analysis
- **Data Processing**: Pandas for Excel, ElementTree for XML
- **File Validation**: Proper file type validation before processing
- **CORS**: Configured for backend communication
- **Cleanup**: Remove uploaded files after processing

### 10.5. Performance Guidelines

- **Frontend Optimization**: Code splitting, lazy loading, memoization with React.memo
- **Backend Optimization**: Efficient file streaming, proper memory management
- **Python Optimization**: Pandas optimizations for large datasets
- **Caching**: Turborepo caching for builds, React Query for API responses
- **Bundle Analysis**: Regular monitoring with Vite build analyzer

### 10.6. Documentation Standards

- **Code Documentation**: Comprehensive inline comments for complex logic
- **Component Documentation**: Props interfaces with JSDoc comments
- **API Documentation**: Clear documentation for all service endpoints
- **Type Documentation**: Shared types fully documented in packages/shared
- **Architecture Docs**: Keep technical-architecture-rule.md updated

This document serves as the comprehensive guide for developing within the Bun + Turborepo monorepo, ensuring consistency, maintainability, and scalability across all services.

```

```
