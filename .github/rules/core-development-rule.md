# Core Development Rules for React Boilerplate

## Overview

This document establishes the fundamental development principles and standards for the React Boilerplate project. These rules ensure consistency, maintainability, and scalability across the modern React application built with Vite, TypeScript, and contemporary tooling.

## ⚠️ CRITICAL: Modern React Application Scope

**THIS IS A MODERN REACT APPLICATION REPOSITORY. All development activities must focus on frontend implementation using modern tools and practices.**

### Repository Scope Definition:

- **React Application**: Single-page application with React 19, TypeScript, and Vite
- **Component Libraries**: Reusable UI components following atomic design principles
- **Modern Tooling**: Bun package manager, Vite bundler, Vitest testing, Playwright E2E
- **API Integration**: Frontend service layers that consume external APIs
- **State Management**: Zustand for state management, React Query for server state

### Explicitly Out of Scope:

- Backend API development or implementation
- Database design, queries, or management
- Server-side business logic
- Backend infrastructure or DevOps
- Server-side authentication systems
- Backend data processing or analytics

## Table of Contents

- [Core Development Rules for React Boilerplate](#core-development-rules-for-react-boilerplate)
  - [Overview](#overview)
  - [⚠️ CRITICAL: Modern React Application Scope](#️-critical-modern-react-application-scope)
    - [Repository Scope Definition:](#repository-scope-definition)
    - [Explicitly Out of Scope:](#explicitly-out-of-scope)
  - [Table of Contents](#table-of-contents)
  - [Core Principles](#core-principles)
    - [Modern React Development Approach](#modern-react-development-approach)
    - [Documentation as Critical Infrastructure](#documentation-as-critical-infrastructure)
    - [Component-First Thinking](#component-first-thinking)
  - [🔥 Critical Rules (ALWAYS Follow)](#-critical-rules-always-follow)
    - [1. Build Validation Before Task Completion](#1-build-validation-before-task-completion)
    - [2. Documentation-First Development](#2-documentation-first-development)
    - [3. Critical Documentation Review](#3-critical-documentation-review)
  - [🏗️ React Architecture Rules](#️-react-architecture-rules)
    - [9. Component Library Management](#9-component-library-management)
    - [10. Domain Boundary Management](#10-domain-boundary-management)
  - [📋 Code Quality Standards for React](#-code-quality-standards-for-react)
  - [Related Guidelines](#related-guidelines)

## Core Principles

These rules establish a **modern React, documentation-driven, component-aware development approach** that ensures scalability, maintainability, and knowledge retention across the React Boilerplate project. This workspace follows a domain-driven architecture with atomic design principles for component organization.

> 📁 **For navigation and folder overview**, see [`../documents/index.md`](../documents/index.md)

### Modern React Development Approach

**All development activities must focus on modern React implementation, with backend services treated as external dependencies.**

- **API Integration Focus**: Treat backend APIs as external services to be consumed
- **Frontend Service Layers**: Build robust frontend service layers using React Query for API communication
- **Client-Side Logic**: Implement business logic on the frontend where appropriate
- **Modern React Patterns**: Use functional components, hooks, and modern React patterns
- **Performance Optimization**: Optimize for frontend performance using React best practices

### Documentation as Critical Infrastructure

In a modern React application, documentation is not optional—it's critical infrastructure that enables:

- **Component Reusability**: Clear documentation for component usage and APIs
- **Domain Knowledge**: Proper understanding of business logic and data flow
- **State Management**: Understanding of state management patterns and data flow
- **Knowledge Preservation**: Institutional memory for complex architectural decisions

### Component-First Thinking

Every development decision must consider:

- **Component Boundaries**: Which components are affected and how they interact
- **Reusability**: Can this component be reused across different domains
- **Composition**: How components compose together to build features
- **Performance**: Impact on bundle size and runtime performance

## 🔥 Critical Rules (ALWAYS Follow)

### 1. Build Validation Before Task Completion

**ALWAYS run build to verify no errors before completing any step:**

- **Pre-completion Check**: Execute `bun run build` before marking any task as complete
- **Error Resolution**: If build fails, immediately investigate and fix all compilation errors
- **Type Safety**: Ensure TypeScript compilation passes without errors or warnings
- **Bundle Verification**: Confirm production build generates successfully
- **Dependency Check**: Verify all imports and dependencies resolve correctly

**Build Validation Process:**

1. Run `bun run type-check` to verify TypeScript compliance
2. Execute `bun run lint` to ensure code quality standards
3. Run `bun run build` to verify production compilation
4. If any step fails, stop work and resolve errors immediately
5. Never commit code that doesn't pass the complete build process
6. Document any build configuration changes in technical architecture

**Critical Build Commands:**

- `bun run type-check`: TypeScript validation
- `bun run lint`: Code quality verification
- `bun run build`: Production build verification
- `bun run test:run`: Unit test validation

### 2. Documentation-First Development

**ALWAYS document first, for every task:**

- **Scan existing documents** in `.github/documents/` before starting any task
- **Use relevant information** from existing documentation and update with latest requirements
- **If no relevant documents exist**, write documentation before coding
- **Update documentation** as requirements evolve during development
- **Consider component impact** when documenting features that affect multiple domains

**Implementation Process:**

1. Search `.github/documents/` for relevant existing documentation
2. Review and analyze existing content for applicability across domains
3. Update existing documents OR create new ones as needed
4. Consider impact on component library and shared utilities
5. Proceed with implementation only after documentation is complete

### 3. Critical Documentation Review

**BE CRITICAL AND STRICT on all documents:**

- **Quality Control**: Every document must meet high standards for clarity, accuracy, and completeness
- **Technical Accuracy**: Verify technical details work with the current tech stack
- **Completeness Check**: Ensure all necessary information is included for the project context
- **Consistency Review**: Maintain consistent formatting, terminology, and structure across all documents
- **Architecture Alignment**: Ensure documentation aligns with React application architecture principles

**Critical Review Process:**

1. Review document for technical accuracy across all components
2. Verify all code examples, configurations, and procedures work with Vite/React/TypeScript
3. Check cross-references and ensure all links work
4. Validate that document serves its intended purpose for the React architecture
5. Update or reject documents that don't meet quality standards

## 🏗️ React Architecture Rules

### 9. Component Library Management

**ALWAYS consider component reusability for cross-domain features:**

- **Evaluate reusability**: Determine if functionality should be in shared components vs. domain-specific
- **Atomic design**: Follow atoms, molecules, organisms, templates pattern
- **API design**: Design component APIs for flexibility and backward compatibility
- **Performance considerations**: Consider bundle size impact and lazy loading strategies
- **Documentation**: Maintain clear documentation of component usage and props

**Component Decision Framework:**

1. **Assess reusability**: Will this be used by multiple domains?
2. **Evaluate complexity**: Is the shared implementation worth the coordination overhead?
3. **Consider coupling**: Will sharing create unwanted dependencies between domains?
4. **Plan maintenance**: How will updates be managed across usages?
5. **Document decisions**: Record rationale for sharing vs. duplicating

### 10. Domain Boundary Management

**ALWAYS maintain clear domain boundaries:**

- **Define ownership**: Each feature should have a clear owning domain
- **Minimize cross-domain dependencies**: Prefer loose coupling through well-defined interfaces
- **Shared state management**: Use appropriate patterns for cross-domain state sharing
- **Clear interfaces**: Define and document APIs between domains
- **Component composition**: Use composition patterns to avoid tight coupling

**Domain Boundary Guidelines:**

1. **Identify primary owner**: Which domain is primarily responsible for this feature?
2. **Define interfaces**: What data/functionality needs to be shared?
3. **Choose communication pattern**: Props, context, or global state?
4. **Plan component structure**: How do components compose together?
5. **Document boundaries**: Clear documentation of what belongs where

## 📋 Code Quality Standards for React

**ALWAYS maintain high code quality across the application:**

- **Consistent patterns**: Use consistent coding patterns across all domains
- **Modern tooling**: Leverage Bun, Vite, Vitest, and Playwright effectively
- **Type safety**: Maintain strict TypeScript usage across all components
- **Performance monitoring**: Monitor bundle sizes and loading performance
- **Testing standards**: Comprehensive test coverage including component and E2E tests

**Quality Assurance Process:**

1. **Code review**: All changes reviewed for quality and architectural alignment
2. **Automated testing**: Comprehensive test coverage including unit and E2E tests
3. **Performance testing**: Regular performance audits for bundle size and runtime
4. **Type checking**: Strict TypeScript enforcement across the codebase
5. **Documentation updates**: Code changes accompanied by documentation updates

## Related Guidelines

For detailed guidelines on specific development processes, refer to:

- **PRD Creation**: See `.github/documents/guidelines/1-create-prd.md`
- **Task Generation**: See `.github/documents/guidelines/2-generate-tasks.md`
- **Task Management**: See `.github/documents/guidelines/3-process-task-list.md`

---

**Remember**: These core rules form the foundation of our React development approach. They ensure that we maintain system coherence while enabling independent development across domains. Every decision should be evaluated against these principles to ensure we're building a scalable, maintainable system.
