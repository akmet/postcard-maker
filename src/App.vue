<template>
	<SidebarMenu @gap-input="updateGap" @export-image="exportImage" @switch-template="switchTemplate"
		@select-layer="selectLayer"></SidebarMenu>
	<div class="ml-64 h-screen flex justify-center items-center" id="page">
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
	window.addEventListener('resize', () => {
		const stageContainer = document.getElementById('stageContainer');
		if (!(stageContainer instanceof HTMLDivElement)) {
			return;
		}
		const stage = useStageStore().stage as Konva.Stage;
		stage.width(stageContainer.offsetWidth);
		stage.height(stageContainer.offsetHeight);
	});
})

function exportImage() {
	const stage = useStageStore().stage as Konva.Stage;
	const rect = stage.findOne((node: Node) => node instanceof Konva.Rect) as Konva.Rect;
	stage.toDataURL({
		x: rect.x(),
		y: rect.y(),
		width: rect.width(),
		height: rect.height(),
		callback(str: string) {
			var a = document.createElement("a");
			a.download = "svg-graph.png";
			a.href = str;
			a.click();
		}
	});
}

function updateGap(event: Event) {
	let target = event?.target;
	let stageContainer = document.getElementById('stageContainer');
	if (!(target instanceof HTMLInputElement) || stageContainer === null) {
		return;
	}
	const newGap = Number.parseInt(target.value);
	const store = useStageStore();
	const oldGap = store.gap as number;
	const stage = store.stage as Konva.Stage;

	let diff = newGap - oldGap;
	console.log("oldGap: " + oldGap);
	console.log("newGap: " + newGap);
	console.log("diff: " + diff)
	//const groups = stage.find((node: Konva.Node) => node instanceof Konva.Group && node.name().startsWith('Bild')) as Konva.Group[];
	const groups = stage.find((node: Konva.Node) => node instanceof Konva.Image) as Konva.Image[];
	for (let group of groups) {
		//console.log(group.name(), group.clip(), group.getAttr('gaps'));

		/*const gaps = group.getAttr('gaps');
		if (gaps.left) {

			//group.clipWidth(group.clipWidth() -)
		}
		*/
	}

	store.setGap(newGap);
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
