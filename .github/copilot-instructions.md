## User Preferences Rules for AI Interaction

### 0. **Project Architecture Compliance**

- **Follow Core Development Rules**: ALWAYS adhere to the principles and guidelines defined in `.ai/rules/core-development-rule.md`
- **Follow Technical Architecture**: ALWAYS follow the technical architecture standards and patterns defined in `.ai/rules/technical-architecture-rule.md`
- **Critical Rules Priority**: These architectural documents take precedence over general preferences when conflicts arise
- **Documentation-First**: Follow the documentation-first development approach mandated in core development rules
- **Build Validation**: Execute build validation process for all code-related tasks as specified in core rules

### 1. **Language & Clarity**

- **Use English**: Respond exclusively in English to ensure clear communication.
- **Be Concise**: Provide straightforward answers, avoiding unnecessary complexity or verbosity in explanations.

### 2. **Commenting & Explanation**

- **Detailed Comments**: Include inline comments in any code examples, especially for key functions and complex logic.
- **Clarify Key Points**: When discussing technical concepts or providing code snippets, explain the rationale behind specific choices.

### 3. **Code Standards & Quality**

- **Follow Best Practices**: Adhere strictly to coding standards and refactoring principles, including:
  - Avoiding unnecessary object copying or cloning.
  - Limiting nesting and encouraging early returns for better readability.
  - Implementing appropriate concurrency control mechanisms.
- **Code Readability**: Ensure code is easy to read and well-structured, following consistent naming conventions and organization.
- **Performance Optimization**: Prioritize efficient algorithms and effective memory use, especially for applications running on Mac systems.

### 4. **Interactive Code Generation**

- **Keep It Manageable**: If generated code exceeds 20 lines, proactively suggest consolidating the code to maintain clarity while ensuring functionality.
- **Request Small Steps**: Encourage the AI to break tasks into smaller, manageable changes, especially for refactoring processes.

### 5. **Error Identification & Suggestions**

- **Highlight Code Smells**: Identify common code smells and request actionable solutions:
  - **Mysterious Names**: Request descriptive naming suggestions.
  - **Duplicate Code**: Seek refactoring suggestions for shared functions.
  - **Long Functions**: Propose decomposition into smaller, single-responsibility functions.
  - Ensure aggressive suggestions on minimizing large classes and nested structures.

### 6. **Test Integration**

- **Push for Test-Driven Changes**: Emphasize the importance of a strong test suite; request examples of test cases when making significant code changes or refactoring.

### 7. **Documentation Standards**

- **Table of Contents**: Always create or update a Table of Contents at the top of any generated or updated documentation.
- **Numeric Headings**: Any documentation generated must follow a numeric structure for headings and subheadings (e.g., `1. Section Title`, `1.1 Sub-section Title`).
- **Comprehensive Style**: Ensure documentation provides thorough explanations that clarify purpose and usage rather than just descriptions of functionality.

### 8. **Learning & Improvement**

- **Foster Learning**: Encourage the AI to provide references or documentation links for suggested practices, enabling further learning and understanding.
- **Suggest Documentation Styles**: Ask for clear explanations of code with a focus on "why" decisions are made.

### 9. **Personalized Assistance**

- **Customized Responses**: Adapt interactions based on individual project needs and context, not relying on generic responses.
- **Question Encouragement**: Prompt the AI to ask clarifying questions if the request seems ambiguous or could be interpreted in multiple ways.

### 10. **Performance Optimization Insights**

- **Focus on Efficiency**: When discussing algorithms or functionalities, prioritize suggestions that enhance performance and memory use, particularly on Mac systems.
- **Parallelization Suggestions**: Actively seek opportunities for optimizing code through parallelization without compromising clarity.

### 11. **Feedback & Iteration**

- **Iterative Learning**: Provide feedback on suggestions to refine future AI behavior and ensure it aligns with personal coding style and effectiveness.
- **Behavior Adjustment**: Adjust the AI’s behavior based on coding context (e.g., prioritize Python tips when working in Python projects and TypeScript tips when in TypeScript).
