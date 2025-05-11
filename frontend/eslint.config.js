import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier"; // 新增：Prettier 兼容配置

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: { globals: { ...globals.browser } },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
  // 自定义规则覆盖
  {
    rules: {
      semi: ["error", "always"], // 强制语句末尾使用分号
      indent: [
        "error",
        4,
        {
          // 2 空格缩进
          SwitchCase: 1, // case 子句缩进 1 级（2 空格）
        },
      ],
      "@typescript-eslint/no-unused-vars": "error", // 关闭未使用变量检查
      "@typescript-eslint/no-var-requires": "warn", // 允许使用 require()
      "@typescript-eslint/no-explicit-any": "error", // 允许使用 any 类型
      "@typescript-eslint/no-this-alias": "warn", // 允许 this 别名
      "no-debugger": "warn", // 允许 debugger 语句

      // ----- Vue 专用规则 -----
      "vue/multi-word-component-names": [
        // 组件名必须多单词
        "error",
        {
          ignores: ["Index", "Header", "App"], // 允许例外的组件名
        },
      ],
      "vue/no-unused-vars": "error", // 关闭 Vue 未使用变量检查
      "vue/no-template-shadow": "warn", // 允许模板变量遮蔽
      "vue/require-v-for-key": "error", // 关闭 v-for 必须带 key 的检查
      "vue/no-textarea-mustache": "warn", // 允许 textarea 使用 mustache
      "vue/no-v-html": "warn", // 允许使用 v-html（注意 XSS 风险）
    },
  },
  prettierConfig,
]);
