import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { TextData, ImageData, Layout } from '../types/types';
import { toRaw } from 'vue';
export const usePersistentStore = defineStore('persistentStore', {

    state: () => ({
        texts: useLocalStorage('pinia/texts', [] as TextData[]),
        image1: useLocalStorage('pinia/images/1', { index: 1, attributes: {}, image: '', selected: false } as ImageData),
        image2: useLocalStorage('pinia/images/2', { index: 2, attributes: {}, image: '', selected: false } as ImageData),
        image3: useLocalStorage('pinia/images/3', { index: 3, attributes: {}, image: '', selected: false } as ImageData),
        image4: useLocalStorage('pinia/images/4', { index: 4, attributes: {}, image: '', selected: false } as ImageData),
        image5: useLocalStorage('pinia/images/5', { index: 5, attributes: {}, image: '', selected: false } as ImageData),
        gap: useLocalStorage('pinia/stage/gap', 0),
        layout: useLocalStorage('pinia/stage/layout', Layout.TwoByTwo),
        border: useLocalStorage('pinia/stage/border', 0),
        _undo: [] as string[],
        _redo: [] as string[],
    }),
    actions: {
        createText(id: string, attributes: string) {
            this.changed(1);
            const text = {
                id: id,
                attributes: attributes,
                selected: false,
            } as TextData;

            this.texts.push(text);

            return text;
        },
        updateText(id: string, attributes: string) {
            this.changed(2);
            let index = this.texts.findIndex(i => i.id === id);
            this.texts[index].attributes = attributes;
        },
        destroyText(id: string) {
            this.changed(3);
            this.texts = this.texts.filter(i => i.id !== id);
        },
        selectText(id: string) {
            this.texts.forEach((value: TextData) => value.selected = value.id === id)
        },
        selectedText() {
            return this.texts.find((text: TextData) => text.selected === true);
        },
        getImage(index: number) {
            return this._getImage(index).image;
        },
        setImage(index: number, image: string | null, attributes: object) {
            const _image = this._getImage(index);
            if (attributes) {
                _image.attributes = attributes;
            }
            if (image) {
                _image.image = image;
            }
        },
        updateImage(index: number, attributes: object) {
            this.changed(5);
            this._getImage(index).attributes = attributes;
        },
        destroyImage(index: number) {
            this.changed(6);
            let image = this._getImage(index);
            image.image = '';
            image.attributes = {};
            image.selected = false;
        },
        _getImage(index: number) {
            switch (index) {
                case 1:
                    return this.image1;
                case 2:
                    return this.image2;
                case 3:
                    return this.image3;
                case 4:
                    return this.image4;
                case 5:
                    return this.image5;
                default:
                    throw new Error('Ungültige Bildid angegeben.');
            }
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
        undo() {
            let step = this._undo.pop();
            if (!step) {
                console.log("undo is empty");
                return false;
            }
            this._redo.push(this.toRawString());
            this.fromRawString(step);
            return true;
        },
        redo() {
            let step = this._redo.pop();
            if (!step) {
                console.log("redo is empty");
                return false;
            }
            this._undo.push(step);
            this.fromRawString(step);
            return true;
        },
        changed(i: number) {
            console.log("registered change", i);
            this._undo.push(this.toRawString());
            this._redo = [];
        },
        toRawString() {
            return JSON.stringify({
                texts: toRaw(this.texts),
                image1: toRaw(this.image1),
                image2: toRaw(this.image2),
                image3: toRaw(this.image3),
                image4: toRaw(this.image4),
                image5: toRaw(this.image5),
                gap: toRaw(this.gap),
                layout: toRaw(this.layout),
                border: toRaw(this.border),
            });
        },
        fromRawString(step: string) {
            let state = JSON.parse(step);
            this.texts = state.texts;
            this.image1 = state.image1;
            this.image2 = state.image2;
            this.image3 = state.image3;
            this.image4 = state.image4;
            this.image5 = state.image5;
            this.image5 = state.image5;
            this.layout = state.layout;
            this.border = state.border;
        }
    },
})