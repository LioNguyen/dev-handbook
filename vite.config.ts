import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      // Exclude the html directory from being processed
      external: [/^\/html\//],
    },
  },
  // Prevent the html folder from being treated as static assets
  publicDir: resolve(__dirname, "public"),
  resolve: {
    alias: {
      "@designSystem": resolve(__dirname, "designSystem"),
      "@public": resolve(__dirname, "public"),
      "@": resolve(__dirname, "src"),
      "@core": resolve(__dirname, "src/core"),
      "@shared": resolve(__dirname, "src/shared"),
    },
  },
});
