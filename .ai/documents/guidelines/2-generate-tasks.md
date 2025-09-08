# Rule: Generating Task Lists for React Application Development

## Goal

To guide development teams in breaking down PRDs and requests into manageable, focused **frontend-only** tasks that respect domain boundaries and enable efficient sequential execution while ensuring strict compliance with [Core Development Rules](../../rules/core-development-rule.md) and [Technical Architecture Rules](../../rules/technical-architecture-rule.md).

## ⚠️ CRITICAL: Frontend React Application Scope

**THIS IS A REACT APPLICATION REPOSITORY. NEVER generate backend-related tasks.**

### Explicitly Forbidden:

- Backend API implementation tasks
- Database design or query tasks
- Server-side logic implementation
- Backend infrastructure setup
- Server-side caching mechanisms
- Backend authentication implementation
- Server-side data processing

### Frontend Focus Areas:

- Frontend API integration and service layers
- Client-side data handling and caching with React Query
- UI/UX component development with atomic design
- Frontend state management with Zustand
- Client-side validation and error handling
- Frontend performance optimization
- Browser-based data processing

## Core Principle: React Component-Aware Task Breakdown

**ALWAYS break requests into manageable 4-hour FRONTEND-ONLY tasks with React component considerations while strictly following established development standards:**

### Mandatory Compliance

- **ALWAYS follow** [Core Development Rules](../../rules/core-development-rule.md) for all task generation
- **ALWAYS follow** [Technical Architecture Rules](../../rules/technical-architecture-rule.md) for implementation decisions
- **Documentation-first approach**: Ensure all tasks include documentation requirements as mandated by core development rules
- **Architecture alignment**: Verify all task specifications align with React application architecture standards

### Task Breakdown Principles

1. **Write documentation first** when receiving any request
2. **Break work into focused 4-hour tasks** considering domain boundaries
3. **Identify shared component impacts** and plan accordingly
4. **Execute ONLY these 4-hour tasks** - DO NOT attempt to resolve the full request in one goal
5. **Complete each task fully** before moving to the next one
6. **Consider component composition** and reusability

## Sequential Execution Process

### Task Planning and Prioritization

1. **Understand all tasks and their dependencies** across domains
2. **Prioritize shared component changes first** (as they affect multiple domains)
3. **Execute one task at a time** with full focus
4. **Verify task completion** and cross-domain compatibility
5. **Update documentation** with progress and any cross-domain discoveries

### Task Breakdown Strategy

1. **Domain Boundaries**: Respect separation between `auth`, `dashboard`, and `users` components
2. **Dependency Mapping**: Identify which tasks must be completed before others can begin
3. **Shared Components First**: Prioritize changes to shared components as they impact multiple domains
4. **Component Composition**: Ensure tasks maintain component reusability and composition
5. **Cross-Domain Testing**: Include testing across all affected domains in task planning

## Development Workflow for React Applications

### For New Features

1. **Review Development Rules**: Study [Core Development Rules](../../rules/core-development-rule.md) and [Technical Architecture Rules](../../rules/technical-architecture-rule.md) before task creation
2. **Document First**: Create or update PRD in `requirements/` with cross-domain analysis following documentation-first principles
3. **Task Documentation**: Create individual task documents in `/features/{domain}/{module}/` structure
4. **Architecture Decision**: Determine shared component vs. domain-specific implementation following technical architecture guidelines
5. **Technical Design**: Create or update architecture docs with React component considerations ensuring alignment with established standards
6. **Implementation**: Follow TDD approach with cross-domain testing using React.FC<> with memo standards
7. **Documentation Update**: Reflect any changes made during development across all affected domains

### Domain Presenter Assignment

**ALWAYS assign a domain presenter for each domain module to ensure accountability and coordination:**

1. **Presenter Identification**: Assign a technical lead or senior developer as the domain presenter
2. **Responsibility Scope**: Domain presenter oversees all tasks within their assigned domain
3. **Cross-Domain Coordination**: Presenters coordinate with other domain presenters for dependencies
4. **Quality Assurance**: Domain presenter reviews and approves all tasks within their domain
5. **Documentation Ownership**: Presenter ensures domain documentation stays current and accurate
6. **Knowledge Transfer**: Presenter facilitates knowledge sharing within the domain team

