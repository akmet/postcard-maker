<template>
	<SidebarMenu></SidebarMenu>
	<div class="ml-64 h-screen flex justify-center items-center bg-gray-200 dark:bg-gray-900" id="page">
		<div id="stageContainer" class="w-full h-full"></div>
	</div>
</template>

<script lang="ts" setup>
import createStages from "./helper/createStages";
import { onMounted } from "vue";
import resizeStage from "./helper/resizeStage";

onMounted(() => {
	createStages();
	window.addEventListener('resize', resizeStage);
})
</script>
