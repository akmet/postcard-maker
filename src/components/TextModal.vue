<template>
  <div>
    <div
      v-if="text"
      tabindex="-1"
      class="flex flex-col place-items-center"
    >
      <hr class="w-full" />
      <TwoColumns>
        <label>Schriftart</label>
        <Selectic
          v-if="fontAvailable.length > 0"
          :options="fontAvailable"
          :value="text.fontFamily()"
          :params="{
            formatOption: (option: any) => Object.assign({}, option, { style: 'font-family: ' + option.id + ';' }),
            formatSelection: (option: any) => Object.assign({}, option, { style: 'font-family: ' + option.id + ';' })
          }"
          @change="(value: string) => text?.fontFamily(value) && update()"
        />
        <label>Größe</label>
        <input
          :value="text.fontSize()"
          type="range"
          min="30"
          max="500"
          step="2"
          @input="(event) => text?.fontSize((event.target as HTMLInputElement).valueAsNumber)"
          @change="update()"
        />
        <label>Style</label>
        <Selectic
          :value="text.fontStyle()"
          :options="[
            { id: 'normal', text: 'Normal', style: 'normal', weight: 'normal' },
            { id: 'bold', text: 'Fett', style: 'normal', weight: 'bold' },
            { id: 'italic', text: 'Kursiv', style: 'italic', weight: 'normal' }
          ]"
          :params="{
            formatOption: (option: any) =>
              Object.assign({}, option, {
                style: 'font-weight: ' + option.weight + ';font-style: ' + option.style + ';'
              }),
            formatSelection: (option: any) =>
              Object.assign({}, option, {
                style: 'font-weight: ' + option.weight + ';font-style: ' + option.style + ';'
              })
          }"
          @change="(value: string) => text?.fontStyle(value) && update()"
        />
        <label>Farbe Text</label>
        <input
          :value="text.fill()"
          type="color"
          class="aspect-square w-min"
          @input="(event) => text?.fill((event.target as HTMLInputElement).value)"
          @change="update()"
        />
        <label>Stärke Umrandung</label>
        <input
          :value="text.strokeWidth()"
          type="range"
          min="0"
          max="20"
          step="1"
          @input="(event) => text?.strokeWidth((event.target as HTMLInputElement).valueAsNumber)"
          @change="update()"
        />
        <label>Farbe Umrandung</label>
        <input
          :value="text.stroke()"
          type="color"
          class="aspect-square w-min"
          @input="(event) => text?.stroke((event.target as HTMLInputElement).value)"
          @change="update()"
        />
        <div class="col-span-2 text-2xl text-black">
          <textarea
            :value="text.text()"
            class="h-32 min-h-[8rem] w-full"
            @input="(event) => text?.text((event.target as HTMLInputElement).value)"
            @change="update()"
          ></textarea>
        </div>
        <Button class="col-span-2" type="danger" @click="destroyText">Text löschen</Button>
      </TwoColumns>
      <hr class="w-full" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import Selectic from 'selectic';
import TwoColumns from './TwoColumns.vue';
import Button from './Button.vue';
import { useStageStore } from '../stores/stageStore';
import { usePersistentStore } from '../stores/persistentStore';
import Konva from 'konva';
import attachNodeToTransformer from '../helper/attachNodeToTransformer';
import { SYSTEM_FONTS } from '../constants/fonts';

const stageStore = useStageStore();
const persistentStore = usePersistentStore();
const fontAvailable = ref<string[]>([]);

const text = computed(() => {
  const node = stageStore.selectedNode;
  if (node instanceof Konva.Text) {
    return node;
  }
  return undefined;
});

function update() {
  const node = text.value;
  if (node) {
    persistentStore.updateText(node.id(), node.toJSON());
  }
}

onMounted(async () => {
  await document.fonts.ready;
  fontAvailable.value = SYSTEM_FONTS.filter((font) => document.fonts.check(`12px "${font}"`));
});

function destroyText() {
  const node = text.value;
  if (node) {
    attachNodeToTransformer(stageStore.stage!.getLayers(), undefined);
    persistentStore.destroyText(node.id());
    node.destroy();
  }
}
</script>