#### Domain Presenter Structure

**Domain-Level Presenters**:

1. **Auth Domain Presenter**: Oversees all authentication-related modules and features
2. **Dashboard Domain Presenter**: Manages dashboard functionality and data visualization
3. **Users Domain Presenter**: Coordinates user management and profile functionality

**Component-Level Presenters** (within each domain):

1. **Atoms Presenter**: Basic UI building blocks (buttons, inputs, typography)
2. **Molecules Presenter**: Composite components (form fields, search components)
3. **Organisms Presenter**: Complex UI sections (navigation, user cards, forms)
4. **Templates Presenter**: Page layouts and structure components

### For Bug Fixes

1. **Investigate**: Understand root cause and cross-domain impact
2. **Document**: Create lesson learned entry with React component context
3. **Fix**: Implement solution considering all affected domains
4. **Update**: Modify relevant documentation across domain boundaries
5. **Prevent**: Add safeguards to prevent recurrence in all domains

### For Shared Component Changes

1. **Impact Analysis**: Document all consuming domains and potential breaking changes
2. **Backward Compatibility**: Ensure changes don't break existing functionality
3. **Component API Design**: Follow atomic design principles for component APIs
4. **Testing**: Comprehensive testing across all consuming domains
5. **Documentation**: Update all relevant documentation and migration guides

### For Cross-Domain Features

1. **Scope Definition**: Clearly define which domains are involved
2. **Coordination Planning**: Plan implementation sequence across domains
3. **Shared Component Design**: Design reusable components when appropriate
4. **Integration Testing**: Comprehensive testing of cross-domain functionality
5. **State Management**: Plan global state management when necessary

## Task Documentation Requirements

### Task Documentation Location

**ALWAYS create task documents in the hierarchical `.ai/documents/features/` folder structure:**

1. **Use hierarchical organization**: `/features/{domain}/{module}/{task}.md`
2. **Domain-specific structure**: Use `auth`, `dashboard`, or `users` as top-level categories
3. **Check existing tasks first**: Before creating new tasks, check the target folder for existing tasks and continue the number sequence from the highest existing number
4. **Follow naming convention**: `{number}-task-description.md` starting from `01` if no tasks exist, or continuing from the next number (e.g., if `03-existing-task.md` exists, create `04-new-task.md`)
5. **Include cross-domain impact analysis**: Document how changes affect other domains
6. **Track progress**: Update document with implementation status and cross-domain testing notes
7. **Assign domain presenter**: Clearly identify the responsible domain presenter for each task
8. **Date Template Integration**: Replace `2025-09-07` template with current date when creating or updating task documents

### Task Documentation Template

**ALWAYS use the standardized task template for consistent documentation while ensuring rule compliance:**

1. **Template Location**: `.ai/documents/templates/2-task-template.md`
2. **Mandatory Usage**: All task documents must follow this template structure and include compliance verification
3. **Rule Compliance**: Each task must explicitly reference adherence to core development and technical architecture rules
4. **Hierarchical Organization**: Place completed task documents in `/features/{domain}/{module}/` structure
5. **Consistent Format**: Ensures all tasks include required sections, rule compliance checks, and information
6. **Progress Tracking**: Template includes built-in progress tracking and completion review sections
7. **Numeric Formatting**: All tasks and subtasks must use numeric bullets (1., 1.1, 1.1.1) for clear hierarchy
8. **Architecture Standards**: Include verification of React.FC<> with memo usage and import organization standards
9. **Date Template Usage**: Run `date +%Y-%m-%d` in terminal first, then use the actual output date for creation and update dates in all task documents

### Task Structure

Each task should include (following the task template with rule compliance):

1. **Rule Compliance Verification**: Explicit confirmation that task follows core development and technical architecture rules
2. **Build Verification Requirements**: Mandatory inclusion of build check steps and error resolution protocols
3. **Styling Standards Compliance**: Verification of Tailwind CSS with shadcn/ui usage and design consistency
4. **Version Compatibility Check**: Documentation of package versions and API compatibility verification
5. **Clear scope definition**: What exactly needs to be implemented and in which domains
6. **Technical specifications**: Components, hooks, state management details, API usage following architecture standards
7. **Component Standards**: Verification of React.FC<> with memo usage and proper import organization
8. **Acceptance criteria**: Specific, measurable outcomes for completion across all affected domains including build success
9. **Testing requirements**: Unit tests, integration tests, cross-domain testing steps
10. **Dependencies**: Prerequisites and blocking/blocked relationships across domains
11. **Estimated effort**: Realistic time estimate with React development complexity justification
12. **Domain presenter assignment**: Designated responsible presenter for oversight and coordination
13. **Numeric task ordering**: Tasks must be numbered sequentially (01, 02, 03, etc.) for clear execution order

