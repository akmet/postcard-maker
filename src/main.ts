import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueKonva from 'vue-konva'
import App from './App.vue'
import SidebarMenu from './components/SidebarMenu.vue'
import './style.css'

createApp(App)
    .use(VueKonva)
    .use(createPinia())
    .component('SidebarMenu', SidebarMenu)
    .mount('#app')