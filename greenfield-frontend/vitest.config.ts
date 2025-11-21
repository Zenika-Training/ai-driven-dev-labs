import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    include: ["**/tests/**/*.test.ts", "**/tests/**/*.test.tsx"],
  },
});
