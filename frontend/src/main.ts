import { createApp } from 'vue'
import { createWebHashHistory, createRouter } from 'vue-router'
import App from './App.vue'
import './style.css';


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: () => import('./routes/Main.vue') },
        { path: '/about', component: () => import('./routes/About.vue') },
    ],
})
const app = createApp(App)
app.use(router).mount('#app')


const preventDefaults = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    if (e instanceof DragEvent && e.dataTransfer) {
        e.dataTransfer.dropEffect = 'none'
    }
}
const preventEvents = ['dragenter', 'dragover', 'dragleave', 'contextmenu']
// 阻止默认行为（阻止浏览器打开文件）
preventEvents.forEach(eventName => {
    document.addEventListener(eventName, preventDefaults, false);
});

const appSplash = document.getElementById('app-splash')
if (appSplash) {
    appSplash.remove()
}
