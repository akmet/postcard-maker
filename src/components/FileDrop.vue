<template>
    <label for="dropzone-file"
        class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Bild {{ props.index }}</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" @change="$emit('changedFile', $event)" />
    </label>
</template>

<script lang="ts" setup>
const props = defineProps(['index'])
</script>
<style></style>