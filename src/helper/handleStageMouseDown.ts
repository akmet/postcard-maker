import Konva from "konva";
import attachNodeToTransformer from "./attachNodeToTransformer";

export default function (event: Konva.KonvaEventObject<MouseEvent>) {

    let target = event.target;
    if (!(target instanceof Konva.Node)) {
        return;
    }

    if (target instanceof Konva.Stage) {
        const layers = target.getLayers();
        if (layers) {
            attachNodeToTransformer(layers);
        }
        return;
    }

    if (target.getParent() instanceof Konva.Transformer) {
        return;
    }
    if (target instanceof Konva.Image || target instanceof Konva.Text) {
        let layers = target.getStage()?.getLayers();
        if (layers) {
            attachNodeToTransformer(layers, target);
        }
        return;
    }
}