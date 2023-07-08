import Konva from "konva";
import { useStageStore } from "../stores/stageStore";
import getStageElementsByTemplate from "./getStageElementsByTemplate";


export default function (event: Event) {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) {
        console.log("target is not select element");
        return;
    }
    const layout = Number.parseInt(target.value);
    const store = useStageStore();
    if (store.layout == layout) {
        console.log("cannot change layout to current layout")
        return;
    }
    store.setLayout(layout);
    const stage = store.stage as Konva.Stage;

    const layers = getStageElementsByTemplate();
    for (let layer of layers) {
        const group = stage.findOne((node: Konva.Node) => node instanceof Konva.Group && node.name() === layer.name) as Konva.Group;
        group.clip(
            {
                x: group.getAttr('baseX') + layer.x,
                y: group.getAttr('baseY') + layer.y,
                width: layer.width,
                height: layer.height,
            }
        );
        const image = group.findOne((node: Konva.Image) => node instanceof Konva.Image) as Konva.Image;
        if (!(image instanceof Konva.Image)) {
            continue;
        }
        image.width(layer.width)
        image.height((layer.width / image.getAttr('imgWidth')) * image.getAttr('imgHeight'))
            .x(group.clipX())
            .y(group.clipY());
        image.draw();
    }
}
