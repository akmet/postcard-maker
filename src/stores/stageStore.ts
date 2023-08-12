import Konva from 'konva'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { Layout } from '../types/types';

export const useStageStore = defineStore('stage', {
    state: () => ({
        stage: null as Konva.Stage | null,
        gap: useLocalStorage('pinia/stage/gap', 0),
        dimensions: {
            width: 1748,
            height: 1240,
        },
        layout: useLocalStorage('pinia/stage/border', Layout.TwoByTwo),
        border: useLocalStorage('pinia/stage/border', 0),
        group_texts: null as Konva.Group | null,
        group_images: null as Konva.Group | null,
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
        setBorder(border: number) {
            this.border = border;
        },
        setGroupTexts(group: Konva.Group) {
            this.group_texts = group;
        },
        setGroupImages(group: Konva.Group) {
            this.group_images = group;
        },
    },
})