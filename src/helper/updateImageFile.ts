import Konva from "konva";
import { useStageStore } from "../stores/stageStore";
import { useImageStore } from "../stores/imageStore";

export default function (item: number) {
    const img = new window.Image();

    img.src = useImageStore().getImage(item);

    img.onload = () => {
        const stage = useStageStore().stage as Konva.Stage;

        let group = stage.findOne((node: Node) => node instanceof Konva.Group && node.name() === 'Bild ' + item) as Konva.Group;
        let image = group.findOne((node: Node) => node instanceof Konva.Image) as Konva.Image;
        if (image) {
            image.image(img);
            image.width(group.clipWidth());
            image.height((group.clipWidth() / img.width) * img.height);
            image.setAttrs({ imgWidth: img.width, imgHeight: img.height });
        }
        else {
            group.add(
                new Konva.Image({
                    x: group.clipX(),
                    y: group.clipY(),
                    width: group.clipWidth(),
                    height: (group.clipWidth() / img.width) * img.height,
                    draggable: true,
                    image: img,
                }).setAttrs({ imgWidth: img.width, imgHeight: img.height })
            );
        }
    };
}