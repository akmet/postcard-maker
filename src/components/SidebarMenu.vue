<script lang="ts" setup>
import FileDrop from './FileDrop.vue';
import switchTemplate from '../helper/switchTemplate';
import handleFileChange from '../helper/handleFileChange';
import { createText } from '../helper/textHelper';
import { Layout, TextData } from '../types/types';
import exportImage from '../helper/exportImage';
import updateGap from '../helper/updateGap';
import updateBorder from '../helper/updateBorder';
import TextModal from './TextModal.vue';
import TwoColumns from './TwoColumns.vue';
import Button from './Button.vue';
import { useTextStore } from '../stores/textStore';
import Konva from 'konva';
import attachNodeToTransformer from '../helper/attachNodeToTransformer';
import { ref } from 'vue';
import TabElement from './TabElement.vue';
import TabHeader from './TabHeader.vue';
import { useStageStore } from '../stores/stageStore';

const texts = ref();
const selectedText = ref();
reloadTexts();

function reloadTexts() {
  texts.value = useTextStore().texts as TextData[];
}

const currentPage = ref('');
function switchPage(page: string) {
  if (currentPage.value === page) {
    currentPage.value = '';
  } else {
    currentPage.value = page;
  }
}

function clickedOnText(id: string) {
  const stage = useStageStore().stage as Konva.Stage;
  attachNodeToTransformer(stage.getLayers(), stage.findOne((node: Konva.Node) => node instanceof Konva.Text && node.id() === id) as Konva.Text)
}
</script>

<template>
  <aside id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0"
    aria-label="Sidebar">
    <div
      class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col gap-2 dark:text-white content-start">

      <div class="flex justify-between items-center mb-2">
        <img class="h-8 rounded-full" src="/favicon.jpg">
        <div class="text-xl flex-grow text-center">PostkartenTool</div>
      </div>
      <TabHeader :selected="currentPage" :titles="[
        { target: 'settings', icon: 'coq' },
        { target: 'images', icon: 'photograph' },
        { target: 'texts', icon: 'annotation' },
        { target: 'export', icon: 'download' },
      ]" @switch-page="page => switchPage(page)">
      </TabHeader>
      <TabElement :visible="currentPage === 'settings'">
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
      </TabElement>
      <TabElement :visible="currentPage === 'images'">
        <TwoColumns>
          <FileDrop v-for="item in [1, 2, 3, 4, 5]" :key="item" :item="item"
            @changed-file="(data) => handleFileChange(data.$event.target, data.id)">
          </FileDrop>
        </TwoColumns>
      </TabElement>
      <TabElement :visible="currentPage === 'texts'">
        <TwoColumns>
          <Button @on-click="createText" type="green">Neu</Button>
          <Button v-for="(item, index) in texts" @on-click="clickedOnText(item.id)">
            {{ "Text " + (index + 1) }}
          </Button>
        </TwoColumns>
      </TabElement>
      <TabElement :visible="currentPage === 'export'">
        <TwoColumns>
          <Button type="green" @click="exportImage('picture')">Bild</Button>
          <Button @click="exportImage('json')">JSON</Button>
        </TwoColumns>
      </TabElement>

      <TextModal class="mt-auto" :text="selectedText" @reload-texts="reloadTexts">
      </TextModal>
    </div>
  </aside>
</template>

<style>
.wrapper {
  width: 50px;
}
</style>
