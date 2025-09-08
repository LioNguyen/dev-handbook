# Rule: Task List Management and Processing for React Applications

## ⚠️ CRITICAL: Frontend React Application Task Processing

**THIS REPOSITORY IS A REACT APPLICATION. ALL TASKS MUST BE FRONTEND-FOCUSED.**

### Task Scope Restrictions:

- **ONLY Frontend Tasks**: UI development, component creation, frontend state management
- **ONLY Frontend Testing**: Unit tests, integration tests, E2E tests for frontend
- **FORBIDDEN**: Backend API development, database tasks, server infrastructure
- **FORBIDDEN**: Backend testing, server deployment, backend business logic

## Goal

To establish comprehensive guidelines for processing and managing **frontend-only** task lists, tracking progress, and ensuring quality implementation in a React application while maintaining strict adherence to [Core Development Rules](../../rules/core-development-rule.md) and [Technical Architecture Rules](../../rules/technical-architecture-rule.md).

## Core Principles

### Development Standards Compliance

- **ALWAYS follow** [Core Development Rules](../../rules/core-development-rule.md) for all task processing
- **ALWAYS follow** [Technical Architecture Rules](../../rules/technical-architecture-rule.md) for implementation decisions
- **Documentation-first approach**: Ensure all task processing follows documentation-first principles
- **Architecture alignment**: Verify all implementations align with React application architecture standards
- **Component standards**: Enforce React.FC<> with memo usage and proper import organization
- **Track progress** throughout development
- **Validate decisions** against existing documentation
- **Learn from every experience** and update documentation accordingly

## Task Progress Documentation & Tracking

**ALWAYS document task progress in `/features` folder with React domain-aware hierarchical structure:**

### Hierarchical Structure Guidelines

- **Use hierarchical organization**: `/features/{domain}/{module}/{feature}/{task}.md`
- **Domain-specific structure**: Use `auth`, `dashboard`, or `users` as top-level categories
- **Follow naming convention**: `task-description.md` (e.g., `implement-user-profile.md`)
- **Include cross-domain impact analysis**: Document how changes affect other domains
- **Track progress**: Update document with implementation status and cross-domain testing notes
- **Mark completion**: Add completion date and final review when task is finished

#### Folder Structure Benefits

- **Domain**: `auth`, `dashboard`, or `users` for domain-specific features
- **Module**: High-level functional area (e.g., `authentication`, `analytics`, `profile-management`)
- **Feature**: Specific functionality within module (e.g., `user-registration`, `data-visualization`, `user-settings`)
- **Task**: Individual implementation task (e.g., `implement-login-form.md`)
- **Benefits**: Clear domain boundaries, easier navigation, better scalability, logical grouping

### Task Progress Documentation Process

1. **Identify appropriate domain(s) and module** for the task
2. **Update existing document** in `features/{domain}/{module}/{feature}/` folder or create if needed
3. **Document implementation progress** including cross-domain dependencies
4. **Update document throughout implementation** with progress notes
5. **Conduct strict review upon completion** including cross-domain testing
6. **Mark document with completion date** and final status
7. **Date Template Usage**: Run `date +%Y-%m-%d` in terminal first, then use the actual output date for creation and last updated dates in all progress documentation

## Task Validation & Decision Making

**ALWAYS check existing `/features` documentation before implementing tasks:**

### Validation Process

- **Verify rule compliance** before starting any task implementation
- **Search features folder** for similar or duplicate implementations across all domains
- **Analyze implementation history** to understand patterns and previous decisions
- **Consider React component implications** and potential code sharing opportunities
- **Be creative and smart** in deciding whether to implement in shared components vs. domain-specific code
- **Documents are source of truth** - DO NOT always follow prompts blindly
- **Make informed decisions** based on documented history and React architecture
- **Follow Core Development Rules** for all architectural decisions
- **Apply Technical Architecture Rules** for implementation choices
- **Enforce component standards** including React.FC<> with memo and import organization

### Decision Making Framework

1. **Verify rule compliance** by reviewing core development and technical architecture rules
2. **Search `/features` folder** for similar implementations across all domains
3. **Review existing documentation** for context and architectural patterns
4. **Analyze if task aligns** with React principles and previous decisions
5. **Apply Core Development Rules** to validate approach
6. **Follow Technical Architecture Rules** for implementation decisions
7. **Verify component standards** including React.FC<> with memo usage and import organization
8. **Determine optimal implementation location** (shared component vs. domain-specific)
9. **Make creative, informed decision** on implementation approach
10. **Document decision rationale** including architectural considerations and rule compliance
11. **Proceed with implementation** only if justified by documentation review and rule adherence

## Continuous Learning & Improvement

**ALWAYS update documents for every fix and lesson learned:**

### Learning Documentation Process

- **Document every bug fix** with root cause analysis and cross-domain impact
- **Record lessons learned** to prevent repeating mistakes across domains
- **Update relevant documentation** when fixes reveal gaps or improvements
- **Create fix documentation** using the provided template
- **Share learnings** across domain teams through documentation
- **Date Template Integration**: Run `date +%Y-%m-%d` in terminal first, then use the actual output date when documenting fixes and updates

### Fix Documentation Process

