import { defineStore } from 'pinia'
import { TextData, ImageData, Layout, ChangeType, Config } from '../types/types';
import { toRaw } from 'vue';
import {useLocalStorage} from '@vueuse/core'
import { loadImages } from '../helper/imageHelper';
import { initializeTexts } from '../helper/textHelper';
import { reloadBorder } from '../helper/updateBorder';
import { reloadGap } from '../helper/updateGap';

function onError(error: any) {
    if(error instanceof DOMException && error.message === 'The quota has been exceeded.') {
        if(confirm('Die maximale Dateigröße ist erreicht. Sollen alte Bilder aus der Historie entfernt werden?')) {
            const keysToKeepSet = new Set([
                usePersistentStore().image1.image,
                usePersistentStore().image2.image,
                usePersistentStore().image3.image,
                usePersistentStore().image4.image,
                usePersistentStore().image5.image,
            ]);
            let counter = 0;
            for (const key of usePersistentStore().images.keys()) {
                if (!keysToKeepSet.has(key)) {
                    usePersistentStore().images.delete(key);
                    counter++;
                }
            }
        }
    }
}

export const usePersistentStore = defineStore('persistentStore', {
    state: () => ({
        texts: useLocalStorage('pinia/texts', [] as TextData[]),
        image1: useLocalStorage('pinia/images/1', { index: 1, attributes: {}, image: null, selected: false } as ImageData, {onError: onError}),
        image2: useLocalStorage('pinia/images/2', { index: 2, attributes: {}, image: null, selected: false } as ImageData, {onError: onError}),
        image3: useLocalStorage('pinia/images/3', { index: 3, attributes: {}, image: null, selected: false } as ImageData, {onError: onError}),
        image4: useLocalStorage('pinia/images/4', { index: 4, attributes: {}, image: null, selected: false } as ImageData, {onError: onError}),
        image5: useLocalStorage('pinia/images/5', { index: 5, attributes: {}, image: null, selected: false } as ImageData, {onError: onError}),
        gap: useLocalStorage('pinia/stage/gap', 0, {onError: onError}),
        layout: useLocalStorage('pinia/stage/layout', Layout.TwoByTwo, {onError: onError}),
        border: useLocalStorage('pinia/stage/border', 0, {onError: onError}),
        images: useLocalStorage('pinia/images/store', new Map<string, string>(), {onError: onError}),
        _undo: [] as string[],
        _redo: [] as string[],
        config: {} as Config,
    }),
    actions: {
        createText(id: string, attributes: string) {
            this.changed(ChangeType.TextCreate);
            const text = {
                id: id,
                attributes: attributes,
                selected: false,
            } as TextData;

            this.texts.push(text);

            return text;
        },
        updateText(id: string, attributes: string) {
            this.changed(ChangeType.TextUpdate);
            let index = this.texts.findIndex(i => i.id === id);
            this.texts[index].attributes = attributes;
        },
        destroyText(id: string) {
            this.changed(ChangeType.TextDestroy);
            this.texts = this.texts.filter((text: TextData) => text.id !== id);
        },
        selectText(id: string) {
            this.texts.forEach((text: TextData) => text.selected = text.id === id)
        },
        selectedText() {
            return this.texts.find((text: TextData) => text.selected);
        },
        getImage(index: number) {
            const uuid = this._getImage(index).image;
            if (!uuid) {
                return '';
            }
            return this.images.get(uuid);
        },
        setImage(index: number, image: string | null, attributes: object) {
            const _image = this._getImage(index);
            if (attributes) {
                _image.attributes = attributes;
            }
            if (image) {
                const uuid = crypto.randomUUID();
                this.images.set(uuid, image);
                _image.image = uuid;
            }
        },
        updateImage(index: number, attributes: object) {
            this.changed(ChangeType.ImageUpdate);
            this._getImage(index).attributes = attributes;
        },
        destroyImage(index: number) {
            this.changed(ChangeType.ImageDestroy);
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
            this.changed(ChangeType.GapUpdate);
            this.gap = gap;
        },
        setLayout(layout: Layout) {
            this.changed(ChangeType.LayoutUpdate);
            this.layout = layout;
        },
        setBorder(border: number) {
            this.changed(ChangeType.BorderUpdate);
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
        changed(type: ChangeType) {
            console.log("registered change", type);
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
            this.gap = state.gap;
            this.layout = state.layout;
            this.border = state.border;
        },
        toJson() {
            return JSON.stringify({
                texts: toRaw(this.texts),
                image1: toRaw(this.image1),
                image2: toRaw(this.image2),
                image3: toRaw(this.image3),
                image4: toRaw(this.image4),
                image5: toRaw(this.image5),
                images: Array.from(toRaw(this.images).entries()),
                gap: toRaw(this.gap),
                layout: toRaw(this.layout),
                border: toRaw(this.border),
                _undo: toRaw(this._undo),
                _redo: toRaw(this._redo),
            });
        },
        fromJson(step: string) {
            let state = JSON.parse(step);
            this.texts = state.texts;
            this.image1 = state.image1;
            this.image2 = state.image2;
            this.image3 = state.image3;
            this.image4 = state.image4;
            this.image5 = state.image5;
            this.images = new Map(state.images);
            this.gap = state.gap;
            this.layout = state.layout;
            this.border = state.border;
            this._undo = state._undo;
            this._redo = state._redo;
        },
        clear() {
            this.texts = [];
            this.image1 = { index: 1, attributes: {}, image: '', selected: false };
            this.image2 = { index: 2, attributes: {}, image: '', selected: false };
            this.image3 = { index: 3, attributes: {}, image: '', selected: false };
            this.image4 = { index: 4, attributes: {}, image: '', selected: false };
            this.image5 = { index: 5, attributes: {}, image: '', selected: false };
            this.images = new Map<string, string>();
            this.gap = 0;
            this.layout = Layout.TwoByTwo;
            this.border = 0;
            this._undo = [];
            this._redo = [];

            loadImages();  // TODO: Not working
            initializeTexts(); // TODO: Not working
            reloadBorder();
            reloadGap()
        },

    },
})