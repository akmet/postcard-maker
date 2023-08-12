import Konva from 'konva'
import { defineStore } from 'pinia'

export const useStageStore = defineStore('stage', {
    state: () => ({
        stage: null as Konva.Stage | null,
        dimensions: {
            width: 1748,
            height: 1240,
        },
        group_texts: null as Konva.Group | null,
        group_images: null as Konva.Group | null,
        background_rect: null as Konva.Rect | null,
        selectedNode: undefined as Konva.Node | undefined,
    }),

    actions: {
        setStage(stage: Konva.Stage) {
            this.stage = stage;
        },
        setGroupTexts(group: Konva.Group) {
            this.group_texts = group;
        },
        setGroupImages(group: Konva.Group) {
            this.group_images = group;
        },
        setBackgroundRect(rect: Konva.Rect) {
            this.background_rect = rect;
        },
        selectNode(node: Konva.Node | undefined) {
            this.selectedNode = node;
        }
    },
})