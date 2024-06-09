<template>
    <label :for="props.identifier"
        class="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center">
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center">{{ text }}</p>
        </div>
        <input :id="props.identifier" type="file" class="hidden" @change="$emit('someEvent', $event)"/>
    </label>
</template>

<script lang="ts" setup>
const props = defineProps(['text', 'identifier'])

</script>

<style></style>