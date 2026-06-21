import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueKonva from 'vue-konva';
import App from './App.vue';
// oxlint-disable-next-line import/no-unassigned-import
import './style.css';

// oxlint-disable-next-line import/no-unassigned-import
import 'cropperjs/dist/cropper.css';
// oxlint-disable-next-line import/no-unassigned-import
import 'vue-picture-cropper/style.css';

createApp(App).use(VueKonva).use(createPinia()).mount('#app');
