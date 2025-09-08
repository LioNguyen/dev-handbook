# Rule: Creating Product Requirements Documents (PRDs) for React Applications

## ⚠️ CRITICAL: Frontend React Application PRD Scope

**THIS REPOSITORY IS A REACT APPLICATION. PRDs MUST ONLY COVER FRONTEND FEATURES AND INTEGRATIONS.**

### PRD Scope Restrictions:

- **ONLY Frontend Features**: UI components, user interactions, frontend state management
- **ONLY Frontend Integrations**: API consumption, external service integration from frontend
- **FORBIDDEN**: Backend APIs, database design, server infrastructure, backend business logic
- **FORBIDDEN**: Authentication servers, backend microservices, data processing systems

## Goal

To guide development teams in creating detailed Product Requirements Documents (PRDs) for **frontend-only** React application features that prioritize simplicity, user value, and efficient implementation while ensuring strict compliance with [Core Development Rules](../../rules/core-development-rule.md) and [Technical Architecture Rules](../../rules/technical-architecture-rule.md).

## Core Philosophy

**ALWAYS prioritize simplicity and user value when writing PRDs with modern React considerations while strictly following established development standards:**

### Mandatory Compliance

- **ALWAYS follow** [Core Development Rules](../../rules/core-development-rule.md) for all PRD development
- **ALWAYS follow** [Technical Architecture Rules](../../rules/technical-architecture-rule.md) for implementation decisions
- **Documentation-first approach**: Write documentation before coding as mandated by core development rules
- **Architecture alignment**: Ensure all PRD specifications align with React application architecture standards

### Development Philosophy

- **Start with simple user stories** that can be quickly implemented across relevant domains
- **Think out of the box** to provide real, tangible value through modern React architecture
- **Avoid over-complexity** - resist the urge to build elaborate cross-domain systems when simple solutions suffice
- **Follow "MAKE IT WORK FIRST, MAKE IT PERFECT LATER"** philosophy for all feature development
- **Focus on fast implementation** and user value over perfect component architecture initially
- **Prioritize functionality** that users can interact with immediately in their specific domain context

## PRD Writing Guidelines for React Features

### User-Centric Approach

- **User-centric approach**: Every feature must solve a real user problem within the application context
- **Iterative improvement**: Build basic functionality first, then enhance based on user feedback
- **Quick wins**: Prefer features that can be implemented quickly within single domains
- **Practical solutions**: Choose pragmatic approaches over theoretically perfect but complex cross-domain solutions
- **Value-driven development**: Measure success by user value delivered, not architectural sophistication

### Implementation Strategy

- **Minimum Viable Feature (MVF)**: Define the smallest possible implementation that delivers user value
- **Progressive enhancement**: Plan future iterations to improve and expand functionality
- **User feedback loops**: Include mechanisms to gather user feedback for continuous improvement
- **Technical debt acceptance**: Accept reasonable technical debt in favor of faster user value delivery
- **Refactoring roadmap**: Plan future refactoring phases after initial user validation

## PRD 4-Hour Task Breakdown for React Development

**ALWAYS break down ALL PRD tasks into 4-hour subtasks considering React development complexity:**

- **Mandatory task breakdown** for every Product Requirements Document (PRD)
- **4-hour maximum** per subtask based on mid-level developer capabilities (2-4 years experience)
- **Include component dependencies mapping** showing task execution order
- **Define priority levels** (High/Medium/Low) for each subtask
- **Detailed acceptance criteria** including component testing requirements
- **Realistic estimates** that account for component development and domain testing

### Task Breakdown Guidelines

- **Include buffer time**: Account for debugging, code review, documentation, and cross-domain testing
- **Break complex features**: Split large features into logical, independent subtasks
- **Consider component impact**: Map out which tasks affect shared components first
- **Testing included**: Each subtask must include unit testing and integration testing
- **Performance considerations**: Account for bundle size impact and optimization needs

### Subtask Documentation Requirements

- **Clear scope definition**: What exactly needs to be implemented and in which domains
- **Technical specifications**: Components, hooks, state management details, API usage
- **Acceptance criteria**: Specific, measurable outcomes for completion across all affected domains
- **Testing requirements**: Unit tests, integration tests, component testing steps
- **Dependencies**: Prerequisites and blocking/blocked relationships across domains
- **Estimated effort**: Realistic time estimate with React development complexity justification

## React Application Context

### Domain Boundaries

When writing PRDs, consider the main domains in the React Boilerplate:

