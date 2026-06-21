<template>
  <label
    :for="props.identifier"
    class="dark:hover:bg-bray-800 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
  >
    <div class="flex flex-col items-center justify-center">
      <p class="text-center text-sm text-gray-500 dark:text-gray-400">{{ props.text }}</p>
    </div>
    <input :id="props.identifier" type="file" class="hidden" @change="$emit('someEvent', $event)" />
  </label>
</template>

<script lang="ts" setup>
const props = defineProps<{ text: string; identifier: string }>();
defineEmits<{ someEvent: [event: Event] }>();
</script>
