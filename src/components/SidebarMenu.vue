<script lang="ts" setup>
import FileDrop from './FileDrop.vue';
import stageZoom from '../helper/stageZoom';
import switchTemplate from '../helper/switchTemplate';
import handleFileChange from '../helper/handleFileChange';
import { Layout } from '../types/types';
import exportImage from '../helper/exportImage';
import updateGap from '../helper/updateGap';
import updateBorder from '../helper/updateBorder';
import TextModal from './TextModal.vue';
import Accordian from './Accordian.vue';
import TwoColumns from './TwoColumns.vue';
import Button from './Button.vue';
</script>

<template>
  <aside id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0"
    aria-label="Sidebar">
    <div
      class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col gap-4 dark:text-white content-start">

      <div class="flex justify-between items-center">
        <img class="h-8" src="/favicon.jpg">
        <div class="text-xl flex-grow text-center">PostkartenTool</div>
      </div>

      <Accordian>
        <template v-slot:title>
          <span>Einstellungen</span>
        </template>
        <template v-slot:content>
          <TwoColumns>
            <label class="justify-self-start">Layout</label>
            <select class="dark:bg-gray-800" @change="switchTemplate">
              <option :value="Layout.TwoByTwo">2+2</option>
              <option :value="Layout.TwoByThree">2+3</option>
              <option :value="Layout.ThreeByTwo">3+2</option>
            </select>
            <label class="justify-self-start">Gap</label>
            <input id="gap" type="range" min="0" max="50" step="10" value="0" @input="updateGap" />

            <label class="justify-self-start">Border</label>
            <input id="border" type="range" min="0" max="50" step="10" value="0" @input="updateBorder" />
          </TwoColumns>
        </template>
      </Accordian>
      <Accordian>
        <template v-slot:title>
          <span>Bilder</span>
        </template>
        <template v-slot:content>
          <TwoColumns>
            <FileDrop v-for="item in  [1, 2, 3, 4, 5] " :key="item" :item="item"
              @changed-file="(data) => handleFileChange(data.$event.target, data.id)">
            </FileDrop>
          </TwoColumns>
        </template>
      </Accordian>
      <Accordian>
        <template v-slot:title>
          <span>Texte</span>
        </template>
        <template v-slot:content>
          <TextModal></TextModal>
        </template>
      </Accordian>

      <Accordian>
        <template v-slot:title>
          <span>Speichern</span>
        </template>
        <template v-slot:content>
          <label class="justify-self-start">Speichern als</label>
          <select class="w-full dark:bg-gray-800" @change="exportImage">
            <option value="-1" disabled selected>Bitte wählen</option>
            <option value="picture">Bild</option>
            <option value="json">Json</option>
          </select>
        </template>
      </Accordian>
      <TwoColumns class="mt-auto">
        <label class="justify-self-start">Zoom</label>
        <div class="flex justify-around">
          <div class="rounded-lg dark:bg-gray-700 aspect-square w-6 text-center" @click="stageZoom(-0.1)">-</div>
          <div class="rounded-lg dark:bg-gray-700 aspect-square w-6 text-center" @click="stageZoom(0.1)">+</div>
        </div>
      </TwoColumns>
    </div>
  </aside>
</template>

<style>
.wrapper {
  width: 50px;
}
</style>
