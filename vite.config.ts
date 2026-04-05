import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    // Only preload the main entry. Lazy chunks are fetched on demand.
    modulePreload: {
      polyfill: false,
      resolveDependencies: (_filename, deps, { hostType }) => {
        if (hostType !== "html") return deps;
        // Keep preloading tiny/critical deps (react-vendor, i18n, the CSS).
        // Drop motion/radix/icons/forms/query from modulepreload so they
        // don't compete with first paint on mobile.
        const allow = new Set(["react-vendor", "i18n"]);
        return deps.filter((d) =>
          // Keep any chunk whose filename starts with an allow-listed prefix
          Array.from(allow).some((a) => d.split("/").pop()!.startsWith(a + "-"))
        );
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core: React runtime + router. Must load for first paint.
          "react-vendor": ["react", "react-dom", "wouter"],
          // i18n: small; kept in its own chunk loaded at app init
          "i18n": ["i18next", "react-i18next"],
          // Everything below is lazy-loaded (modals / below-fold sections)
          "motion": ["framer-motion"],
          "query": ["@tanstack/react-query"],
          "forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          // Note: @radix-ui/react-slot is used by Button (initial chunk),
          // so we leave it out of the lazy radix group.
          "radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-label",
            "@radix-ui/react-toast",
          ],
          "icons": ["lucide-react"],
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
