import Konva from 'konva'
import { defineStore } from 'pinia'
import { Layout, TextData } from '../types/types';

export const useStageStore = defineStore('stage', {
    state: () => ({
        stage: null as Konva.Stage | null,
        gap: 0,
        dimensions: {
            width: 1748,
            height: 1240,
        },
        layout: Layout.TwoByTwo,
        texts: [] as TextData[],
        border: 0,
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
        addText(text: TextData) {
            this.texts.push(text);
            let group_texts = this.stage?.findOne((node: Node) => node instanceof Konva.Group && node.name() === 'group_texts') as Konva.Group;
            group_texts.add(text.text);
        },
        setBorder(border: number) {
            this.border = border;
        },
    },
})