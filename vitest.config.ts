import { configDefaults, defineConfig } from "vitest/config";  

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
    
    // Performance optimization  
    isolate: true,  
    
    // Longer timeout for complex tests  
    testTimeout: 10000,  
    
    // Coverage configuration  
    coverage: {  
      provider: 'v8', // More modern coverage provider  
      reporter: ['text', 'json', 'html'],  
      exclude: [  
        // Build and config files  
        'dist/**',  
        'generators/**',  
        '*.config.*',  
        '*.mjs',  
        
        // Storybook files  
        '.storybook/**',  
        '**/*.stories.tsx',  
        
        // Type definitions  
        '**/*.d.ts',  
        '*/shared/types/**',  
        '**/*.types.ts',  
        '**/*.schema.ts',  
        
        // Test files  
        '**/*.test.ts',  
        '**/*.test.tsx',  
        
        // App structure files  
        '**/*.context.**',  
        '**/index.ts',  
        'src/main.tsx',  
        'src/shared/services/queryClient.ts',  
      ],  
      // Minimum coverage thresholds  
      thresholds: {  
        statements: 70,  
        branches: 70,  
        functions: 70,  
        lines: 70,  
      }  
    },  
    
    // Better test reporting  
    reporters: ['default', 'html'],  
  },  
});