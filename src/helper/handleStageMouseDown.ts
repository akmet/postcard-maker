import Konva from "konva";
import attachNodeToTransformer from "./attachNodeToTransformer";
import { useStageStore } from "../stores/stageStore";

export default function (target: Konva.Stage | Konva.Shape) {

    if (!(target instanceof Konva.Node)) {
        return;
    }

    if (target instanceof Konva.Rect && target.id() === useStageStore().background_rect?.id()) {
        let layers = target.getStage()?.getLayers();
        if (layers) {
            attachNodeToTransformer(layers);
        }
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