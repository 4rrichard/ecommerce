import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

import dotenv from "dotenv";

dotenv.config();

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  define: {
    __URL__: `"${process.env.URL}"`,
  },
});
