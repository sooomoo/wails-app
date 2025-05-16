document.documentElement.setAttribute("data-os", getOSType());
document.documentElement.setAttribute("data-theme", "dark");

preventDocumentDefaultEvents();

import App from "./App.vue";
import "./assets/styles/main.scss";
import { EventsOn } from "./wailsjs/runtime/runtime";
import { createRouter, createWebHistory } from "vue-router";
import { routes, handleHotUpdate } from "vue-router/auto-routes";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router);
}

const app = createApp(App);
app.use(router).mount("#app");

const appSplash = document.getElementById("app-splash");
if (appSplash) {
  appSplash.remove();
}

EventsOn("secondLaunchArgs", (args: string[]) => {
  const secondLaunchArgs = args.join("|");
  console.log("secondLaunchArgs", secondLaunchArgs);
});
