/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "./e2e-tests/**",
      "**/.{idea,git,cache,output,temp}/**",
      "./src/config/**",
    ],
  },
});
