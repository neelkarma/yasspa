import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      "^/(api)|(auth)": {
        target: `http://localhost:8000`,
        changeOrigin: true,
        secure: false,
      }
    },
  },
});