1. **Identify the root cause** of the issue and its scope across domains
2. **Document the fix** in `lessons-learned/` folder with cross-domain considerations
3. **Update relevant technical documentation**
4. **Add prevention strategies** to avoid similar issues in all domains
5. **Date Tracking**: Run `date +%Y-%m-%d` in terminal first, then use the actual output date for status change timestamps and progress update dates

## Task Implementation Protocol

### One Sub-task at a Time

- **Do NOT start the next sub-task** until you ask the user for permission and they say "yes" or "y"
- **Focus on single task completion** before moving to the next
- **Verify cross-domain compatibility** before marking complete

### Completion Protocol

When you finish a sub-task:

1. **Immediately mark it as completed** by changing `[ ]` to `[x]`
2. **If all subtasks underneath a parent task are now `[x]`**, follow this sequence:
   - **First**: Run the full test suite (vitest, playwright test, etc.)
   - **Only if all tests pass**: Stage changes (`git add .`)
   - **Clean up**: Remove any temporary files and temporary code before committing
   - **Commit**: Use a descriptive commit message that:
     - Uses conventional commit format (`feat:`, `fix:`, `refactor:`, etc.)
     - Summarizes what was accomplished in the parent task
     - Lists key changes and additions
     - References the task number and PRD context
     - Formats the message as a single-line commit

### Task Status Management

- **Mark tasks complete IMMEDIATELY** after finishing (don't batch completions)
- **Only have ONE task in progress** at any time
- **Complete current tasks** before starting new ones
- **Remove tasks that are no longer relevant** from the list entirely

### Task Completion Requirements

**ONLY mark a task as completed when you have FULLY accomplished it with rule compliance:**

- **Verify rule adherence** before marking any task as complete
- **Confirm component standards** including React.FC<> with memo usage and proper import organization
- **Validate architecture alignment** with technical architecture rules
- If you encounter errors, blockers, or cannot finish, keep the task as in_progress
- When blocked, create a new task describing what needs to be resolved
- Never mark a task as completed if:
  - Tests are failing
  - Implementation is partial
  - You encountered unresolved errors
  - You couldn't find necessary files or dependencies
  - Code doesn't follow established development and architecture rules

## Documentation Standards for Task Management

### Quality Requirements

- **Clear and Concise**: Easy to understand across different domain contexts
- **Up-to-Date**: Reflects current implementation across all domains
- **Comprehensive**: Covers all necessary aspects including cross-domain dependencies
- **Searchable**: Well-organized and cross-referenced across domain boundaries
- **Architecture-Aware**: Clearly indicates which domains are affected

### Template Usage

- **Always use templates** from `templates/` folder for consistency
- **Customize for React components** but maintain core structure
- **Update templates** when patterns emerge from React development usage
- **Include cross-domain impact sections** in all relevant templates

### Folder Structure Standards

- **Features**: Use hierarchical structure `/features/{domain}/{module}/{feature}/{task}.md`
- **Domains**: Organize by `auth`, `dashboard`, or `users`
- **Naming**: Use lowercase with hyphens, include domain prefix when relevant
- **Cross-references**: Link related documents across domain folders
- **Organization**: Group related content logically for easy navigation across the application

## Knowledge Management for React Applications

### Information Retention

- **Document all decisions** with rationale and cross-domain context
- **Preserve institutional knowledge** for future reference across all domains
- **Capture lessons learned** from every fix and improvement with React component implications
- **Maintain architecture decision records** for significant React design choices

### Knowledge Sharing

- **Cross-reference documents** instead of duplicating information across domains
- **Use templates consistently** for easier knowledge transfer across teams
- **Maintain searchable documentation** for quick information retrieval across the application
- **Share architectural patterns** and best practices across domain teams

### React-Specific Knowledge

- **Document component APIs** with clear usage examples and prop interfaces
- **Maintain domain boundary documentation** to guide development decisions
- **Record performance optimization strategies** specific to React components
- **Document state management patterns** and data flow strategies

## Continuous Improvement Process

### Regular Reviews

- **Weekly**: Review lessons learned and update documentation across domains
- **Monthly**: Evaluate documentation effectiveness and update templates for React patterns
- **Quarterly**: Review and refine development rules and React architecture processes

### Success Metrics

- All features have corresponding documentation with cross-domain impact analysis
- Bug fixes include lesson learned documentation with React context
- Documentation updated within 24 hours of changes across all affected domains
- Reduced repeat issues (tracked in lessons-learned) across the entire application
- Clear dependency mapping reduces development blockers across domains
- Domain independence maintained while enabling appropriate code sharing

## Git Workflow Integration

### Commit Standards

- Use conventional commit format for all commits
- Include task references in commit messages
- Ensure commits are atomic and focused
- Test thoroughly before committing with Vitest and Playwright
- Clean up temporary files before committing

### Branch Management

- Create feature branches for significant changes
- Consider impact on multiple domains when branching
- Coordinate merges when changes affect shared components
- Maintain clean commit history

---

**Remember**: In a React application, task management is not just about tracking progress—it's about maintaining system coherence while enabling independent development across domains. Every documented decision and lesson learned contributes to the collective knowledge that makes the entire system more robust and maintainable.
