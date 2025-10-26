# Core Development Rules for Bun + Turborepo Monorepo

## 1. Overview

This document establishes the fundamental development principles and standards for the Bun + Turborepo Monorepo project. These rules ensure consistency, maintainability, and scalability across the full-stack application featuring React frontend, NestJS backend, and Python FastAPI data service.

## 2. ⚠️ CRITICAL: Monorepo Full-Stack Application Scope

**THIS IS A PRODUCTION-READY MONOREPO with three distinct services orchestrated by Turborepo and Bun. Development spans frontend, backend API, and data processing service.**

### 2.1. Repository Scope Definition:

**Frontend Application (apps/frontend):**

- **React Application**: Single-page application with React 19, TypeScript, and Vite
- **Component Libraries**: Reusable UI components following atomic design principles
- **Modern Tooling**: Bun package manager, Vite bundler, Vitest testing, Playwright E2E
- **API Integration**: Frontend service layers consuming backend API via React Query
- **State Management**: Zustand for client state, React Query for server state

**Backend API (apps/backend):**

- **NestJS Framework**: TypeScript-based Node.js framework for API development
- **API Gateway**: Proxies requests to Python data service
- **File Upload**: Multer middleware for handling multipart form data
- **CORS**: Cross-origin resource sharing enabled for frontend
- **Type Safety**: Shared TypeScript types via workspace protocol

**Python Data Service (apps/data-service):**

- **FastAPI Framework**: High-performance Python web framework
- **Data Processing**: Pandas for Excel analysis, ElementTree for XML
- **File Analysis**: Excel structure analysis, XML parsing
- **RESTful API**: Health checks and analysis endpoints
- **CORS**: Configured for backend communication

**Shared Package (packages/shared):**

- **TypeScript Types**: Shared type definitions for cross-service communication
- **Validation Utilities**: Common file validation logic
- **Constants**: Shared enumerations and constants
- **Workspace Protocol**: Accessible to frontend and backend via `workspace:*`

### 2.2. Service Responsibilities:

**Frontend Scope:**

- UI/UX implementation with React and Tailwind CSS
- File upload functionality for Excel/XML
- API integration via React Query
- Client-side state management
- Form validation and user interactions

**Backend Scope:**

- API endpoints for file upload
- Request validation and sanitization
- File handling with Multer
- Proxy layer to Python service
- Health check endpoints

**Python Service Scope:**

- Excel file analysis (columns, rows, data types)
- XML structure analysis (elements, attributes)
- Data processing with Pandas
- File validation and cleanup
- Analysis result formatting

**Explicitly Out of Scope:**

- Database systems (not implemented in this boilerplate)
- Authentication implementation (structure exists in frontend)
- Payment processing
- Third-party integrations beyond data analysis

## 3. Core Principles

These rules establish a **monorepo, documentation-driven, full-stack development approach** that ensures scalability, maintainability, and knowledge retention across the entire application stack. This workspace follows domain-driven architecture on the frontend with atomic design principles, API gateway pattern on the backend, and microservice architecture for data processing.

> 📁 **For navigation and folder overview**, see [`../documents/index.md`](../documents/index.md)

### 3.1. Monorepo Development Approach

**All development activities must consider the full-stack context while maintaining service independence.**

- **Service Isolation**: Each service (frontend, backend, Python) can be developed and deployed independently
- **Shared Types**: Leverage shared TypeScript package for type safety across services
- **API Contracts**: Clear API contracts between frontend ↔ backend ↔ Python service
- **Workspace Dependencies**: Use Bun workspaces for efficient dependency management
- **Task Orchestration**: Utilize Turborepo for parallel builds, tests, and deployments
- **Modern Patterns**: Use appropriate patterns for each service (React hooks, NestJS modules, FastAPI routers)

### 3.2. Documentation as Critical Infrastructure

In a monorepo with multiple services, documentation is critical infrastructure that enables:

- **Service Integration**: Clear documentation of API contracts between services
- **Component Reusability**: Documentation for shared components and types
- **Domain Knowledge**: Understanding of business logic across all layers
- **State Management**: Documentation of state flow from UI through backend to data processing
- **Knowledge Preservation**: Institutional memory for architectural decisions spanning multiple services

### 3.3. Full-Stack Thinking

Every development decision must consider:

- **Service Boundaries**: Which service handles this functionality and why
- **Type Safety**: How types flow from frontend through backend to data processing
- **API Design**: RESTful endpoints, request/response formats, error handling
- **Performance**: Impact on each service (bundle size, API latency, data processing time)
- **Deployment**: How changes affect each service's deployment independently

## 4. 🔥 Critical Rules (ALWAYS Follow)

### 4.1. Build Validation Before Code Task Completion

