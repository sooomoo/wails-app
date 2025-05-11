import { getOSType } from "./utils/os";
import {preventDocumentDefaultEvents} from "./utils/prevent_defauts";

document.documentElement.setAttribute("data-os", getOSType());
document.documentElement.setAttribute("data-theme", "dark");

preventDocumentDefaultEvents();

import { createApp } from 'vue'
import App from './App.vue'
import './style.css';  
import { router } from './routes/Router';

 
const app = createApp(App)
app.use(router).mount('#app')
 
const appSplash = document.getElementById('app-splash')
if (appSplash) {
    appSplash.remove()
}
