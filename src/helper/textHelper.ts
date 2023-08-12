import Konva from "konva";
import { useTextStore } from "../stores/textStore";
import { useStageStore } from "../stores/stageStore";
import { v4 as uuidv4 } from 'uuid';
import { TextData } from "../types/types";
import { KonvaEventObject } from "konva/lib/Node";

export function createText() {

    const attributes = '{"attrs":{"x":200,"y":600,"text":"Viele Grüße","fontSize":80,"fontFamily":"American Typewriter","fill":"#555555","width":300,"padding":5,"align":"center","stroke":"#ffffff","strokeWidth":0,"draggable":true},"className":"Text"}'

    loadText(useTextStore().create(uuidv4(), attributes));
}

export function loadText(text: TextData) {
    const group_texts = useStageStore().group_texts as Konva.Group;
    if (!group_texts) {
        throw new Error("Cannot load text when stage not set-up");
    }
    const konvaText = Konva.Text.create(text.attributes)

        .on('dragend transformend', ($event: KonvaEventObject<any>) => {
            const text = $event.currentTarget as Konva.Text;
            useTextStore().update(text.id(), text.toJSON());

        })
        .on('transform', ($event: KonvaEventObject<any>) => {
            const text = $event.currentTarget as Konva.Text;
            text.setAttrs({
                width: Math.max(text.width() * text.scaleX(), 20),
                height: Math.max(text.height() * text.scaleY(), 20),
                scaleX: 1,
                scaleY: 1,
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
        throw new Error("Cannot load text when stage not set-up");
    }
    group_texts.findOne((node: Konva.Node) => node instanceof Konva.Text && node.id() === text.id).destroy();
    useTextStore().destroy(text.id);
}