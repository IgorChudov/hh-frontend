/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  assetsInclude: ["**/*.svg"],
  base: "/hh-frontend/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/shared/testing/setup.tsx",
  },
});
