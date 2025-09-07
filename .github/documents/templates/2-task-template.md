# Request Documentation Template

## Task Breakdown & Implementation

### 4-Hour Task Blocks

**Estimated Total Time**: `[X hours]`

1. **Task 1** (4h): [description]
   1.1 [ ] Subtask 1.1
   1.2 [ ] Subtask 1.2
   1.3 [ ] Subtask 1.3

2. **Task 2** (4h): [description]
   2.1 [ ] Subtask 2.1
   2.2 [ ] Subtask 2.2
   2.3 [ ] Subtask 2.3

3. **Task 3** (4h): [description]
   3.1 [ ] Subtask 3.1
   3.2 [ ] Subtask 3.2
   3.3 [ ] Subtask 3.3

### Dependencies

1. **Required Before Starting**:
   1.1 [ ] Dependency 1
   1.2 [ ] Dependency 2

2. **Blocks Other Work**:
   2.1 [ ] Blocked item 1
   2.2 [ ] Blocked item 2

### Documentation Requirements

1. [ ] Update PRD in `requirements/`
2. [ ] Update technical architecture in `architecture/`
3. [ ] Create/update API documentation
4. [ ] Update user documentation

### Scope & Requirements

1. **Functional Requirements**:
   1.1 [ ] Requirement 1
   1.2 [ ] Requirement 2
   1.3 [ ] Requirement 3

2. **Non-Functional Requirements**:
   2.1 [ ] Performance requirements
   2.2 [ ] Security requirements
   2.3 [ ] Scalability requirements

3. **Out of Scope**:
   3.1 Item 1
   3.2 Item 2

### Final Deliverables

1. [ ] Feature/fix implemented
2. [ ] Tests written and passing
3. [ ] Documentation updated
4. [ ] Code reviewed
5. [ ] Deployed to staging
6. [ ] User acceptance testing completed
7. [ ] Deployed to production

### Success Criteria Met

1. [ ] Primary goal achieved
2. [ ] All functional requirements met
3. [ ] Non-functional requirements satisfied
4. [ ] No critical issues remaining

## Request Information

**Request ID**: `YYYY-MM-DD_task-title`  
**Date Received**: `YYYY-MM-DD HH:MM`  
**Requested By**: `[Name/Role]`  
**Priority**: `[High/Medium/Low]`  
**Status**: `[Pending/In Progress/Completed/Rejected]`  
**Completion Date**: `[YYYY-MM-DD or N/A]`

````markdown
# Request Documentation Template

## Task Breakdown & Implementation

### 4-Hour Task Blocks

**Estimated Total Time**: `[X hours]`

1. **Task 1** (4h): [description]
   1.1 [ ] Subtask 1.1
   1.2 [ ] Subtask 1.2
   1.3 [ ] Subtask 1.3

2. **Task 2** (4h): [description]
   2.1 [ ] Subtask 2.1
   2.2 [ ] Subtask 2.2
   2.3 [ ] Subtask 2.3

3. **Task 3** (4h): [description]
   3.1 [ ] Subtask 3.1
   3.2 [ ] Subtask 3.2
   3.3 [ ] Subtask 3.3

### Dependencies

1. **Required Before Starting**:
   1.1 [ ] Dependency 1
   1.2 [ ] Dependency 2

2. **Blocks Other Work**:
   2.1 [ ] Blocked item 1
   2.2 [ ] Blocked item 2

### Documentation Requirements

1. [ ] Update PRD in `requirements/`
2. [ ] Update technical architecture in `architecture/`
3. [ ] Create/update component documentation
4. [ ] Update user documentation

### Scope & Requirements

1. **Rule Compliance Requirements**:
   1.1 [ ] Follows Core Development Rules
   1.2 [ ] Follows Technical Architecture Rules
   1.3 [ ] Documentation-first approach implemented

2. **Build and Quality Verification**:
   2.1 [ ] TypeScript compilation passes (`bun run type-check`)
   2.2 [ ] Code quality validation passes (`bun run lint`)
   2.3 [ ] Unit tests pass (`bun run test:run`)
   2.4 [ ] Production build succeeds (`bun run build`)

3. **Styling Standards (for UI tasks)**:
   3.1 [ ] Tailwind CSS utility classes used for styling
   3.2 [ ] shadcn/ui components integrated where applicable
   3.3 [ ] Responsive design validated across breakpoints
   3.4 [ ] Accessibility standards met through Radix primitives

