import { getOSType } from "./utils/os";
import { preventDocumentDefaultEvents } from "./utils/prevent_defauts";

document.documentElement.setAttribute("data-os", getOSType());
document.documentElement.setAttribute("data-theme", "dark");

preventDocumentDefaultEvents();

import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/main.scss";
import { router } from "./routes/Router";
import { EventsOn } from "../wailsjs/runtime/runtime";

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