**ALWAYS run build to verify no errors before completing code-related tasks:**

- **Code Tasks Only**: Execute `bun run build` before marking any **code implementation task** as complete
- **Service-Specific Builds**: Can test individual services with `bunx turbo run build --filter=<service>`
- **Documentation Tasks Excluded**: Pure documentation tasks (writing docs, updating guides, creating templates) do not require build validation
- **Error Resolution**: If build fails, immediately investigate and fix all compilation errors across all affected services
- **Type Safety**: Ensure TypeScript compilation passes in frontend, backend, and shared package
- **Bundle Verification**: Confirm production build generates successfully for all services
- **Dependency Check**: Verify all imports and workspace dependencies resolve correctly

**Tasks Requiring Build Validation:**

- Frontend: Component implementation, API client changes, routing updates
- Backend: Controller/service changes, module updates, shared type usage
- Shared: Type definition changes affecting frontend or backend
- Configuration: Changes to turbo.json, package.json, tsconfig.json
- Dependencies: Package installations or upgrades

**Tasks NOT Requiring Build Validation:**

- Pure documentation writing or updates
- Template creation or modification
- Guidelines and process documentation
- README updates and project documentation
- Design documentation and wireframes
- Python code changes (Python doesn't have a TypeScript build step)

**Build Validation Process:**

1. Run `bun run type-check` to verify TypeScript compliance across all TypeScript apps
2. Execute `bun run lint` to ensure code quality standards
3. Run `bun run build` to verify production compilation of all services
4. If any step fails, stop work and resolve errors immediately
5. Never commit code that doesn't pass the complete build process
6. Document any build configuration changes in technical architecture

**Critical Build Commands:**

- `bun run build`: Build all apps via Turborepo
- `bunx turbo run build --filter=frontend`: Build frontend only
- `bunx turbo run build --filter=backend`: Build backend only
- `bun run type-check`: TypeScript validation across workspace
- `bun run lint`: Code quality verification across workspace
- `bun run test`: Unit test validation

### 4.2. Documentation-First Development

**ALWAYS document first, for every task across all services:**

- **Scan existing documents** in `.ai/documents/` before starting any task
- **Use relevant information** from existing documentation and update with latest requirements
- **If no relevant documents exist**, write documentation before coding
- **Update documentation** as requirements evolve during development
- **Consider service impact** when documenting features that affect multiple services (frontend, backend, Python)
- **Document API contracts** when creating or modifying endpoints
- **Document shared types** when adding to packages/shared

**Implementation Process:**

1. Search `.ai/documents/` for relevant existing documentation
2. Review and analyze existing content for applicability across services
3. Update existing documents OR create new ones as needed
4. Consider impact on frontend components, backend endpoints, and data processing
5. Document API contracts between services (request/response formats)
6. Update shared type documentation when modifying packages/shared
7. Proceed with implementation only after documentation is complete

**Service-Specific Documentation:**

- **Frontend**: Component APIs, state management patterns, routing structure
- **Backend**: Controller endpoints, service methods, DTO definitions
- **Python**: Analysis functions, data transformation logic, endpoint contracts
- **Shared**: Type definitions, validation utilities, cross-service interfaces

### 4.3. Critical Documentation Review

**BE CRITICAL AND STRICT on all documents across the entire stack:**

- **Quality Control**: Every document must meet high standards for clarity, accuracy, and completeness
- **Technical Accuracy**: Verify technical details work with current tech stack (React 19, NestJS 10, FastAPI 0.109, Bun 1.1.33, Turborepo 2.5.8)
- **Completeness Check**: Ensure all necessary information is included for all relevant services
- **Consistency Review**: Maintain consistent formatting, terminology, and structure across all documents
- **Architecture Alignment**: Ensure documentation aligns with monorepo architecture principles
- **Service Coverage**: Verify documentation covers frontend, backend, and Python service aspects when applicable

**Critical Review Process:**

1. Review document for technical accuracy across all services
2. Verify all code examples, configurations, and procedures work with Vite/React/NestJS/FastAPI
3. Check cross-references and ensure all links work
4. Validate API contracts match between frontend and backend
5. Ensure shared types are properly documented
6. Validate that document serves its intended purpose for the monorepo architecture
7. Update or reject documents that don't meet quality standards

## 5. 🏗️ Architecture Rules

### 5.1. Service Boundary Management

**ALWAYS maintain clear service boundaries in the monorepo:**

- **Define ownership**: Each feature should have a clear owning service (frontend UI, backend API, Python processing)
- **API contracts**: Define clear contracts between services (TypeScript types in shared package)
- **Independent deployment**: Services can be deployed independently
- **Minimize coupling**: Prefer loose coupling through well-defined REST APIs
- **Shared package usage**: Use packages/shared for cross-service TypeScript types only

**Service Boundary Guidelines:**

1. **Identify primary owner**: Which service is responsible for this functionality?
2. **Define interfaces**: What data needs to be shared between services?
3. **Choose communication pattern**: HTTP/REST for service-to-service communication
4. **Plan type safety**: Add types to packages/shared if used by multiple TypeScript services
5. **Document contracts**: Clear API documentation for all endpoints

**Service Communication Flow:**

```
Frontend (React) → Backend (NestJS) → Python (FastAPI)
     ↓                   ↓                   ↓
  UI Logic          API Gateway        Data Processing
     ↓                   ↓                   ↓
React Query         Multer/Axios         Pandas/OpenPyXL
     ↓                   ↓                   ↓
Shared Types       Shared Types       JSON Response
```

### 5.2. Component Library Management (Frontend)

**ALWAYS consider component reusability for cross-domain features:**

- **Evaluate reusability**: Determine if functionality should be in shared components vs. domain-specific
- **Atomic design**: Follow atoms, molecules, organisms, templates pattern in `apps/frontend/src/core/components/`
- **API design**: Design component APIs for flexibility and backward compatibility
- **Performance considerations**: Consider bundle size impact and lazy loading strategies
- **Documentation**: Maintain clear documentation of component usage and props

**Component Decision Framework:**

1. **Assess reusability**: Will this be used by multiple domains?
2. **Evaluate complexity**: Is the shared implementation worth the coordination overhead?
3. **Consider coupling**: Will sharing create unwanted dependencies between domains?
4. **Plan maintenance**: How will updates be managed across usages?
5. **Document decisions**: Record rationale for sharing vs. duplicating

### 5.3. Backend Module Management

**ALWAYS organize backend code in NestJS modules:**

- **Modular structure**: Each feature area has its own module (e.g., DataModule)
- **Dependency injection**: Use NestJS DI for service dependencies
- **Controller separation**: Controllers handle HTTP, services handle business logic
- **Shared types**: Import from packages/shared for type safety with frontend
- **Configuration**: Use @nestjs/config for environment variables

### 5.4. Python Service Organization

**ALWAYS keep Python service focused on data processing:**

- **Single responsibility**: Data analysis and file processing only
- **FastAPI routers**: Organize endpoints by feature (excel analysis, xml analysis)
- **Type hints**: Use Python type hints for all function signatures
- **Error handling**: Proper HTTP exceptions for invalid files or processing errors
- **File cleanup**: Always clean up uploaded files after processing

## 6. 📋 Code Quality Standards

**ALWAYS maintain high code quality across all services:**

- **Consistent patterns**: Use consistent coding patterns within each service (React patterns, NestJS patterns, Python patterns)
- **Modern tooling**: Leverage Bun, Vite, Vitest, Playwright, NestJS CLI, FastAPI effectively
- **Type safety**: Maintain strict TypeScript usage in frontend, backend, and shared package
- **Performance monitoring**: Monitor bundle sizes (frontend), API latency (backend), processing time (Python)
- **Testing standards**: Comprehensive test coverage including component tests, API tests, and E2E tests

**Quality Assurance Process:**

1. **Code review**: All changes reviewed for quality and architectural alignment
2. **Automated testing**: Comprehensive test coverage across all services
3. **Performance testing**: Regular performance audits for each service
4. **Type checking**: Strict TypeScript enforcement in frontend and backend
5. **Documentation updates**: Code changes accompanied by documentation updates
6. **Build validation**: All services must build successfully before merge

**Service-Specific Standards:**

**Frontend:**

- React.FC with memo for all components
- Tailwind CSS for styling
- React Query for server state
- Zustand for client state
- Vitest for unit tests, Playwright for E2E

**Backend:**

- NestJS module structure
- DTOs for request validation
- Proper error handling
- Jest for unit and integration tests
- Swagger documentation for APIs

**Python:**

- Type hints for all functions
- FastAPI dependency injection
- Pydantic models for validation
- pytest for unit tests
- Proper logging and error handling

## 7. Related Guidelines

For detailed guidelines on specific development processes, refer to:

- **PRD Creation**: See `.ai/documents/guidelines/1-create-prd.md`
- **Task Generation**: See `.ai/documents/guidelines/2-generate-tasks.md`
- **Task Management**: See `.ai/documents/guidelines/3-process-task-list.md`

---

**Remember**: These core rules form the foundation of our monorepo development approach. They ensure that we maintain system coherence across multiple services while enabling independent development and deployment. Every decision should be evaluated against these principles to ensure we're building a scalable, maintainable full-stack system with clear service boundaries and strong type safety.
