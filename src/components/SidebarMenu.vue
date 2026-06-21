<script lang="ts" setup>
import ImageDrop from './ImageDrop.vue';
import FileDrop from './FileDrop.vue';
import switchTemplate from '../helper/switchTemplate';
import { createText } from '../helper/textHelper';
import { Layout } from '../types/types';
import exportImage from '../helper/exportImage';
import updateGap from '../helper/updateGap';
import updateBorder from '../helper/updateBorder';
import TextModal from './TextModal.vue';
import TwoColumns from './TwoColumns.vue';
import Button from './Button.vue';
import { usePersistentStore } from '../stores/persistentStore';
import Konva from 'konva';
import attachNodeToTransformer from '../helper/attachNodeToTransformer';
import { computed, ref } from 'vue';
import TabElement from './TabElement.vue';
import TabHeader from './TabHeader.vue';
import { useStageStore } from '../stores/stageStore';
import { jsonExport, jsonImport } from '../helper/persistentJson';

const props = defineProps<{ collapsed: boolean }>();
const emit = defineEmits<{ toggle: [] }>();

const persistentStore = usePersistentStore();
const stageStore = useStageStore();

const currentPage = ref('');
const texts = computed(() => persistentStore.texts);

const layout = computed({
  get: () => persistentStore.layout,
  set: (value: Layout) => switchTemplate(value)
});

const gap = computed({
  get: () => persistentStore.gap,
  set: (value: number) => updateGap(value)
});

const border = computed({
  get: () => persistentStore.border,
  set: (value: number) => updateBorder(value)
});

function switchPage(page: string) {
  currentPage.value = currentPage.value === page ? '' : page;
}

function clickedOnText(id: string) {
  attachNodeToTransformer(
    (stageStore.stage as Konva.Stage).getLayers(),
    (stageStore.stage as Konva.Stage).findOne(
      (node: Konva.Node) => node instanceof Konva.Text && node.id() === id
    ) as Konva.Text
  );
}

const mode = import.meta.env.MODE;

function localStorageSize(): string {
  let total = 0;
  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      total += (localStorage[key].length + key.length) * 2;
    }
  }
  return (total / 1024).toFixed(2) + ' KB';
}
</script>

<template>
  <aside
    id="default-sidebar"
    :class="props.collapsed ? '-translate-x-full' : 'translate-x-0'"
    class="fixed left-0 top-0 z-40 h-screen w-64 transition-transform duration-300"
    aria-label="Sidebar"
  >
    <div
      class="flex h-full flex-col content-start gap-2 overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800 dark:text-white"
    >
      <div class="mb-2 flex items-center justify-between">
        <img class="h-8 rounded-lg" src="/postcard.svg" alt="" />
        <div class="flex-grow text-center text-xl">PostkartenTool</div>
        <button
          @click="emit('toggle')"
          class="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Sidebar schließen"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
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
      />
      <TabElement :visible="currentPage === 'settings'">
        <TwoColumns>
          <label class="justify-self-start">Layout</label>
          <select v-model="layout" class="dark:bg-gray-800">
            <option :value="Layout.TwoByTwo">2+2</option>
            <option :value="Layout.TwoByThree">2+3</option>
            <option :value="Layout.ThreeByTwo">3+2</option>
          </select>
          <label class="justify-self-start">Gap</label>
          <input type="range" min="0" max="50" step="10" v-model.number="gap" />
          <label class="justify-self-start">Border</label>
          <input type="range" min="0" max="50" step="10" v-model.number="border" />
        </TwoColumns>
      </TabElement>
      <TabElement :visible="currentPage === 'images'">
        <TwoColumns>
          <ImageDrop v-for="item in [1, 2, 3, 4, 5]" :key="item" :item="item" />
        </TwoColumns>
      </TabElement>
      <TabElement :visible="currentPage === 'texts'">
        <TwoColumns>
          <Button @click="createText" type="green">Neu</Button>
          <Button v-for="(item, index) in texts" :key="item.id" @click="clickedOnText(item.id)">
            {{ 'Text ' + (index + 1) }}
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
          />
        </TwoColumns>
        <TwoColumns>
          <label>Datei&nbsp;speichern:</label>
        </TwoColumns>
        <TwoColumns>
          <Button @click="exportImage('picture')">PNG</Button>
          <Button @click="jsonExport()">JSON</Button>
        </TwoColumns>
      </TabElement>

      <TextModal class="mt-auto" />
      <div class="text-center" v-if="mode === 'development'">
        <div>LocalStorage: {{ localStorageSize() }}</div>
        <div>Bilder: {{ persistentStore.images.size }}</div>
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