4. **Version Compatibility Verification**:
   4.1 [ ] Current package versions documented from package.json
   4.2 [ ] Official documentation referenced for exact versions
   4.3 [ ] API compatibility verified for all used features
   4.4 [ ] Version-specific best practices followed

5. **Functional Requirements**:
   5.1 [ ] Requirement 1
   5.2 [ ] Requirement 2
   5.3 [ ] Requirement 3

6. **Non-Functional Requirements**:
   6.1 [ ] Performance requirements
   6.2 [ ] Accessibility requirements
   6.3 [ ] Security requirements

7. **Out of Scope**:
   7.1 Item 1
   7.2 Item 2

## Package Version Documentation

**Current Versions** (from package.json):

- **Tailwind CSS**: `[check package.json for current version - currently v4.1.12]`
- **Radix UI Dialog**: `[check package.json - currently ^1.1.15]`
- **Radix UI Dropdown**: `[check package.json - currently ^2.1.16]`
- **Radix UI Slot**: `[check package.json - currently ^1.2.3]`

**Documentation References**:

- Tailwind CSS v4.x: `[link to official docs for current version]`
- Radix UI Components: `[link to official docs for current version]`
- shadcn/ui: `[link to official docs for current version]`

**Version Check Commands**:

```bash
# Verify current package versions
grep -E "(tailwindcss|@radix-ui)" package.json

# Check for version-specific documentation
# Reference official docs matching exact versions above
```

### Final Deliverables

1. [ ] Feature/fix implemented following React.FC<> with memo standards
2. [ ] Build verification completed successfully (`bun run build`)
3. [ ] Type checking passed (`bun run type-check`)
4. [ ] Code quality validation passed (`bun run lint`)
5. [ ] Tests written and passing (Vitest + Playwright)
6. [ ] Styling implemented with Tailwind CSS and shadcn/ui
7. [ ] Documentation updated with version compatibility notes
8. [ ] Code reviewed with architecture compliance verification
9. [ ] Component story created (if applicable)
10. [ ] Performance validated and bundle impact assessed
11. [ ] Responsive design tested across breakpoints
12. [ ] Accessibility standards verified

### Success Criteria Met

1. [ ] Primary goal achieved
2. [ ] All functional requirements met
3. [ ] Non-functional requirements satisfied
4. [ ] Build validation completed successfully
5. [ ] Styling standards implemented correctly
6. [ ] Version compatibility verified
7. [ ] No critical issues remaining
8. [ ] Architecture compliance confirmed

## Request Information

**Request ID**: `YYYY-MM-DD_task-title`  
**Date Received**: `YYYY-MM-DD HH:MM` (Run `date +%Y-%m-%d` in terminal first)  
**Requested By**: `[Name/Role]`  
**Priority**: `[High/Medium/Low]`  
**Status**: `[Pending/In Progress/Completed/Rejected]`  
**Completion Date**: `[YYYY-MM-DD or N/A]`

### Hierarchical Organization

**Domain**: `[auth/dashboard/users]`  
**Module**: `[e.g., authentication, analytics, profile-management]`  
**Task**: `[e.g., 01-implement-login-form]`  
**File Location**: `/features/{domain}/{module}/{task}.md`  
**Domain Presenter**: `[Name and role of assigned domain presenter]`

## Request Details

### Original Request

```
[Paste the exact original request here]
```

### Request Summary

[Brief 1-2 sentence summary of what is being requested]

### Expected Outcomes

1. **Primary Goal**: [What should be achieved]
2. **Success Criteria**: [How to measure success]
3. **Deliverables**: [What will be delivered]

## Analysis & Decision

### Similar Requests Review

**Checked Features Folder**: `[Date checked]` (Run `date +%Y-%m-%d` in terminal first)

**Existing Tasks Review**:

1. **Folder Path Checked**: `/features/{domain}/{module}/`
2. **Highest Existing Task Number**: `[e.g., 03 or N/A if no tasks exist]`
3. **Next Task Number**: `[e.g., 04 or 01 if no tasks exist]`

**Similar Requests Found**:

1. No similar requests found
2. Similar request: `[filename]` - `[brief description]`
3. Duplicate request: `[filename]` - `[action taken]`

### Decision Rationale

