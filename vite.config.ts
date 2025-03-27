import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@designSystem", replacement: "/designSystem" },
      { find: "@public", replacement: "/public" },
      { find: "@", replacement: "/src" },
      { find: "@shared", replacement: "/src/shared" },
    ],
  },
});