// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Use jsdom for testing React components
    globals: true, // Enable global test functions like `describe` and `it`
    setupFiles: "./src/setupTests.js", // Path to the setup file for global configurations
  },
});
