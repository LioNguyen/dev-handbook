import { configDefaults, defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@public", replacement: "/public" },
      { find: "@designSystem", replacement: "/designSystem" },
    ],
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["src/setupTest.ts"],
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
    coverage: {
      exclude: [
        "dist/**",
        "generators/**",
        "*.config.*",
        "*.mjs",
        ".storybook/**",
        "**/*.stories.tsx",
        "**/*.d.ts",
        "*/shared/types/**",
        "**/*.types.ts",
        "**/*.schema.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.context.**",
        "**/index.ts",
        "src/main.tsx",
        "src/shared/services/queryClient.ts",
      ],
    },
  },
});