**Implementation Decision**: `[Implement/Reject/Modify/Defer]`

**Reasoning**:

1. Factor 1: [explanation]
2. Factor 2: [explanation]
3. Factor 3: [explanation]

**Alignment with Project Goals**:

1. Aligns with current roadmap
2. Supports business objectives
3. Fits React application architecture
4. Resource availability confirmed

### Creative Analysis

**Alternative Approaches Considered**:

1. **Option 1**: [description] - [pros/cons]
2. **Option 2**: [description] - [pros/cons]
3. **Recommended Approach**: [description and justification]

## Progress Tracking

### Implementation Log

**[YYYY-MM-DD HH:MM]** - Started implementation (Run `date +%Y-%m-%d` in terminal first)

1. Initial setup completed
2. [Progress notes]

**[YYYY-MM-DD HH:MM]** - Task 1 completed

1. [What was accomplished]
2. [Any issues encountered]
3. [Next steps]

**[YYYY-MM-DD HH:MM]** - Task 2 in progress

1. [Current status]
2. [Blockers or challenges]

### Issues & Resolutions

| Date       | Issue               | Resolution     | Impact               |
| ---------- | ------------------- | -------------- | -------------------- |
| YYYY-MM-DD | [Issue description] | [How resolved] | [Impact on timeline] |

### Changes from Original Plan

- **Change 1**: [description] - **Reason**: [why changed]
- **Change 2**: [description] - **Reason**: [why changed]

### Lessons Learned

**What Went Well**:

1. Point 1
2. Point 2

**What Could Be Improved**:

1. Point 1
2. Point 2

**Knowledge Gained**:

1. Learning 1
2. Learning 2

### Post-Implementation Notes

**Performance Impact**: [description]
**User Feedback**: [summary]
**Bundle Size Impact**: [impact on build output]
**Future Considerations**: [items for future enhancement]

## Related Documentation

1. **PRD**: `[link to requirements document]`
2. **Technical Design**: `[link to architecture document]`
3. **Component Documentation**: `[link to component docs]`
4. **Test Documentation**: `[link to test specs]`
5. **Lessons Learned**: `[link to lessons learned document]`

---

**Document Created**: `[YYYY-MM-DD]` (Run `date +%Y-%m-%d` in terminal first)  
**Last Updated**: `[YYYY-MM-DD]` (Run `date +%Y-%m-%d` in terminal first)  
**Next Review**: `[YYYY-MM-DD or N/A]`

---

## Template Usage Notes

1. **File Organization**: Place file in `/features/{domain}/{module}/` folder
2. **File Naming**: Use descriptive format `{number}-task-description.md` (e.g., `01-implement-login-form.md`, `02-create-user-profile.md`)
3. **Domain Selection**: Choose appropriate domain (`auth`, `dashboard`, or `users`)
4. **Module Selection**: Choose appropriate high-level functional area within the domain
5. **Task Organization**: Organize tasks within the module folder structure
6. **Domain Presenter Assignment**: Assign and document the responsible domain presenter
7. **Numeric Formatting**: Use numeric bullets (1., 1.1, 1.1.1) for all lists and hierarchical structures
8. **Task Numbering**: Check existing tasks in the target folder first, then use sequential numbering starting from 01 if no tasks exist, or continue from the next available number (e.g., if 03-existing-task.md exists, create 04-new-task.md)
9. **Status Updates**: Update status and progress log regularly
10. **Completion**: Mark completion date when all deliverables are done
11. **Review**: Conduct thorough review before marking as completed
12. **Archive**: Keep completed requests for historical reference

**Hierarchical Structure Benefits**:

1. **Improved Organization**: Logical grouping by domain and module
2. **Easier Navigation**: Clear folder structure for finding related requests
3. **Better Scalability**: Structure grows naturally with project complexity
4. **Enhanced Maintenance**: Related tasks grouped together for easier updates
5. **Domain Presenter Accountability**: Clear ownership and responsibility for each domain
6. **Sequential Task Execution**: Numeric task ordering ensures clear execution sequence
7. **Consistent Formatting**: Numeric bullets provide clear hierarchy and readability

**Remember**: This document is the source of truth for the request. Be thorough, accurate, and keep it updated throughout the implementation process.
````

**Remember**: This document is the source of truth for the request. Be thorough, accurate, and keep it updated throughout the implementation process.
