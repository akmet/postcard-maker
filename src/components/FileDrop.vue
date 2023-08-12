<template>
    <label :for="'dropzone-file-' + props.item"
        class="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center">
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center">Bild {{ item }} hochladen</p>
        </div>
        <input :id="'dropzone-file-' + props.item" type="file" class="hidden" @change="changedFile" />
    </label>
</template>

<script lang="ts" setup>
import { createImage } from '../helper/imageHelper';
const props = defineProps(['item'])


function changedFile($event: Event) {
    if ($event.target instanceof HTMLInputElement) {
        createImage($event.target, props.item)
    }
}
</script>
<style></style>