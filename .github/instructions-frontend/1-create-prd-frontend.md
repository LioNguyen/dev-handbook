# Rule: Generating a Product Requirements Document (PRD) for React Frontend Projects

## Goal

To guide an AI assistant in creating a detailed Product Requirements Document (PRD) in Markdown format for React frontend features, based on an initial user prompt. The PRD should be clear, actionable, and suitable for a junior React developer to understand and implement the feature in a React boilerplate application created with Vite.

## Project Setup

- **Vite** for project initialization and configuration
- #fetch https://vite.dev/guide/ to get updated guide

## Tech Stack & Standards

All React frontend PRDs should assume the following standardized tech stack:

### Core Technologies

- **React 19+** with TypeScript
- **React Router v6** for routing
- **React Query (TanStack Query)** for server state management
- **Zustand** for client state management (when Context is insufficient)
- **Axios** for API handling

### UI & Styling

- **Tailwind CSS** for styling, #fetch https://tailwindcss.com/docs/installation/using-vite to get updated guide
- **ShadcnUI** for styling, #fetch https://ui.shadcn.com/docs/installation/vite to get updated guide
- **Headless UI** or **Radix UI** for accessible component primitives
- **Lucide React** for icons
- **Framer Motion** for animations (when needed)

### Form Handling & Validation

- **React Hook Form** for form management
- **Zod** for schema validation

### Development Tools

- **ESLint** + **Prettier** for code formatting
- **TypeScript** strict mode enabled
- **Vitest** for unit testing
- **React Testing Library** for component testing
- **Playwright** for E2E testing

### Package Manager

- **bun** as the preferred package manager

## Standard Folder Structure

