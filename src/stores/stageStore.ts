import Konva from 'konva'
import { defineStore } from 'pinia'

export const useStageStore = defineStore('stage', {
    state: () => ({
        stage: null as Konva.Stage | null,
        gap: 0,
    }),

    actions: {
        setStage(stage: Konva.Stage) {
            this.stage = stage;
        },
        setGap(gap: number) {
            this.gap = gap;
        },
    },
})