import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development";

  return {
    plugins: [react()],
    // base: process.env.NODE_ENV === "production" ? "/kanban-client" : "./",
    build: {
      outDir: "dist",
      rollupOptions: {},
    },
    server: {
      port: 8080,
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./src/infrastructure/tests.setup.ts",
    },
    resolve: {
      alias: {
        app: resolve(__dirname, "src", "app"),
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
        containers: resolve(__dirname, "src", "containers"),
        pages: resolve(__dirname, "src", "pages"),
        types: resolve(__dirname, "src", "types"),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? "[name]__[local]__[hash:base64:5]"
          : "[hash:base64:5]",
      },
    },
    define: {
      "process.env": process.env,
    },
  };
});
