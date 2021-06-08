import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      "^/api/.*": {
        target: "http://localhost:8000/api/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "^/auth/.*": {
        target: "http://localhost:8000/auth/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
