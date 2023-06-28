<template>
  <SidebarMenu></SidebarMenu>
  <div class="p-4 ml-64 h-screen">

    <div class="a6-container">
      <v-stage
          @mousedown="handleStageMouseDown"
          @touchstart="handleStageMouseDown"
      >
        <v-layer
            v-for="image in images"
            :key="image.name"
            :config="{
              x: image.x,
              y: image.y,
              width: (configKonva.width / 2) - 15,
              height: (configKonva.height / 2) - 15,
            }"
        >
          <v-image
              :name="image.name"
              :config="{
                  x: image.x,
                  y: image.y,
                    image: image.image,
                    draggable: true,
                    name: image.name
                  }"
              @transformend="handleTransformEnd"
          />
          <v-rect :config="{
                    x: (configKonva.width / 2) - 15,
                    y: 0,
                    width: 30,
                    height: configKonva.height,
                    fill: 'white'
                  }"
          />
          <v-rect :config="{
                    x: 0,
                    y: (configKonva.height / 2) - 15,
                    width: configKonva.width,
                    height: 30,
                    fill: 'white'
                  }"
          />
          <v-transformer ref="transformer"/>
        </v-layer>
      </v-stage>
    </div>
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
  created() {
    const image = new window.Image();
    image.src = "https://konvajs.org/assets/yoda.jpg";
    image.onload = () => {
      // set image only when it is loaded
      for (let i = 0; i < 4; i++) {
        this.images[i] = {
          image: image,
          name: 'image-' + i,
          x: (i % 2) * (width / 2 - 15),
          y: (i % 2) * (height / 2 - 15),
          transformer: null,
        };
      }
    };
  },
  methods: {
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
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';
        this.updateTransformer();
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
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const {selectedShapeName} = this;

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
