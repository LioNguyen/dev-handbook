export const domainGenerator = {
  description: "Create a new domain with context, services, and types",
  prompts: [
    {
      type: "input",
      name: "name",
      message: 'What is the name of the domain? (singular form, e.g., "user")',
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }
        return "Domain name is required";
      },
    },
  ],
  actions: [
    // Create domain types file
    {
      type: "add",
      path: "src/domains/{{camelCase name}}/{{camelCase name}}.types.ts",
      templateFile: "generators/templates/domain/domain.types.ts.hbs",
    },
    // Create domain services file
    {
      type: "add",
      path: "src/domains/{{camelCase name}}/{{camelCase name}}.services.ts",
      templateFile: "generators/templates/domain/domain.services.ts.hbs",
    },
    // Create domain context file
    {
      type: "add",
      path: "src/domains/{{camelCase name}}/{{camelCase name}}.context.ts",
      templateFile: "generators/templates/domain/domain.context.ts.hbs",
    },
    // Create domain provider file
    {
      type: "add",
      path: "src/domains/{{camelCase name}}/{{camelCase name}}.provider.tsx",
      templateFile: "generators/templates/domain/domain.provider.tsx.hbs",
    },
    // Create domain index file
    {
      type: "add",
      path: "src/domains/{{camelCase name}}/index.ts",
      templateFile: "generators/templates/domain/domain.index.ts.hbs",
    },
  ],
};
