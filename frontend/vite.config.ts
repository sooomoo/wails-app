import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core", "pinia", "vue-i18n"],
      dts: "types/auto-imports.d.ts",
      dirs: ["./utils", "./components", "./composables"],
    }),
  ],
  appType: "spa",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
});
