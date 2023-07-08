<script lang="ts" setup>
import FileDrop from './FileDrop.vue';
import stageZoom from '../helper/stageZoom';
import switchTemplate from '../helper/switchTemplate';
import handleFileChange from '../helper/handleFileChange';
import { Layout } from '../types/types';
import exportImage from '../helper/exportImage';
import updateGap from '../helper/updateGap';
import TextModal from './TextModal.vue';
</script>

<template>
  <aside id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 grid grid-cols-2 gap-4 dark:text-white
      place-items-center align-items-center justify-items-stretch content-start">

      <label class="justify-self-start">Layout</label>
      <select class="dark:bg-gray-800" @change="switchTemplate">
        <option :value="Layout.TwoByTwo">2+2</option>
        <option :value="Layout.TwoByThree">2+3</option>
        <option :value="Layout.ThreeByTwo">3+2</option>
      </select>
      <label class="justify-self-start">Gap</label>
      <input id="gap" type="range" min="0" max="50" step="10" value="0" @input="updateGap" />


      <label class="justify-self-start">Zoom</label>
      <div class="flex justify-around">
        <div class="rounded-lg dark:bg-gray-700 aspect-square w-6 text-center" @click="stageZoom(-0.1)">-</div>
        <div class="rounded-lg dark:bg-gray-700 aspect-square w-6 text-center" @click="stageZoom(0.1)">+</div>
      </div>
      <hr class="col-span-2">
      <FileDrop v-for="item in  [1, 2, 3, 4, 5] " :key="item" :item="item"
        @changed-file="(data) => handleFileChange(data.$event.target, data.id)">
      </FileDrop>

      <hr class="col-span-2 w-full">
      <div class="col-span-2 grid grid-cols-2 gap-4">
        <TextModal></TextModal>
      </div>

      <hr class="col-span-2 w-full mt-auto">
      <label class="justify-self-start">Speichern als</label>
      <select class="w-full dark:bg-gray-800" @change="exportImage">
        <option value="-1" disabled selected>Bitte wählen</option>
        <option value="picture">Bild</option>
        <option value="json">Json</option>
      </select>
    </div>
  </aside>
</template>

<style>
.wrapper {
  width: 50px;
}
</style>
