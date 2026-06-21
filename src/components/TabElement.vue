<template>
  <div
    class="rounded-lg bg-gray-300 dark:bg-gray-900"
    :class="{ hidden: !props.visible }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean }>();
</script>
