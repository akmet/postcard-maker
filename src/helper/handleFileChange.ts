import Konva from "konva";
import { useStageStore } from "../stores/stageStore";

export default function (target: HTMLInputElement, item: number) {
    console.log(target);
    if (target.files?.length !== 1) {
        console.log("Error: files hat nicht ein Element");
        return;
    }
    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(target.files[0]);
    const img = new window.Image();
    img.src = url;

    console.log(url);
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
            console.log("added iamge", group);
        }
    };
}