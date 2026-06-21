<template>
  <SidebarMenu :collapsed="isCollapsed" @toggle="isCollapsed = !isCollapsed"></SidebarMenu>
  <button
    v-if="isCollapsed"
    @click="isCollapsed = false"
    class="fixed left-3 top-3 z-50 rounded-md bg-gray-50 p-1.5 shadow-md dark:bg-gray-800 dark:text-white"
    aria-label="Sidebar öffnen"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
  <div
    :class="isCollapsed ? 'ml-0' : 'ml-64'"
    class="flex h-screen items-center justify-center bg-gray-200 transition-all duration-300 dark:bg-gray-900"
    id="page"
  >
    <div id="stageContainer" class="h-full w-full"></div>

    <StageZoom></StageZoom>
  </div>
</template>

<script lang="ts" setup>
import createStages from './helper/createStages';
import SidebarMenu from './components/SidebarMenu.vue';
import StageZoom from './components/StageZoom.vue';
import { onMounted, ref } from 'vue';
import resizeStage from './helper/resizeStage';
import { usePersistentStore } from './stores/persistentStore';

const isCollapsed = ref(false);

onMounted(async () => {
  await usePersistentStore().initImages();
  createStages();
  window.addEventListener('resize', resizeStage);
});
</script>
