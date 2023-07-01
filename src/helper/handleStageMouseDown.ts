import Konva from "konva";
import attachNodeToTransformer from "./attachNodeToTransformer";

export default function (event: Konva.KonvaEventObject<MouseEvent>, stages: Konva.Stage[]) {
    let target = event.target;
    if (!(target instanceof Konva.Node)) {
        return;
    }

    if (target instanceof Konva.Stage) {
        for (let stage of stages) {
            const layer = stage.findOne((node: Konva.Node) => node instanceof Konva.Layer) as Konva.Layer;
            attachNodeToTransformer(layer);
        }
        return;
    }

    if (target.getParent() instanceof Konva.Transformer) {
        return;
    }
    if (target instanceof Konva.Image) {
        let layer = target.getLayer();
        if (layer) {
            attachNodeToTransformer(layer, target);
        }
        return;
    }
    console.log("Leider nichts gefunden", target.getClassName(), target.getParent().getClassName());
}