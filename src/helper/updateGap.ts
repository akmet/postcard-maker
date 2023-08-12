import Konva from "konva";
import { useStageStore } from "../stores/stageStore";
import getStageElementsByTemplate from "./getStageElementsByTemplate";
import { usePersistentStore } from "../stores/persistentStore";


export default function (event: Event) {
    let target = event?.target;
    let stageContainer = document.getElementById('stageContainer');
    if (!(target instanceof HTMLInputElement) || stageContainer === null) {
        return;
    }
    const newGap = Number.parseInt(target.value);
    const store = useStageStore();
    const stage = store.stage as Konva.Stage;
    usePersistentStore().setGap(newGap);

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
    }
}