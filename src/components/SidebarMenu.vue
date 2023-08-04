<script lang="ts" setup>
import FileDrop from './FileDrop.vue';
import stageZoom from '../helper/stageZoom';
import switchTemplate from '../helper/switchTemplate';
import handleFileChange from '../helper/handleFileChange';
import { Layout, TextData } from '../types/types';
import exportImage from '../helper/exportImage';
import updateGap from '../helper/updateGap';
import updateBorder from '../helper/updateBorder';
import TextModal from './TextModal.vue';
import { useStageStore } from '../stores/stageStore';
import Konva from 'konva';

const store = useStageStore();
const texts = store.texts as TextData[];
function addText() {
  const lastText = texts[texts.length - 1];
  const id = (lastText?.id ?? 0) + 1;
  console.log(id);
  store.addText({
    id: id,
    text: new Konva.Text({
      x: 200,
      y: 600,
      text: "Viele Grüße\nAus Blajoux",
      fontSize: 40,
      fontFamily: 'Arial',
      fill: '#555',
      width: 300,
      padding: 5,
      align: 'center',
      draggable: true,
    }).setAttr('textId', id).on('transform', ($event) => {
      const text = $event.currentTarget as Konva.Text;
      text.setAttrs({
        width: Math.max(text.width() * text.scaleX(), 20),
        height: Math.max(text.height() * text.scaleY(), 20),
        scaleX: 1,
        scaleY: 1,
      });
    }),
  });
}
</script>

<template>
  <aside id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 grid grid-cols-2 gap-4 dark:text-white
      place-items-center align-items-center justify-items-stretch content-start">

      <div class="col-span-2 flex justify-between gap-4 items-center">
        <img class="h-8" src="/favicon.jpg">
        <div class="text-xl flex-grow text-center">PostkartenTool</div>
      </div>
      <hr class="col-span-2 w-full">
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
        <button @click="addText"
          class="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button">
          Neuer Text
        </button>
        <TextModal v-for="text of texts" :text-id="text.id" :text="text.text"></TextModal>
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
