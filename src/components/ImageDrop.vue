<template>
  <FileDrop :text="'Bild ' + props.item + ' hochladen'" :identifier="'dropzone-file-' + props.item"
    @some-event="fileDropped">
  </FileDrop>
</template>

<script lang="ts" setup>
import { createImage } from '../helper/imageHelper';
import FileDrop from './FileDrop.vue';
const props = defineProps(['item'])

function fileDropped(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    createImage(event.target, props.item)
  }
}
</script>
<style></style>