import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 3001,
    proxy: {
      // Proxy all API requests to the backend server
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // Can add more proxy rules here if needed
      // '/socket.io': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   ws: true,
      // },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Environment variables prefixed with VITE_ are automatically exposed to client code
  // No additional configuration needed as we're using VITE_ prefix for client-side env vars
}));