All React boilerplate projects should follow this folder structure:

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, inputs, etc.)
│   └── common/          # Shared business components
├── pages/               # Page components (route components)
├── domains/             # Domain-specific components and logic
│   └── [domain-name]/
│       ├── components/  # Domain-specific components
│       ├── hooks/       # Domain-specific custom hooks
│       ├── types/       # Domain-specific TypeScript types
│       └── api/         # Domain-specific API calls
├── shared/              # Shared utilities and configurations
│   ├── hooks/           # Global custom hooks
│   ├── lib/             # Utility functions and configurations
│   │   ├── api.ts       # API client setup
│   │   ├── utils.ts     # General utilities
│   │   └── validations.ts # Zod schemas
│   ├── store/           # Zustand stores
│   ├── types/           # Global TypeScript types
│   ├── assets/          # Static assets (images, fonts, etc.)
│   └── styles/          # Global styles and Tailwind config
```

## Naming Conventions

- **Component names** should be written in **PascalCase** (e.g., `UserProfile`, `LoginForm`).
- **Function, hook, and folder names** should be written in **camelCase** (e.g., `useAuth`, `fetchUserData`, `userProfile`).

## Process

1.  **Receive Initial Prompt:** The user provides a brief description or request for a new feature or functionality.
2.  **Ask Clarifying Questions:** Before writing the PRD, the AI _must_ ask clarifying questions to gather sufficient detail. The goal is to understand the "what" and "why" of the feature, not necessarily the "how" (which the developer will figure out). Make sure to provide options in letter/number lists so I can respond easily with my selections.
3.  **Generate PRD:** Based on the initial prompt and the user's answers to the clarifying questions, generate a PRD using the structure outlined below.
4.  **Save PRD:** Save the generated document as `prd-[feature-name].md` inside the `/tasks` directory.

## Clarifying Questions for React Frontend Features

The AI should adapt its questions based on the prompt, but here are common areas to explore for React boilerplate projects:

### General Feature Questions

- **Problem/Goal:** "What problem does this feature solve for the user?" or "What is the main goal we want to achieve with this feature?"
- **Target User:** "Who is the primary user of this feature?"
- **Core Functionality:** "Can you describe the key actions a user should be able to perform with this feature?"
- **User Stories:** "Could you provide a few user stories? (e.g., As a [type of user], I want to [perform an action] so that [benefit].)"

### React-Specific Questions

- **Component Structure:** "Should this be a single component or multiple components? What level of reusability is needed?"
- **State Management:** "What data needs to be managed in state? Should this use local state, React Context, or Zustand store?"
- **User Interactions:** "What user interactions should trigger state changes? (clicks, form submissions, hover, etc.)"
- **API Integration:** "Does this feature need to fetch data from APIs? What endpoints will be used? Should we use React Query for caching?"
- **Form Handling:** "If this involves forms, what validation rules are needed? What Zod schemas should be defined?"
- **Routing:** "Does this feature require new routes or affect existing navigation? What React Router patterns should be used?"
- **TypeScript:** "What TypeScript interfaces and types need to be defined for this feature?"
- **Domain Organization:** "Which domain does this feature belong to? Should it be placed in an existing domain or create a new one?"

### UI/UX Questions

- **Design System:** "Should this use existing Tailwind components or require new UI components? Any specific Headless UI or Radix components needed?"
- **Responsive Design:** "What are the responsive requirements using Tailwind's breakpoint system? (sm:, md:, lg:, xl:)"
- **Accessibility:** "What accessibility requirements need to be met? Any specific ARIA attributes or keyboard navigation patterns?"
- **Loading States:** "How should loading states be handled? Should we use React Query's loading states or custom loading components?"
- **Error Handling:** "How should errors be displayed? Toast notifications, inline errors, or error boundaries?"
- **Icons & Animations:** "What Lucide icons are needed? Any Framer Motion animations required?"

### Performance & Technical Questions

- **Performance:** "Are there any performance considerations? (React.memo, useMemo, useCallback, lazy loading, code splitting)"
- **Browser Support:** "Should this work in all modern browsers? Any specific polyfills needed?"
- **Testing:** "What Vitest unit tests and React Testing Library tests are needed? Any Playwright E2E tests required?"
- **Bundle Size:** "Are there any bundle size constraints? Should certain libraries be dynamically imported?"
- **Vite Configuration:** "Are there any specific Vite plugins or configurations needed for this feature?"

## PRD Structure for React Frontend Features

The generated PRD should include the following sections:

1.  **Introduction/Overview:** Briefly describe the React component/feature and the problem it solves. State the goal and where it fits in the application.

2.  **Goals:** List the specific, measurable objectives for this React feature.

3.  **User Stories:** Detail the user narratives describing feature usage and benefits from a frontend perspective.

4.  **Functional Requirements:** List the specific functionalities the React component/feature must have. Use clear, concise language (e.g., "The component must validate email format on blur", "The form must display error messages below each invalid field"). Number these requirements.

5.  **Component Architecture:**

- **Component Hierarchy:** Describe the main components and their relationships
- **Props Interface:** Define the TypeScript interfaces for component props
- **State Structure:** Outline what data will be managed in local state vs Zustand store in `src/shared/store`
- **Custom Hooks:** Identify any custom hooks that need to be created in domain or `src/shared/hooks`
- **Domain Organization:** Specify which domain this belongs to and folder structure

6.  **TypeScript Definitions:**

- **Interfaces:** Define all TypeScript interfaces and types needed
- **API Types:** Specify request/response types for API calls
- **Component Props:** Detail prop types for each component
- **Store Types:** Define Zustand store state and actions types in `src/shared/types`

7.  **User Interface Requirements:**

- **Tailwind Classes:** Specify key Tailwind utility classes for layout and styling
- **Responsive Design:** Define behavior across Tailwind breakpoints (sm, md, lg, xl)
- **Interactive Elements:** Detail buttons, forms, modals using Headless UI/Radix components
- **Loading & Error States:** Specify loading spinners, skeleton screens, and error message patterns
- **Icons:** List required Lucide React icons from `src/shared/assets`
- **Animations:** Define any Framer Motion animations needed

8.  **Data Flow & API Integration:**

- **React Query:** Define query keys, API functions in domain `api/` folder, and caching strategies
- **API Endpoints:** List REST endpoints and their purposes
- **Data Fetching Strategy:** Describe when to use useQuery, useMutation, etc.
- **Zustand Store:** Define store structure in `src/shared/store` if global state is needed
- **Form State:** Specify React Hook Form setup and Zod validation schemas in `src/shared/lib/validations.ts`

9.  **Non-Goals (Out of Scope):** Clearly state what this React feature will _not_ include to manage scope.

10. **Technical Implementation:**

    - **Dependencies:** List specific npm packages to install with yarn
    - **File Structure:** Specify exact file locations using the standard folder structure with domains and shared folders
    - **Performance:** Mention React optimization techniques (memo, useMemo, useCallback)
    - **Accessibility:** Specify ARIA attributes and keyboard navigation patterns
    - **Testing Strategy:** Define Vitest unit tests, React Testing Library tests, and Playwright E2E tests
    - **Vite Configuration:** Specify any Vite plugins or build configurations needed

11. **Success Metrics:** How will the success of this React feature be measured? (e.g., "Reduce form abandonment by 15%", "Improve page load time to under 2 seconds").

12. **Implementation Checklist:**

    - **Component Files:** List all component files to create with their paths in domains or components
    - **Hook Files:** List all custom hooks with their paths in domain or `src/shared/hooks`
    - **Type Files:** List all TypeScript definition files in domain or `src/shared/types`
    - **Test Files:** List all test files to create
    - **API Functions:** List all API utility functions in domain `api/` folders
    - **Store Setup:** Define Zustand store files in `src/shared/store` if needed
    - **Shared Utilities:** List any utilities to add to `src/shared/lib`

13. **Code Examples:**

    - **Component Signature:** Provide TypeScript component signature examples
    - **API Function:** Show example API function using React Query
    - **Zod Schema:** Provide example validation schema
    - **Test Cases:** Show example test case structure

14. **Open Questions:** List any remaining questions or areas needing further clarification.

## Target Audience

Assume the primary reader of the PRD is a **junior React developer**. Therefore, requirements should be explicit, unambiguous, and follow the established tech stack. Provide enough detail for them to understand:

- Which React patterns to use (hooks, context, component composition)
- How to structure components using TypeScript
- When to use Zustand vs local state vs React Query
- How to implement forms with React Hook Form and Zod
- What Tailwind classes and Headless UI components to use
- Expected file structure following the domain-driven design with shared utilities
- Testing approach using Vitest and React Testing Library
- How to organize code within domains vs shared folders

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/tasks/`
- **Filename:** `prd-react-[feature-name].md`

## Final Instructions

1. Do NOT start implementing the React component or writing code
2. Make sure to ask the user clarifying questions specific to the established tech stack
3. Focus on TypeScript interfaces, component design, React Query integration, and Tailwind styling
4. Always specify exact file paths using the domain-driven folder structure with shared utilities
5. Include specific npm packages to install with yarn
6. Take the user's answers to the clarifying questions and improve the PRD with tech-stack-specific details
7. Ensure the PRD provides clear guidance using React 19, TypeScript, Tailwind, Vite, and the established toolchain
8. Include concrete code examples for TypeScript interfaces, component signatures, and API functions
9. Specify whether components belong in domains or shared folders based on reusability
