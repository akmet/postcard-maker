import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueKonva from 'vue-konva'
import App from './App.vue'
import './style.css'

createApp(App)
    .use(VueKonva)
    .use(createPinia())
    .mount('#app')