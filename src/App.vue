<template>
	<SidebarMenu @gap-input="updateGap" @export-image="exportImage" @switch-template="switchTemplate"
		@select-layer="selectLayer"></SidebarMenu>
	<div class="p-4 ml-64 h-screen flex justify-center items-center" id="page">
		<div id="stageContainer" class="w-full h-full">

		</div>
	</div>
</template>

<script lang="ts" setup>
import createStages from "./helper/createStages";
import Konva from 'konva';
import { onMounted, ref } from "vue";
import { useStageStore } from "./stores/stageStore";

let template = ref(0);
let gap = 0;



onMounted(() => {
	createStages();
})

function exportImage() {
	console.log("export!");
}

function updateGap(event: Event) {
	let target = event?.target;
	let container_parent = document.getElementById('container_parent');
	if (!(target instanceof HTMLInputElement) || container_parent === null) {
		return;
	}
	container_parent.style.gap = target.value + "px";

	let diff = (Number.parseInt(target.value) - gap) / 2;
	const stage = useStageStore().stage as Konva.Stage;
	let layer = stage.findOne((node: Node) => node instanceof Konva.Layer) as Konva.Layer;
	console.log("layer", layer.width());

	let width = stage.width();
	let height = stage.height();
	layer.scaleX((width - diff) / width)
	layer.scaleY((height - diff) / height)
	stage.width(width - diff);
	stage.height(height - diff);
	stage.draw();

	gap = Number.parseInt(target.value);
}


function switchTemplate(nextTemplate: number) {
	console.log(template);
	console.log(nextTemplate);
	template.value = nextTemplate;
	console.log(template);
}

function selectLayer(event: Event, index: number) {
	console.log(event.target, index);
}
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
