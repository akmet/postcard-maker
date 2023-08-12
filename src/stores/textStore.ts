import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { TextData } from '../types/types';
export const useTextStore = defineStore('textStore', {

    state: () => ({
        texts: useLocalStorage('pinia/texts', [] as TextData[]),
    }),
    actions: {
        create(id: string, attributes: string) {
            const text = {
                id: id,
                attributes: attributes,
                selected: false,
            } as TextData;

            this.texts.push(text);

            return text;
        },
        update(id: string, attributes: string) {
            let index = this.texts.findIndex(i => i.id === id);
            console.log(id, index);
            this.texts[index].attributes = attributes;
        },
        destroy(id: string) {
            this.texts = this.texts.filter(i => i.id !== id);
        }
    },
})