import Konva from "konva";
import { useImageStore } from "../stores/imageStore";
import { useStageStore } from "../stores/stageStore";
import { ImageData } from "../types/types";
import { KonvaEventObject } from "konva/lib/Node";

export function createImage(index: number) {

    const img = new window.Image();

    img.src = useImageStore().getImage(index);

    img.onload = () => {
        const stage = useStageStore().stage as Konva.Stage;

        let group = stage.findOne((node: Node) => node instanceof Konva.Group && node.name() === 'Bild ' + index) as Konva.Group;
        let image = group.findOne((node: Node) => node instanceof Konva.Image) as Konva.Image;
        if (!image) {
            image = new Konva.Image({
                x: group.clipX(),
                y: group.clipY(),
                draggable: true,
                image: undefined,
            })
        }

        image.image(img);
        image.width(group.clipWidth());
        image.height((group.clipWidth() / img.width) * img.height);
        image.setAttrs({ imgWidth: img.width, imgHeight: img.height });
    };

    //const attributes = '{"attrs":{"x":200,"y":600,"text":"Viele Grüße","fontSize":80,"fontFamily":"American Typewriter","fill":"#555555","width":300,"padding":5,"align":"center","stroke":"#ffffff","strokeWidth":0,"draggable":true},"className":"Image"}'

    //loadImage(useImageStore().create(uuidv4(), attributes));
}

export function loadImage(index: number) {

    const img = new window.Image();
    const imageStore = useImageStore();
    const imageData = imageStore.get(index);
    img.src = imageData.image;

    img.onload = () => {
        const stage = useStageStore().stage as Konva.Stage;

        let group = stage.findOne((node: Node) => node instanceof Konva.Group && node.name() === 'Bild ' + index) as Konva.Group;
        let konvaImage = group.findOne((node: Node) => node instanceof Konva.Image) as Konva.Image;
        if (!konvaImage) {
            konvaImage = new Konva.Image({ draggable: true, image: undefined });
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
            .on('dragend transformend', ($event: KonvaEventObject<any>) => {
                const konvaImage = $event.currentTarget as Konva.Image;
                const { image, ...attributes } = konvaImage.getAttrs();
                useImageStore().update(index, attributes);
            })

        const { image, ...attributes } = konvaImage.getAttrs();
        imageStore.update(index, attributes);

        group.add(konvaImage);
    };
}

export function destroyImage(image: ImageData) {
    const group_images = useStageStore().group_images as Konva.Group;
    if (!group_images) {
        throw new Error("Cannot destroy image when stage not set-up");
    }
    group_images.findOne((node: Konva.Node) => node instanceof Konva.Image && node.name() === 'Bild ' + image.index).destroy();
    useImageStore().destroy(image.index);
}

