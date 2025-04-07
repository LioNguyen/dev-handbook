// Import required modules
import js from "@eslint/js"; // Standard JavaScript ESLint module
import globals from "globals"; // Global variables definitions
import reactHooks from "eslint-plugin-react-hooks"; // Plugin for React Hooks rules
import reactRefresh from "eslint-plugin-react-refresh"; // Plugin for React Fast Refresh support
import tseslint from "typescript-eslint"; // ESLint plugin for TypeScript

export default tseslint.config(
  // Directory ignore configuration
  { ignores: ["dist", "html", "node_modules", "build", ".git", "*.config.js"] }, // Ignore these files and directories

  // Base configuration for all files
  {
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      globals: {
        ...globals.browser, // Add browser global variables
        ...globals.node, // Add Node.js global variables
      },
    },
  },

  // Configuration for TypeScript files
  {
    files: ["**/*.{ts,tsx}"], // Apply to .ts and .tsx files
    extends: [
      js.configs.recommended, // Inherit recommended JavaScript configuration
      ...tseslint.configs.recommended, // Inherit recommended TypeScript rules
      ...tseslint.configs.stylistic, // Add TypeScript formatting rules
    ],
    plugins: {
      "react-hooks": reactHooks, // Add React Hooks checking plugin
      "react-refresh": reactRefresh, // Add React Refresh support plugin
    },
    rules: {
      // React rules
      ...reactHooks.configs.recommended.rules, // Add all recommended React Hooks rules
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }], // Rules for Fast Refresh

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn about unused variables
      "@typescript-eslint/no-explicit-any": "warn", // Warn when using any type
      "@typescript-eslint/explicit-function-return-type": "off", // Turn off required function return types
      "@typescript-eslint/ban-ts-comment": "warn", // Warn when using ts-comments
      "@typescript-eslint/no-empty-object-type": "off",

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }], // Warn when using console
      "prefer-const": "warn", // Encourage using const
      "no-duplicate-imports": "error", // Error on duplicate imports
    },
  },

  // Configuration for JavaScript files (if needed)
  {
    files: ["**/*.{js,jsx}"], // Apply to .js and .jsx files
    extends: [js.configs.recommended], // Inherit recommended JavaScript configuration
    plugins: {
      "react-hooks": reactHooks, // Add React Hooks checking plugin
      "react-refresh": reactRefresh, // Add React Refresh support plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Add all recommended React Hooks rules
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }], // Rules for Fast Refresh
    },
  },
);
