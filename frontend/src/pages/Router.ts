import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("./Main.vue") },
    { path: "/about", component: () => import("./About.vue") },
  ],
});