### Build and Quality Verification Standards

**Every task MUST include these verification requirements:**

1. **Build Success Criteria**: Task completion requires successful `bun run build` execution
2. **Type Safety Validation**: All TypeScript compilation must pass without errors
3. **Code Quality Standards**: Linting and formatting must pass automated checks
4. **Testing Validation**: Unit tests must pass and maintain coverage standards

### Styling Implementation Standards

**Every UI-related task MUST include:**

1. **Tailwind CSS Usage**: All styling implemented using Tailwind utility classes
2. **shadcn/ui Integration**: Leverage shadcn/ui components for consistent design
3. **Responsive Design**: Test and verify responsive behavior across breakpoints
4. **Accessibility Standards**: Ensure components meet accessibility requirements through Radix primitives
5. **Version Compatibility**: Verify implementation works with current package versions

### Package Version Documentation

**Every task involving external libraries MUST include:**

1. **Version Verification**: Document current package versions from package.json
2. **Documentation Reference**: Link to official docs matching exact versions
3. **API Compatibility**: Verify all used features are supported in current versions
4. **Best Practices**: Follow version-specific implementation recommendations

### Task Sizing Guidelines

1. **4-hour maximum** per task based on mid-level developer capabilities (2-4 years experience)
2. **Include buffer time**: Account for debugging, code review, documentation, and cross-domain testing
3. **Break complex features**: Split large features into logical, independent subtasks
4. **Consider shared component impact**: Map out which tasks affect shared components first
5. **Testing included**: Each subtask must include unit testing and cross-domain integration testing
6. **Performance considerations**: Account for bundle size impact and optimization needs

## React Architecture Considerations

### Shared Component Management

**ALWAYS consider shared component impact for cross-domain features:**

1. **Evaluate component placement** for common functionality
2. **Component API compatibility** across all consuming domains
3. **Breaking change management** with proper deprecation strategies
4. **Documentation of component APIs** with clear usage examples
5. **Testing strategy** that covers all consuming domains

#### Component Library Guidelines

1. **Atoms**: Basic UI building blocks (Button, Input, Typography)
2. **Molecules**: Composite components (SearchInput, FormField, UserAvatar)
3. **Organisms**: Complex UI sections (NavigationBar, ErrorBoundary, ThemeProvider)
4. **Templates**: Page layouts (AuthLayout, DashboardLayout, ProtectedRoute)

### Domain Boundary Management

**ALWAYS respect domain boundaries while enabling appropriate sharing:**

1. **Clear separation of concerns** between `auth`, `dashboard`, and `users` domains
2. **Shared state management** only when truly necessary across domains
3. **Component composition** for flexible and reusable interfaces
4. **Consistent user experience** through shared design systems
5. **Performance optimization** at the component level

#### Domain-Specific Guidelines

1. **Auth**: Authentication and user session management functionality
2. **Dashboard**: Main interface, analytics, and overview features
3. **Users**: User management, profiles, and user-specific functionality

## Task Execution Best Practices

### Task Execution Best Practices

### Build Verification and Quality Gates

**ALWAYS include build verification as final step in every task:**

1. **Pre-completion Build Check**: Every task must include `bun run build` verification as acceptance criteria
2. **Error Resolution Protocol**: If build fails, task is not complete until all errors are resolved
3. **Type Safety Validation**: Include `bun run type-check` in task completion criteria
4. **Quality Gates**: Combine lint, test, and build verification for comprehensive quality assurance

**Build Verification Steps for Every Task:**

```bash
# Required verification commands for task completion
bun run type-check    # TypeScript validation
bun run lint         # Code quality verification
bun run test:run     # Unit test validation
bun run build        # Production build verification
```

### Styling Implementation Standards

