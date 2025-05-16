import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: [
        {
          src: "pages",
          path: "",
          // override globals
          exclude: (excluded) => excluded,
          filePatterns: (filePatterns) => filePatterns,
          extensions: (extensions) => extensions,
        },
      ],
      // what files should be considered as a pages
      extensions: [".vue"],

      // what files to include
      filePatterns: ["**/*"], // files to exclude from the scan
      exclude: [],

      // where to generate the types
      dts: "types/typed-router.d.ts",

      // how to generate the route name
      // getRouteName: (routeNode) => getFileBasedRouteName(routeNode),

      // default language for <route> custom blocks
      routeBlockLang: "json5",

      // how to import routes, can also be a string
      importMode: "async",

      // where are paths relative to
      root: process.cwd(),

      // options for the path parser
      // pathParser: {
      //   // should `users.[id]` be parsed as `users/:id`?
      //   dotNesting: true,
      // },

      // modify routes individually
      // async extendRoute(route) {
      // },

      // modify routes before writing
      // async beforeWriteFiles(rootRoute) {
      // },
    }),
    vue(), // Vue must be placed after VueRouter()
    AutoImport({
      imports: [
        "vue",
        // "vue-router",
        "@vueuse/core",
        "pinia",
        "vue-i18n",
        VueRouterAutoImports,
      ],
      dts: "types/auto-imports.d.ts",
      dirs: ["utils", "components", "composables"],
    }),
  ],
  appType: "spa",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
});
