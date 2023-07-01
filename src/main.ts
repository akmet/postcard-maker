import { createApp } from 'vue'
import VueKonva from 'vue-konva'
import App from './App.vue'
import LayoutThreeByTwo from './components/LayoutThreeByTwo.vue';
import LayoutTwoByThree from './components/LayoutTwoByThree.vue';
import LayoutTwoByTwo from './components/LayoutTwoByTwo.vue';
import SidebarMenu from './components/SidebarMenu.vue';
import './style.css'

createApp(App)
    .use(VueKonva)
    .component('LayoutThreeByTwo', LayoutThreeByTwo)
    .component('LayoutTwoByThree', LayoutTwoByThree)
    .component('LayoutTwoByTwo', LayoutTwoByTwo)
    .component('SidebarMenu', SidebarMenu)
    .mount('#app')