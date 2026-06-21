import type Konva from 'konva';
import { defineStore } from 'pinia';

export const useStageStore = defineStore('stage', {
  state: () => ({
    stage: null as Konva.Stage | null,
    dimensions: {
      width: 1748,
      height: 1240
    },
    groupTexts: null as Konva.Group | null,
    groupImages: null as Konva.Group | null,
    backgroundRect: null as Konva.Rect | null,
    selectedNode: undefined as Konva.Node | undefined
  }),

  actions: {
    setStage(stage: Konva.Stage) {
      this.stage = stage;
    },
    setGroupTexts(group: Konva.Group) {
      this.groupTexts = group;
    },
    setGroupImages(group: Konva.Group) {
      this.groupImages = group;
    },
    setBackgroundRect(rect: Konva.Rect) {
      this.backgroundRect = rect;
    },
    selectNode(node: Konva.Node | undefined) {
      this.selectedNode = node;
    }
  }
});