- **Auth**: Authentication and user management functionality
- **Dashboard**: Dashboard and analytics features
- **Users**: User management and profile functionality

### Component Considerations

- **Shared Component Impact**: Evaluate if features should be implemented in shared component library
- **Atomic Design**: Consider component hierarchy (atoms, molecules, organisms, templates)
- **Reusability**: Ensure components can be reused across different domains
- **Performance Optimization**: Consider bundle size impact and lazy loading strategies
- **Accessibility**: Ensure components follow accessibility best practices

### PRD File Naming Convention

**MANDATORY**: All PRD files must follow the naming convention `[number]-[descriptive-name]-prd.md`

- **Examples**: `1-user-authentication-prd.md`, `2-dashboard-analytics-prd.md`, `3-user-profile-prd.md`
- **Purpose**: The `-prd` suffix clearly identifies Product Requirements Documents in the file system
- **Consistency**: This naming convention ensures easy identification and organization of PRD files

### PRD Date Template

**MANDATORY**: All PRDs must include creation and last updated dates using today's date template:

- **Terminal Date Command**: First run `date +%Y-%m-%d` in terminal to get current date
- **Creation Date**: Use the actual date from terminal command when creating new PRDs
- **Last Updated**: Update with actual date from terminal command when making significant changes
- **Date Format**: Use YYYY-MM-DD format from terminal output (e.g., 2025-09-07)
- **Example Usage**: After running `date +%Y-%m-%d` → `Created: 2025-09-07`
- **Tracking Purpose**: Enables proper version control and document lifecycle management

## Process Guidelines

### Before Writing a PRD

1. **Review Development Rules**: Study [Core Development Rules](../../rules/core-development-rule.md) and [Technical Architecture Rules](../../rules/technical-architecture-rule.md) to ensure compliance
2. **Check Existing PRDs**: Review existing PRDs in `.ai/documents/requirements/` folder to understand current numbering sequence
3. **Sequential Numbering**: Continue PRD numbering from the highest existing number (e.g., if highest is `3-user-management-prd.md`, create `4-new-feature-prd.md`)
4. **Document First**: Create or update PRD in `.ai/documents/requirements/` with cross-domain analysis following documentation-first principles
5. **Use PRD Template**: Start with the standardized PRD template at `.ai/documents/templates/1-prd-template.md`
6. **Set Creation Date**: Run `date +%Y-%m-%d` in terminal first, then use the output date when creating new PRDs
7. **Architecture Decision**: Determine shared component vs. domain-specific implementation following technical architecture guidelines
8. **Technical Design**: Create or update architecture docs with React component considerations ensuring alignment with established standards

### During PRD Development

1. **Maintain Rule Compliance**: Continuously verify adherence to core development and technical architecture rules
2. **Focus on User Value**: Prioritize features that deliver immediate user value
3. **Keep It Simple**: Avoid over-engineering solutions while maintaining architectural standards
4. **Plan Iterations**: Design for progressive enhancement following established patterns
5. **Consider All Domains**: Analyze impact across auth, dashboard, and users domains
6. **Component Standards**: Ensure all React components follow React.FC<> with memo standards from technical architecture rules
7. **Import Organization**: Follow library imports first, alphabetical ordering as specified in technical architecture rules

### After PRD Completion

1. **Review for Simplicity**: Ensure the PRD follows the "make it work first" philosophy
2. **Validate Task Breakdown**: Confirm all tasks are within 4-hour estimates
3. **Check Dependencies**: Verify cross-domain dependencies are properly mapped
4. **Plan Implementation**: Prepare for sequential task execution
5. **Proceed to Task Generation**: Continue to the next step by following `2-generate-tasks.md`

**Workflow Prompt**: After completing the PRD, ask the user: "Would you like to proceed to task generation using 2-generate-tasks.md? (y/n)"

- If user responds "yes" or "y": Continue with the task generation process using 2-generate-tasks.md
- If user responds "no" or anything else: Stop at this step and await further instructions

## Success Metrics

- PRD tasks consistently estimated within 4-hour blocks considering React development complexity
- Clear dependency mapping reduces development blockers across domains
- Features deliver user value quickly with minimal cross-domain complexity
- Progressive enhancement roadmap enables continuous improvement
- Technical debt is managed and planned for future refactoring phases

---

**Remember**: In a React application, PRDs should enable fast user value delivery while maintaining system coherence. Simplicity and user focus are more valuable than architectural perfection.
