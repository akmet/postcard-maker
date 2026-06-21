<template>
  <FileDrop
    :text="'Bild ' + props.item + ' hochladen'"
    :identifier="'dropzone-file-' + props.item"
    @some-event="fileDropped"
  />

  <teleport to="#modals">
    <div
      v-if="isShowModal"
      class="p-auto flex h-screen w-screen justify-center bg-gray-200 dark:bg-gray-900"
    >
      <div class="flex max-h-full max-w-full flex-col content-center">
        <div class="h-3/4 w-3/4">
          <VuePictureCropper
            ref="vpcRef"
            :boxStyle="{
              width: '100%',
              height: '100%',
              backgroundColor: '#ffffff',
              margin: 'auto'
            }"
            :img="pic"
            :options="{
              viewMode: 1,
              dragMode: 'crop',
              aspectRatio: 437 / 310
            }"
          />
        </div>
        <div class="flex justify-center gap-4 py-4">
          <Button type="danger" @click="isShowModal = false"> Abbrechen </Button>
          <Button type="green" @click="getResult"> Zuschneiden </Button>
          <Button @click="cropper!.rotate(-90)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 scale-x-[-1]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </Button>
          <Button @click="cropper!.rotate(90)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { createImage } from '../helper/imageHelper';
import VuePictureCropper, { type VuePictureCropperRefValue, type CropperInstance } from 'vue-picture-cropper';
import FileDrop from './FileDrop.vue';
import { computed, ref } from 'vue';
import Button from './Button.vue';

const props = defineProps<{ item: number }>();

const isShowModal = ref(false);
const pic = ref('');
const vpcRef = ref<VuePictureCropperRefValue | null>(null);
const cropper = computed<CropperInstance | null>(() => vpcRef.value?.cropper ?? null);

function fileDropped(event: Event) {
  if (!(event.target instanceof HTMLInputElement)) return;

  const { files } = event.target;
  if (!files?.length) return;

  pic.value = '';
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.addEventListener('load', () => {
    pic.value = String(reader.result);
    isShowModal.value = true;
  });
}

function getResult() {
  if (!cropper.value) return;

  const base64 = cropper.value.getDataURL({
    width: 874 * 1.5,
    height: 620 * 1.5
  });

  isShowModal.value = false;
  createImage(base64, props.item);
}
</script>
