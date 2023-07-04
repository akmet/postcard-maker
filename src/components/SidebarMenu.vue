<script lang="ts" setup>
import FileDrop from './FileDrop.vue';
import stageZoom from '../helper/stageZoom';
import handleFileChange from '../helper/handleFileChange';
</script>

<template>
  <aside id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white ">
            <span class="ml-auto mr-auto">Templates</span>
          </a>
        </li>
        <li>
          <a href="#" @click="$emit('switchTemplate', 0)"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="ml-3">2+2</span>
          </a>
        </li>
        <li>
          <a href="#" @click="$emit('switchTemplate', 1)"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="ml-3">2+3</span>
          </a>
        </li>
        <li>
          <a href="#" @click="$emit('switchTemplate', 2)"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="ml-3">3+2</span>
          </a>
        </li>
        <li>
          <a href="#" @click="$emit('exportImage')"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="ml-3">Export</span>
          </a>
        </li>
      </ul>
      <hr class="my-5">
      <div class="ml-auto mr-auto dark:text-white">Gap</div>
      <input id="gap" type="range" min="0" max="20" step="5" value="0" @input="$emit('gapInput', $event)" />
      <hr class="my-5">

      <div class="flex justify-evenly">
        <div class="rounded-lg bg-gray-700 dark:text-white p-1 w-5" @click="stageZoom(-0.1)">-</div>
        <div class="dark:text-white">Zoom</div>
        <div class="rounded-lg bg-gray-700 dark:text-white p-1 w-5" @click="stageZoom(0.1)">+</div>
      </div>
      <hr class="my-5">

      <div v-for="item in  [1, 2, 3, 4, 5] " :key="item">
        <label class="dark:text-white">Bild {{ item }}</label>
        <FileDrop :item="item" @changed-file="(data) => handleFileChange(data.$event.target, data.id)">
        </FileDrop>
      </div>
    </div>
  </aside>
</template>

<style>
.wrapper {
  width: 50px;
}
</style>
