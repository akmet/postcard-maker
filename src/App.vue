<template>
	<SidebarMenu @gap-input="updateGap" @export-image="exportImage" @switch-template="switchTemplate"></SidebarMenu>
	<div class="p-4 ml-64 h-screen" id="page">

		<div class="a6-container aspect-[dinA6]" id="container_parent2">
			<component :is="dynamicComponent"></component>
		</div>
	</div>
</template>

<script lang="ts" setup>
import createStages from "./helper/createStages";
import fitStageIntoParentContainer from "./helper/fitStageIntoParentContainer";
import Konva from 'konva';
import { computed, onMounted } from "vue";

let stages: Konva.Stage[] = [];
let template = 0;
const components = [
	'LayoutTwoByTwo',
	'LayoutTwoByThree',
	'LayoutThreeByTwo',
];

const dynamicComponent = computed(
	() => components[template]
)

onMounted(() => {
	createStages(stages);
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

	window.addEventListener('resize', () => fitStageIntoParentContainer(stages));

	fitStageIntoParentContainer(stages);

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
	container_parent.style.gap = target.value + "rem";
	return;
}

function switchTemplate(nextTemplate: number) {
	console.log(nextTemplate);
	template = nextTemplate;
	console.log(template);
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

	height: 90vh;
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
