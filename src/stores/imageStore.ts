import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ImageData } from '../types/types';

export const useImageStore = defineStore('imageStore', {
    state: () => ({
        image1: useLocalStorage('pinia/images/1', { index: 1, attributes: {}, image: '', selected: false } as ImageData),
        image2: useLocalStorage('pinia/images/2', { index: 2, attributes: {}, image: '', selected: false } as ImageData),
        image3: useLocalStorage('pinia/images/3', { index: 3, attributes: {}, image: '', selected: false } as ImageData),
        image4: useLocalStorage('pinia/images/4', { index: 4, attributes: {}, image: '', selected: false } as ImageData),
        image5: useLocalStorage('pinia/images/5', { index: 5, attributes: {}, image: '', selected: false } as ImageData),
    }),

    actions: {
        getImage(index: number) {
            return this.get(index).image;
        },
        setImage(index: number, image: string) {
            this.get(index).image = image;
        },
        update(index: number, attributes: object) {
            this.get(index).attributes = attributes;
        },
        destroy(index: number) {
            let image = this.get(index);
            image.image = '';
            image.attributes = {};
            image.selected = false;
        },
        get(index: number) {
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
        }
    },
})