**ALWAYS use Tailwind CSS with shadcn/ui for consistent design implementation:**

1. **Primary Styling**: Use Tailwind CSS utility classes for all component styling
2. **Component Foundation**: Leverage shadcn/ui components as building blocks
3. **Design Consistency**: Follow established design tokens and component variants
4. **Accessibility**: Utilize Radix UI primitives through shadcn/ui for accessible components

**Styling Task Requirements:**

- Check current Tailwind CSS version in package.json (v4.1.12)
- Verify Radix UI package versions for compatibility
- Reference official documentation matching exact versions
- Implement using utility-first approach with shadcn/ui components
- Test responsive design across all breakpoints

### Version Compatibility Verification

**ALWAYS verify package versions and fetch current documentation:**

1. **Version Discovery**: Check package.json for exact versions of Tailwind and Radix packages
2. **Documentation Fetching**: Reference official docs matching current version numbers
3. **API Compatibility**: Ensure implementation matches current version capabilities
4. **Best Practices**: Follow version-specific recommendations and patterns

**Version Check Commands:**

```bash
# Check current package versions
grep -E "(tailwindcss|@radix-ui)" package.json

# Current versions in project:
# tailwindcss: ^4.1.12
# @radix-ui/react-dialog: ^1.1.15
# @radix-ui/react-dropdown-menu: ^2.1.16
# @radix-ui/react-slot: ^1.2.3
```

### Sequential Execution

1. **One task at a time**: Complete each task fully before moving to the next
2. **Cross-domain verification**: Test functionality across all affected domains
3. **Documentation updates**: Keep documentation current with each completed task
4. **Dependency resolution**: Ensure prerequisites are met before starting dependent tasks

### Quality Assurance

1. **Test-Driven Development**: Write tests before implementation, including cross-domain integration tests
2. **Code Reviews**: All code must be reviewed with React architecture considerations
3. **Performance Testing**: Verify performance across all affected domains
4. **Accessibility Validation**: Ensure components follow accessibility best practices

## Process Guidelines

### After Task Generation Completion

1. **Review Task List**: Ensure all tasks are properly documented with the task template
2. **Validate Dependencies**: Confirm cross-domain dependencies are properly mapped
3. **Check Estimates**: Verify all tasks are within 4-hour estimates
4. **Plan Implementation**: Prepare for sequential task execution
5. **Proceed to Task Processing**: Continue to the next step by following `3-process-task-list.md`

**Workflow Prompt**: After completing task generation, ask the user: "Would you like to proceed to task list processing using 3-process-task-list.md? (y/n)"

1. [ ] If user responds "yes" or "y": Continue with the task processing workflow using 3-process-task-list.md
2. [ ] If user responds "no" or anything else: Stop at this step and await further instructions

### When Starting from This Guideline

**Workflow Prompt**: When starting directly from this guideline (not from 1-create-prd.md), ask the user: "Would you like to proceed to task list processing using 3-process-task-list.md? (y/n)"

1. [ ] If user responds "yes" or "y": Continue with the task processing workflow using 3-process-task-list.md
2. [ ] If user responds "no" or anything else: Stop at this step and await further instructions

## Success Metrics

1. **Build Quality**: All tasks consistently pass build verification without compilation errors
2. **Styling Consistency**: Uniform design implementation using Tailwind CSS with shadcn/ui across all domains
3. **Version Compatibility**: All implementations work correctly with current package versions
4. **Task Completion**: Tasks consistently completed within 4-hour estimates including verification steps
5. **Dependency Management**: Clear dependency mapping reduces development blockers across domains
6. **Component Integration**: Shared component changes follow proper design and migration strategies
7. **Domain Independence**: Domain boundaries maintained while enabling appropriate code sharing
8. **Cross-Domain Testing**: Integration testing catches compatibility issues early
9. **Documentation Currency**: Documentation stays current with implementation progress
10. **Domain Coordination**: Domain presenters effectively coordinate and oversee their assigned areas
11. **Documentation Standards**: All task documentation follows consistent numeric formatting standards
12. **Quality Assurance**: Comprehensive verification including type checking, linting, testing, and building

---

**Remember**: Effective task generation in a React application requires balancing independence with coordination. Each task should be focused, achievable, and respect the boundaries that make the application scalable and maintainable.
