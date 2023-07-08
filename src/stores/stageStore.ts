import Konva from 'konva'
import { defineStore } from 'pinia'
import { Layout } from '../types/types';

export const useStageStore = defineStore('stage', {
    state: () => ({
        stage: null as Konva.Stage | null,
        gap: 0,
        dimensions: {
            width: 1748,
            height: 1240,
        },
        layout: Layout.TwoByTwo,
    }),

    actions: {
        setStage(stage: Konva.Stage) {
            this.stage = stage;
        },
        setGap(gap: number) {
            this.gap = gap;
        },
        setLayout(layout: Layout) {
            this.layout = layout;
        },
    },
})