import Konva from 'konva';
import { usePersistentStore } from '../stores/persistentStore';
import { useStageStore } from '../stores/stageStore';
import { v4 as uuidv4 } from 'uuid';
import type { TextData } from '../types/types';
import type { KonvaEventObject } from 'konva/lib/Node';

export function createText() {
  const attributes =
    '{"attrs":{"x":200,"y":600,"text":"Viele Grüße","fontSize":80,"fontFamily":"American Typewriter","fill":"#555555","width":300,"padding":5,"align":"center","stroke":"#ffffff","strokeWidth":0,"draggable":true},"className":"Text"}';

  loadText(usePersistentStore().createText(uuidv4(), attributes));
}

export function loadText(text: TextData) {
  const group_texts = useStageStore().group_texts as Konva.Group;
  if (!group_texts) {
    throw new Error('Cannot load text when stage not set-up');
  }
  const konvaText = Konva.Text.create(text.attributes)

    .on('dragend transformend', ($event: KonvaEventObject<unknown>) => {
      const currentText = $event.currentTarget as Konva.Text;
      usePersistentStore().updateText(currentText.id(), currentText.toJSON());
    })
    .on('transform', ($event: KonvaEventObject<unknown>) => {
      const currentText = $event.currentTarget as Konva.Text;
      currentText.setAttrs({
        width: Math.max(currentText.width() * currentText.scaleX(), 20),
        height: Math.max(currentText.height() * currentText.scaleY(), 20),
        scaleX: 1,
        scaleY: 1
      });
    }) as Konva.Text;
  if (konvaText.id() === '') {
    konvaText.id(text.id);
  }
  group_texts.add(konvaText);
}

export function destroyText(text: TextData) {
  const group_texts = useStageStore().group_texts as Konva.Group;
  if (!group_texts) {
    throw new Error('Cannot load text when stage not set-up');
  }
  group_texts
    .findOne((node: Konva.Node) => node instanceof Konva.Text && node.id() === text.id)
    ?.destroy();
  usePersistentStore().destroyText(text.id);
}

export function reloadTexts() {
  const group_texts = useStageStore().group_texts as Konva.Group;
  if (!group_texts) {
    throw new Error('Cannot reload text when stage not set-up');
  }
  group_texts.destroyChildren();
  for (let text of usePersistentStore().texts) {
    loadText(text);
  }
}

export function initializeTexts() {
  const persistentStore = usePersistentStore();
  const texts = persistentStore.texts as TextData[];

  for (let text of texts) {
    loadText(text);
  }
}
