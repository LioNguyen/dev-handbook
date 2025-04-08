import { resolve } from "path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  publicDir: resolve(__dirname, "public"),
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@core": resolve(__dirname, "src/core"),
      "@shared": resolve(__dirname, "src/shared"),
      "@assets": resolve(__dirname, "src/assets"),
      "@domains": resolve(__dirname, "src/domains"),
      "@designSystem": resolve(__dirname, "designSystem"),
      "@public": resolve(__dirname, "public"),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["src/setupTest.ts"],
    exclude: [...configDefaults.exclude, "tests/e2e/**"],

    // Performance optimization
    isolate: true,

    // Longer timeout for complex tests
    testTimeout: 10000,

    // Coverage configuration
    coverage: {
      provider: "v8", // More modern coverage provider
      reporter: ["text", "json", "html"],
      exclude: [
        // Build and config files
        "dist/**",
        "html/**",
        "generators/**",
        "*.config.*",
        "*.mjs",

        // Storybook files
        ".storybook/**",
        "**/*.stories.tsx",

        // Type definitions
        "**/*.d.ts",
        "*/shared/types/**",
        "**/*.types.ts",
        "**/*.schema.ts",

        // Test files
        "**/*.test.ts",
        "**/*.test.tsx",

        // App structure files
        "**/*.context.**",
        "**/index.ts",
        "src/main.tsx",
        "src/shared/services/queryClient.ts",
      ],
      // Minimum coverage thresholds
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },

    // Better test reporting
    reporters: ["default", "html"],
  },
});
