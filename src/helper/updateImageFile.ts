import Konva from "konva";
import { useStageStore } from "../stores/stageStore";
import { useImageStore } from "../stores/imageStore";

export default function (item: number) {
    const img = new window.Image();

    img.src = useImageStore().getImage(item);

    img.onload = () => {

        const group_texts = useStageStore().group_texts as Konva.Group[] | null;

        let group = group_texts?.find((node: Konva.Group) => node.name() === 'Bild ' + item);

        if (!group) {
            throw new Error('Kann Gruppe für Bild nicht ermitteln.');
        }
        let image = group.findOne((node: Node) => node instanceof Konva.Image) as Konva.Image;

        if (image) {
            image.image(img);
            image.width(group.clipWidth());
            image.height((group.clipWidth() / img.width) * img.height);
            image.setAttrs({ imgWidth: img.width, imgHeight: img.height });
        }
        else {
            const newImage = new Konva.Image({
                x: group.clipX(),
                y: group.clipY(),
                width: group.clipWidth(),
                height: (group.clipWidth() / img.width) * img.height,
                draggable: true,
                image: img,
            }).setAttrs({ imgWidth: img.width, imgHeight: img.height })

            group.add(
                newImage
            );
        }
    };
}