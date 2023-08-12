<template>
    <div class="bg-gray-300 dark:bg-gray-900 rounded-lg" :class="{
        hidden: !props.visible
    }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['visible']);
</script>
