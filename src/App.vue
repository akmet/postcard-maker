<template>
	<SidebarMenu @gap-input="updateGap" @export-image="exportImage" @switch-template="switchTemplate"></SidebarMenu>
	<div class="p-4 ml-64 h-screen" id="page">

		<div class="a6-container aspect-[dinA6]">
			<LayoutTwoByTwo v-if="this.template === 0"></LayoutTwoByTwo>
			<LayoutTwoByThree v-else-if="this.template === 1"></LayoutTwoByThree>
			<LayoutThreeByTwo v-else-if="this.template === 2"></LayoutThreeByTwo>
		</div>
	</div>
</template>

<script>

import LayoutTwoByTwo from "./components/LayoutTwoByTwo.vue";
import LayoutThreeByTwo from "./components/LayoutThreeByTwo.vue";
import LayoutTwoByThree from "./components/LayoutTwoByThree.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import handleStageMouseDown from "@/helper/handleStageMouseDown";
import attachNodeToTransformer from "@/helper/attachNodeToTransformer";
import fitStageIntoParentContainer from "@/helper/fitStageIntoParentContainer";
import Konva from 'konva';

export default {
	name: 'PostcardMaker',
	components: {
		SidebarMenu,
		LayoutTwoByTwo,
		LayoutThreeByTwo,
		LayoutTwoByThree,
	},
	data() {
		return {
			stages: [],
			template: 0,
		};
	},
	mounted() {
		const image = new window.Image();
		image.src = "/yoda.jpg";
		image.onload = () => {
			for (let stage of this.stages) {
				let layer = stage.findOne((node) => node.getClassName() === 'Layer');
				layer.add(
					new Konva.Image({
						x: 0,
						y: 0,
						image: image,
						width: layer.clip.width,
						height: layer.clip.height,
						draggable: true,
					})
				);
			}
		};

		window.addEventListener('resize', this.fitStageIntoParentContainer);
		let parentContainer = document.getElementById('container_parent');
		console.log(parentContainer.children[0]);

		for (let container of parentContainer.children) {
			let page = document.getElementById('page');
			this.stages.push(
				new Konva.Stage({
					container: container,
					width: page.offsetWidth,
					height: page.offsetHeight,
				})
					.on('mousedown', this.handleStageMouseDown)
					.add(
						new Konva.Layer({
							clip: {
								x: 0,
								y: 0,
								width: container.offsetWidth,
								height: container.offsetHeight
							}
						})
							.add(
								new Konva.Transformer({
									nodes: [],
									rotateAnchorOffset: 60,
									enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
								})
							)
					)
					.draw()
			);
		}
		this.fitStageIntoParentContainer();
	},
	methods: {
		exportImage() {
			console.log("export!");
		},
		handleStageMouseDown,
		attachNodeToTransformer,
		fitStageIntoParentContainer,
		updateGap($event) {
			document.getElementById('container_parent').style.gap = $event.target.value + "rem";
			return;
		},
		switchTemplate(template) {
			this.template = template;
		}
	},
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
