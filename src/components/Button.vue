<template>
  <button
    class="block rounded-lg px-4 py-2.5 text-center text-sm font-medium text-white"
    :class="{
      'bg-red-600 hover:bg-red-800': props.type === 'danger',
      'bg-green-600 hover:bg-green-800': props.type === 'green',
      'bg-blue-600 hover:bg-blue-800': !props.type
    }"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ type?: 'danger' | 'green' }>();
</script>
