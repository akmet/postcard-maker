<template>
	<SidebarMenu @gap-input="updateGap" @export-image="exportImage" @switch-template="switchTemplate"
		@changed-file="changedFile" @select-layer="selectLayer"></SidebarMenu>
	<div class="p-4 ml-64 h-screen flex justify-center items-center" id="page">

		<div class="a6-container">
			<component :is="dynamicComponent"></component>
		</div>
	</div>
</template>

<script lang="ts" setup>
import createStages from "./helper/createStages";
import fitStageIntoParentContainer from "./helper/fitStageIntoParentContainer";
import Konva from 'konva';
import { computed, onMounted, ref } from "vue";
import handleFileChange from "./helper/handleFileChange";
import { useStagesStore } from "./stores/stagesStore";

const stages = useStagesStore().stages;
let template = ref(0);
let gap = 0;

const components = [
	'LayoutTwoByTwo',
	'LayoutTwoByThree',
	'LayoutThreeByTwo',
];

const dynamicComponent = computed(
	() => components[template.value]
)

onMounted(() => {
	createStages();
	const image = new window.Image();
	image.src = "dist/yoda.jpg";
	image.onload = () => {
		console.log("loaded yoda");
		for (let stage of stages) {
			let layer = stage.findOne((node: Node) => node instanceof Konva.Layer) as Konva.Layer;
			layer.add(
				new Konva.Image({
					x: 0,
					y: 0,
					image: image,
					width: layer.clip().width,
					height: layer.clip().height,
					draggable: true,
				})
			);
		}
	};

	window.addEventListener('resize', () => fitStageIntoParentContainer());


	fitStageIntoParentContainer();

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
	for (let stage of stages) {
		let layer = stage.findOne((node: Node) => node instanceof Konva.Layer) as Konva.Layer;
		console.log("layer", layer.width());

		let width = stage.width();
		let height = stage.height();
		layer.scaleX((width - diff) / width)
		layer.scaleY((height - diff) / height)
		stage.width(width - diff);
		stage.height(height - diff);
		stage.draw();
	}
	gap = Number.parseInt(target.value);
}

function changedFile(event: Event, index: number) {

	console.log(index);
	if (event.target instanceof HTMLInputElement) {
		handleFileChange(event.target, stages[index]);
	}
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

.a6-container {
	/* Set the dimensions of the container to match the ratio of DIN A6 */

	height: 70vh;
	aspect-ratio: calc(148 / 105);
	/*height: calc(105px * 5);
	*/
	background-color: white;
}

.konva {
	width: 100%;
	height: 100%;
}
</style>
