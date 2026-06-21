<script lang="ts" setup>
import ImageDrop from './ImageDrop.vue';
import FileDrop from './FileDrop.vue';
import switchTemplate from '../helper/switchTemplate';
import { createText } from '../helper/textHelper';
import { Layout, TextData } from '../types/types';
import exportImage from '../helper/exportImage';
import updateGap from '../helper/updateGap';
import updateBorder from '../helper/updateBorder';
import TextModal from './TextModal.vue';
import TwoColumns from './TwoColumns.vue';
import Button from './Button.vue';
import { usePersistentStore } from '../stores/persistentStore';
import Konva from 'konva';
import attachNodeToTransformer from '../helper/attachNodeToTransformer';
import { ref } from 'vue';
import TabElement from './TabElement.vue';
import TabHeader from './TabHeader.vue';
import { useStageStore } from '../stores/stageStore';
import { jsonExport, jsonImport } from '../helper/persistentJson';

const persistentStore = usePersistentStore();
const texts = ref();
const currentPage = ref('');

reloadTexts();

function reloadTexts() {
  console.log('reloading texts in SidebarMenu');
  texts.value = persistentStore.texts as TextData[];
  console.log('updated texts.value successfully');
}

function switchPage(page: string) {
  if (currentPage.value === page) {
    currentPage.value = '';
  } else {
    currentPage.value = page;
  }
}

function clickedOnText(id: string) {
  const stage = useStageStore().stage as Konva.Stage;
  attachNodeToTransformer(
    stage.getLayers(),
    stage.findOne(
      (node: Konva.Node) => node instanceof Konva.Text && node.id() === id
    ) as Konva.Text
  );
}

const mode = import.meta.env.MODE;
const localStorageSize = ref('0');

function updateStorageSize() {
  let lsTotal = 0,
    xLen,
    x;
  for (x in localStorage) {
    if (!localStorage.hasOwnProperty(x)) {
      continue;
    }
    xLen = (localStorage[x].length + x.length) * 2;
    lsTotal += xLen;
    console.log(x.substring(0, 50) + ' = ' + (xLen / 1024).toFixed(2) + ' KB');
    if (x.endsWith('pinia/images/store')) {
      const images = JSON.parse(localStorage[x]);
      for (let image in images) {
        let yLen = images[image][1].length * 2;
        console.log(images[image][0] + ' = ' + (yLen / 1024).toFixed(2) + ' KB');
      }
    }
  }

  console.log('Total = ' + (lsTotal / 1024).toFixed(2) + ' KB');
  localStorageSize.value = (lsTotal / 1024).toFixed(2) + ' KB';
}
updateStorageSize();
</script>

<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-0 transition-transform sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div
      class="flex h-full flex-col content-start gap-2 overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800 dark:text-white"
    >
      <div class="mb-2 flex items-center justify-between">
        <img class="h-8 rounded-lg" src="/postcard.svg" alt="" />
        <div class="flex-grow text-center text-xl">PostkartenTool</div>
      </div>
      <TabHeader
        :selected="currentPage"
        :titles="[
          { target: 'settings', icon: 'coq' },
          { target: 'images', icon: 'photograph' },
          { target: 'texts', icon: 'annotation' },
          { target: 'export', icon: 'download' }
        ]"
        @switch-page="(page: string) => switchPage(page)"
      >
      </TabHeader>
      <TabElement :visible="currentPage === 'settings'">
        <TwoColumns>
          <label class="justify-self-start">Layout</label>
          <select class="dark:bg-gray-800" @change="switchTemplate">
            <option :value="Layout.TwoByTwo" :selected="persistentStore.layout === Layout.TwoByTwo">
              2+2
            </option>
            <option
              :value="Layout.TwoByThree"
              :selected="persistentStore.layout === Layout.TwoByThree"
            >
              2+3
            </option>
            <option
              :value="Layout.ThreeByTwo"
              :selected="persistentStore.layout === Layout.ThreeByTwo"
            >
              3+2
            </option>
          </select>
          <label class="justify-self-start">Gap</label>
          <input
            id="gap"
            type="range"
            min="0"
            max="50"
            step="10"
            :value="persistentStore.gap"
            @input="updateGap"
          />

          <label class="justify-self-start">Border</label>
          <input
            id="border"
            type="range"
            min="0"
            max="50"
            step="10"
            :value="persistentStore.border"
            @input="updateBorder"
          />
        </TwoColumns>
      </TabElement>
      <TabElement :visible="currentPage === 'images'">
        <TwoColumns>
          <ImageDrop v-for="item in [1, 2, 3, 4, 5]" :key="item" :item="item"></ImageDrop>
        </TwoColumns>
      </TabElement>
      <TabElement :visible="currentPage === 'texts'">
        <TwoColumns>
          <Button @on-click="createText" type="green">Neu</Button>
          <Button v-for="(item, index) in texts" @on-click="clickedOnText(item.id)">
            {{ 'Text ' + (index as number + 1) }}
          </Button>
        </TwoColumns>
      </TabElement>
      <TabElement :visible="currentPage === 'export'">
        <TwoColumns>
          <label>Datei&nbsp;öffnen:</label>
        </TwoColumns>
        <TwoColumns>
          <Button @click="persistentStore.clear()">Neu</Button>
          <FileDrop
            text="JSON importieren"
            identifier="dropzone-file-import"
            @some-event="jsonImport"
          ></FileDrop>
        </TwoColumns>
        <TwoColumns>
          <label>Datei&nbsp;speichern:</label>
        </TwoColumns>
        <TwoColumns>
          <Button @click="exportImage('picture')">PNG</Button>
          <Button @click="jsonExport()">JSON</Button>
        </TwoColumns>
      </TabElement>

      <TextModal class="mt-auto" @reload-texts="reloadTexts" />
      <div class="text-center" v-if="mode === 'development'">
        <div class="hover:cursor-pointer" @click="updateStorageSize()">
          LocalStorage: {{ localStorageSize }}
        </div>
        <div>Bilder: {{ usePersistentStore().images.size }}</div>
      </div>
      <span class="text-center"
        >Contribute on
        <a class="text-blue-500" href="https://github.com/akmet/postcard-maker" target="_blank"
          >GitHub</a
        >.</span
      >
    </div>
  </aside>
</template>

<style>
.wrapper {
  width: 50px;
}
</style>
