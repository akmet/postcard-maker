import { defineStore } from 'pinia';
import type { TextData, ImageData } from '../types/types';
import { Layout } from '../types/types';
import { toRaw } from 'vue';
import { useLocalStorage } from '@vueuse/core';

function onError(error: unknown) {
  if (error instanceof DOMException && error.message === 'The quota has been exceeded.') {
    if (
      confirm(
        'Die maximale Dateigröße ist erreicht. Sollen alte Bilder aus der Historie entfernt werden?'
      )
    ) {
      const store = usePersistentStore();
      const keysToKeep = new Set([
        store.image1.image,
        store.image2.image,
        store.image3.image,
        store.image4.image,
        store.image5.image
      ]);
      for (const key of store.images.keys()) {
        if (!keysToKeep.has(key)) {
          store.images.delete(key);
        }
      }
    }
  }
}

type StateSnapshot = {
  texts: TextData[];
  image1: ImageData;
  image2: ImageData;
  image3: ImageData;
  image4: ImageData;
  image5: ImageData;
  gap: number;
  layout: Layout;
  border: number;
};

export const usePersistentStore = defineStore('persistentStore', {
  state: () => ({
    texts: useLocalStorage('pinia/texts', [] as TextData[]),
    image1: useLocalStorage(
      'pinia/images/1',
      { index: 1, attributes: {}, image: null, selected: false } as ImageData,
      { onError }
    ),
    image2: useLocalStorage(
      'pinia/images/2',
      { index: 2, attributes: {}, image: null, selected: false } as ImageData,
      { onError }
    ),
    image3: useLocalStorage(
      'pinia/images/3',
      { index: 3, attributes: {}, image: null, selected: false } as ImageData,
      { onError }
    ),
    image4: useLocalStorage(
      'pinia/images/4',
      { index: 4, attributes: {}, image: null, selected: false } as ImageData,
      { onError }
    ),
    image5: useLocalStorage(
      'pinia/images/5',
      { index: 5, attributes: {}, image: null, selected: false } as ImageData,
      { onError }
    ),
    gap: useLocalStorage('pinia/stage/gap', 0, { onError }),
    layout: useLocalStorage('pinia/stage/layout', Layout.TwoByTwo, { onError }),
    border: useLocalStorage('pinia/stage/border', 0, { onError }),
    images: useLocalStorage('pinia/images/store', new Map<string, string>(), { onError }),
    undoStore: [] as string[],
    redoStore: [] as string[]
  }),
  actions: {
    createText(id: string, attributes: string): TextData {
      this.changed();
      const text: TextData = { id, attributes, selected: false };
      this.texts.push(text);
      return text;
    },
    updateText(id: string, attributes: string) {
      this.changed();
      const index = this.texts.findIndex((t) => t.id === id);
      if (index !== -1) {
        this.texts[index].attributes = attributes;
      }
    },
    destroyText(id: string) {
      this.changed();
      this.texts = this.texts.filter((text: TextData) => text.id !== id);
    },
    getImage(index: number): string | undefined {
      const uuid = this.getImageData(index).image;
      if (!uuid) return undefined;
      return this.images.get(uuid);
    },
    setImage(index: number, image: string | null, attributes: Record<string, unknown>) {
      const imageData = this.getImageData(index);
      if (attributes) {
        imageData.attributes = attributes;
      }
      if (image) {
        const uuid = crypto.randomUUID();
        this.images.set(uuid, image);
        imageData.image = uuid;
      }
    },
    updateImage(index: number, attributes: Record<string, unknown>) {
      this.changed();
      this.getImageData(index).attributes = attributes;
    },
    destroyImage(index: number) {
      this.changed();
      const image = this.getImageData(index);
      image.image = '';
      image.attributes = {};
      image.selected = false;
    },
    getImageData(index: number): ImageData {
      if (index === 1) return this.image1;
      if (index === 2) return this.image2;
      if (index === 3) return this.image3;
      if (index === 4) return this.image4;
      if (index === 5) return this.image5;
      throw new Error(`Invalid image index: ${index}`);
    },
    setGap(gap: number) {
      this.changed();
      this.gap = gap;
    },
    setLayout(layout: Layout) {
      this.changed();
      this.layout = layout;
    },
    setBorder(border: number) {
      this.changed();
      this.border = border;
    },
    undo(): boolean {
      const step = this.undoStore.pop();
      if (!step) return false;
      this.redoStore.push(this.toRawString());
      this.fromRawString(step);
      return true;
    },
    redo(): boolean {
      const step = this.redoStore.pop();
      if (!step) return false;
      this.undoStore.push(this.toRawString());
      this.fromRawString(step);
      return true;
    },
    changed() {
      this.undoStore.push(this.toRawString());
      this.redoStore = [];
    },
    toRawString(): string {
      return JSON.stringify({
        texts: toRaw(this.texts),
        image1: toRaw(this.image1),
        image2: toRaw(this.image2),
        image3: toRaw(this.image3),
        image4: toRaw(this.image4),
        image5: toRaw(this.image5),
        gap: toRaw(this.gap),
        layout: toRaw(this.layout),
        border: toRaw(this.border)
      } satisfies StateSnapshot);
    },
    internalFromState(state: StateSnapshot) {
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
    fromRawString(step: string) {
      this.internalFromState(JSON.parse(step) as StateSnapshot);
    },
    toJson(): string {
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
        undoStore: toRaw(this.undoStore),
        redoStore: toRaw(this.redoStore)
      });
    },
    fromJson(json: string) {
      const state = JSON.parse(json);
      this.internalFromState(state as StateSnapshot);
      this.images = new Map(state.images);
      this.undoStore = state.undoStore ?? [];
      this.redoStore = state.redoStore ?? [];
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
      this.undoStore = [];
      this.redoStore = [];
    }
  }
});
