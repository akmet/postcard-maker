<template>
	<SidebarMenu></SidebarMenu>
	<div class="ml-64 h-screen flex justify-center items-center" id="page">
		<div id="stageContainer" class="w-full h-full"></div>
	</div>
</template>

<script lang="ts" setup>
import createStages from "./helper/createStages";
import { onMounted } from "vue";
import resizeStage from "./helper/resizeStage";
import TextModal from "./components/TextModal.vue";

onMounted(() => {
	createStages();
	window.addEventListener('resize', resizeStage);
})
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: #333333;
}

.konva {
	width: 100%;
	height: 100%;
}
</style>
