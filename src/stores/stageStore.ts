import Konva from 'konva'
import { defineStore } from 'pinia'

export const useStageStore = defineStore('stage', {
    state: () => ({
        stage: null as Konva.Stage | null,
    }),

    actions: {
        setStage(stage: Konva.Stage) {
            this.stage = stage;
        }
    },
})