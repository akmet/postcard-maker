import Konva from "konva";
import { useStageStore } from "../stores/stageStore";
import getStageElementsByTemplate from "./getStageElementsByTemplate";
import { usePersistentStore } from "../stores/persistentStore";


export default function (event: Event) {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) {
        throw new Error("target is not select element");
    }
    const layout = Number.parseInt(target.value);
    const persistentStore = usePersistentStore();
    if (persistentStore.layout == layout) {
        throw new Error("cannot change layout to current layout")
    }
    persistentStore.setLayout(layout);
    const stage = useStageStore().stage as Konva.Stage;

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
