import Konva from "konva";
import attachNodeToTransformer from "./attachNodeToTransformer";

export default function (event: Konva.KonvaEventObject<MouseEvent>) {

    let target = event.target;
    console.log(target);
    if (!(target instanceof Konva.Node)) {
        console.log("Target is not Node")
        return;
    }

    if (target instanceof Konva.Stage) {
        console.log("Target is stage");
        const layers = target.getLayers();
        if (layers) {
            attachNodeToTransformer(layers);
        }
        return;
    }

    if (target.getParent() instanceof Konva.Transformer) {
        return;
    }
    if (target instanceof Konva.Image) {
        let layers = target.getStage()?.getLayers();
        if (layers) {
            attachNodeToTransformer(layers, target);
        }
        return;
    }
    console.log("Leider nichts gefunden", target.getClassName(), target.getParent().getClassName());
}