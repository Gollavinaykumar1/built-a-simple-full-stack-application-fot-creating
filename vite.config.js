import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/built-a-simple-full-stack-application-fot-creating-a-time-table-all-the-details/",
  build: { outDir: "dist", assetsDir: "assets" },
  server: { port: 3000 },
});
