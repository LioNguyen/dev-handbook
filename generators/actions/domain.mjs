const ROOT_PATH = "src";
const TEMPLATE_PATH = "generators/templates/domain";

/** @type {Partial<import('plop').PlopGeneratorConfig>} */
export const domainGenerator = {
  description: "Generate a domain",
  prompts: [
    {
      type: "input",
      name: "domainName",
      message: "Please input domain name:",
    },
  ],
  actions: function (data) {
    const {} = data;

    const defaultActionList = [
      {
        type: "add",
        path: `${ROOT_PATH}/domains/{{camelCase domainName}}/{{properCase domainName}}.context.tsx`,
        templateFile: `${TEMPLATE_PATH}/domain.context.tsx.hbs`,
      },
      {
        type: "add",
        path: `${ROOT_PATH}/domains/{{camelCase domainName}}/{{properCase domainName}}.hooks.ts`,
        templateFile: `${TEMPLATE_PATH}/domain.hooks.ts.hbs`,
      },
      {
        type: "add",
        path: `test/unit/domains/{{camelCase domainName}}/{{properCase domainName}}.hooks.test.tsx`,
        templateFile: `${TEMPLATE_PATH}/domain.hooks.test.tsx.hbs`,
      },
      {
        type: "add",
        path: `${ROOT_PATH}/domains/{{camelCase domainName}}/{{properCase domainName}}.service.ts`,
        templateFile: `${TEMPLATE_PATH}/domain.service.ts.hbs`,
      },
      {
        type: "add",
        path: `${ROOT_PATH}/domains/{{camelCase domainName}}/{{properCase domainName}}.schema.ts`,
        templateFile: `${TEMPLATE_PATH}/domain.schema.ts.hbs`,
      },
      {
        type: "add",
        path: `${ROOT_PATH}/domains/{{camelCase domainName}}/index.ts`,
        templateFile: `${TEMPLATE_PATH}/domain.index.ts.hbs`,
      },
      {
        type: "add",
        path: `${ROOT_PATH}/domains/{{camelCase domainName}}/{{properCase domainName}}.types.ts`,
        templateFile: `${TEMPLATE_PATH}/domain.types.ts.hbs`,
      },
    ];

    return defaultActionList;
  },
};
