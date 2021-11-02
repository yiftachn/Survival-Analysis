import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { UserConfig, ConfigEnv } from "vite";
import { join } from "path";

const srcRoot = join(__dirname, "src");
const buildRoot = join(__dirname, "dist/vite");

export default ({ command }: ConfigEnv): UserConfig => {
  // DEV
  return {
    base: command === "serve" ? "/" : buildRoot,
    plugins: [eslint(), react(), checker({ typescript: true })],

    alias: {
      "/@": srcRoot
    },
    build: {
      outDir: buildRoot,
      emptyOutDir: true,
      rollupOptions: {}
    },
    server: {
      port: process.env.PORT === undefined ? 3000 : +process.env.PORT
    },
    optimizeDeps: {
      exclude: ["path"]
    }
  };
};
