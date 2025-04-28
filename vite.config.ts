import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
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
      "@": resolve(__dirname, "src"),
      "@core": resolve(__dirname, "src/core"),
      "@components": resolve(__dirname, "src/components"),
      "@shared": resolve(__dirname, "src/shared"),
      "@assets": resolve(__dirname, "src/assets"),
      "@domains": resolve(__dirname, "src/domains"),
      "@designSystem": resolve(__dirname, "designSystem"),
      "@public": resolve(__dirname, "public"),
    },
  },
});
