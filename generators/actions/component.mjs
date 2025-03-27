const TEMPLATE_PATH = "generators/templates/component";

/** @type {Partial<import('plop').PlopGeneratorConfig>} */
const componentGenerator = {
  description: "Generate a component",
  prompts: [
    {
      type: "input",
      name: "componentName",
      message: "Please input component name:",
    },
    {
      type: "input",
      name: "componentPath",
      message: "Please input component path:",
    },
  ],
  actions: function () {
    const defaultActionList = [
      {
        type: "add",
        path: `{{ componentPath }}/{{properCase componentName}}.tsx`,
        templateFile: `${TEMPLATE_PATH}/component.tsx.hbs`,
      },
    ];

    return defaultActionList;
  },
};

/** @type {Partial<import('plop').PlopGeneratorConfig>} */
const storiesGenerator = {
  description: "Generate a component stories",
  prompts: [
    {
      type: "input",
      name: "componentName",
      message: "Please input component name:",
    },
    {
      type: "input",
      name: "storiesPath",
      message: "Please input stories path:",
    },
  ],
  actions: function () {
    const defaultActionList = [
      {
        type: "add",
        path: `{{ storiesPath }}/{{properCase componentName}}.stories.tsx`,
        templateFile: `${TEMPLATE_PATH}/component.stories.tsx.hbs`,
      },
    ];

    return defaultActionList;
  },
};

/** @type {Partial<import('plop').PlopGeneratorConfig>} */
const testGenerator = {
  description: "Generate a component test",
  prompts: [
    {
      type: "input",
      name: "componentName",
      message: "Please input component name:",
    },
    {
      type: "input",
      name: "testPath",
      message: "Please input test path:",
    },
  ],
  actions: function () {
    const defaultActionList = [
      {
        type: "add",
        path: `{{ testPath }}/{{properCase componentName}}.test.tsx`,
        templateFile: `${TEMPLATE_PATH}/component.test.tsx.hbs`,
      },
    ];

    return defaultActionList;
  },
};

export { componentGenerator, storiesGenerator, testGenerator };
