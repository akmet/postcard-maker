import Konva from "konva";
import { usePersistentStore } from "../stores/persistentStore";
import { useStageStore } from "../stores/stageStore";
import { ImageData } from "../types/types";
import { KonvaEventObject } from "konva/lib/Node";

export function createImage(target: HTMLInputElement, index: number) {
    if (target.files?.length !== 1) {
        throw new Error("Error: files hat nicht ein Element");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result;
        if (typeof base64String !== 'string') {
            throw new Error("Error: Image not string");
        }

        usePersistentStore().setImage(index, base64String, {});
        usePersistentStore().updateImage(index, { scaleX: 1, scaleY: 1 });
        loadImage(index);
    };
    reader.readAsDataURL(target.files[0]);
}

export function loadImage(index: number) {

    const img = new window.Image();
    const persistentStore = usePersistentStore();
    const imageData = persistentStore._getImage(index);
    img.src = imageData.image;

    img.onload = () => {
        const stage = useStageStore().stage as Konva.Stage;

        let group = stage.findOne((node: Node) => node instanceof Konva.Group && node.name() === 'Bild ' + index) as Konva.Group;
        let konvaImage = group.findOne((node: Node) => node instanceof Konva.Image) as Konva.Image;
        if (!konvaImage) {
            konvaImage = new Konva.Image({ draggable: true, image: undefined });
            konvaImage.on('dragend transformend', ($event: KonvaEventObject<any>) => {
                const konvaImage = $event.currentTarget as Konva.Image;
                const { image, ...attributes } = konvaImage.getAttrs();
                usePersistentStore().updateImage(index, attributes);
            });
        }
        konvaImage
            .image(img)
            .setAttrs({
                width: group.clipWidth(),
                height: (group.clipHeight() / img.width) * img.height,
                x: group.clipX(),
                y: group.clipY(),
                imgWidth: img.width,
                imgHeight: img.height,
                ...imageData.attributes,
            })

        const { image, ...attributes } = konvaImage.getAttrs();
        persistentStore.setImage(index, null, attributes);

        group.add(konvaImage);
    };
}

export function destroyImage(image: ImageData) {
    const group_images = useStageStore().group_images as Konva.Group;
    if (!group_images) {
        throw new Error("Cannot destroy image when stage not set-up");
    }
    group_images.findOne((node: Konva.Node) => node instanceof Konva.Image && node.name() === 'Bild ' + image.index)?.destroy();
    usePersistentStore().destroyImage(image.index);
}

export function loadImages() {
    for (let index of [1, 2, 3, 4, 5]) {
        loadImage(index);
    }
}