<template>
  <SidebarMenu></SidebarMenu>
  <div class="p-4 ml-64 h-screen">

    <div class="a6-container">
      <div class="container w-full h-full grid grid-cols-2 grid-rows-2 grid-flow-col gap-10">
        <div id="container_0"></div>
        <div id="container_1"></div>
        <div class="bg-amber-950">
          <v-stage
              :config="{
              width: configKonva.width / 2 - 15,
              height: configKonva.height / 2 - 15,
            }"
              @mousedown="handleStageMouseDown(0, $event)"
              @touchstart="handleStageMouseDown(0, $event)"
          >
            <v-layer
                :config="{
              x: 0,
              y: 0,
              width: configKonva.width / 2 - 15,
              height: configKonva.height / 2 - 15,
            }"
            >
              <v-image
                  v-if="images[0]"
                  name="image-0"
                  :config="{
                  x: 0,
                  y: 0,
                    image: this.images[0].image,
                    draggable: true,
                    name: 'image-0'
                  }"
                  @transformend="handleTransformEnd"
              />
              <v-transformer ref="transformer0"/>
            </v-layer>
          </v-stage>
        </div>
        <div class="bg-yellow-400">

          <v-stage
              :config="{
              width: configKonva.width / 2 - 15,
              height: configKonva.height / 2 - 15,
            }"
              @mousedown="handleStageMouseDown(1, $event)"
              @touchstart="handleStageMouseDown(1, $event)"
          >
            <v-layer
                :config="{
              x: 0,
              y: 0,
              width: configKonva.width / 2 - 15,
              height: configKonva.height / 2 - 15,
            }"
            >
              <v-image
                  v-if="images[1]"
                  name="image-1"
                  :config="{
                  x: 0,
                  y: 0,
                    image: this.images[1].image,
                    draggable: true,
                    name: 'image-1'
                  }"
                  @transformend="handleTransformEnd"
              />
              <v-transformer ref="transformer1"/>
            </v-layer>
          </v-stage>
        </div>

      </div>
    </div>
    <button @click="exportImage">Download</button>
  </div>
</template>

<script>
const width = 148 * 9;
const height = 105 * 9;

import SidebarMenu from "@/components/SidebarMenu.vue";
import Konva from 'konva';

export default {
  name: 'App',
  components: {
    SidebarMenu
  },
  data() {
    return {
      configKonva: {
        width: width,
        height: height
      },
      images: [],
      selectedShapeName: '',
    };
  },
  mounted() {
    const image = new window.Image();
    image.src = "https://konvajs.org/assets/yoda.jpg";
    image.onload = () => {
      // set image only when it is loaded
      for (let i = 0; i < 4; i++) {
        this.images[i] = {
          image: image,
          name: 'image-' + i,
        };
      }
    };
    let stages = [];
    stages.push( new Konva.Stage({
      container: 'container_0',
      width: width,
      height: height
    }) );
    stages.push( new Konva.Stage({
      container: 'container_1',
      width: width,
      height: 30
    }) );

    stages[0].get('#yodaImage')[0].image(image);
    stages[0].draw();


  },
  methods: {
    exportImage() {
      console.log("export!");

    },
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const rect = this.images.find(
          (r) => r.name === this.selectedShapeName
      );
      // update the state
      rect.x = e.target.x();
      rect.y = e.target.y();
      rect.rotation = e.target.rotation();
      rect.scaleX = e.target.scaleX();
      rect.scaleY = e.target.scaleY();

      // change fill
      rect.fill = Konva.Util.getRandomColor();
    },
    handleStageMouseDown(id, e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';
        this.updateTransformer(id);
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
          e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }
      // find clicked rect by its name
      const name = e.target.name();
      const rect = this.images.find((r) => r.name === name);
      if (rect) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = '';
      }
      this.updateTransformer(id);
    },
    updateTransformer(id) {
      // here we need to manually attach or detach Transformer node
      const {selectedShapeName} = this;

      const transformerNode = Object.values(this.$refs).find((t,v) => v === id)?.getNode();
      const stage = transformerNode.getStage();

      const selectedNode = stage.findOne('.' + selectedShapeName);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }
    },
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
  width: calc(148px * 9);
  height: calc(105px * 9);
  background-color: #00bd7e;
}

.konva {
  width: 100%;
  height: 100%;
}
</style>
