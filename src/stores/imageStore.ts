import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useImageStore = defineStore('imageStore', {
    state: () => ({
        image1: useLocalStorage('pinia/images/1', ''),
        image2: useLocalStorage('pinia/images/2', ''),
        image3: useLocalStorage('pinia/images/3', ''),
        image4: useLocalStorage('pinia/images/4', ''),
        image5: useLocalStorage('pinia/images/5', ''),
    }),

    actions: {
        getImage(item: number) {
            switch (item) {
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
                    return '';
            }
        },
        setImage(item: number, image: string) {
            switch (item) {
                case 1:
                    this.image1 = image;
                    break;
                case 2:
                    this.image2 = image;
                    break;
                case 3:
                    this.image3 = image;
                    break;
                case 4:
                    this.image4 = image;
                    break;
                case 5:
                    this.image5 = image;
                    break;
            }
        },
    },
})