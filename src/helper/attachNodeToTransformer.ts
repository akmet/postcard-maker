import Konva from "konva";
import { useStageStore } from "../stores/stageStore";


export default function (layers: Konva.Layer[], node?: Konva.Node) {
    for (let layer of layers) {
        let transformer = layer.findOne((node: Konva.Node) => node instanceof Konva.Transformer) as Konva.Transformer;
        if (!transformer) {
            continue;
        }
        if (node instanceof Konva.Node) {
            if (node === transformer.getNode()) {
                continue;
            }
            transformer.nodes([node]);
            layer.moveToTop();
            transformer.moveToTop();
        } else {
            transformer.nodes([]);
        }
        useStageStore().selectNode(node);
    }
}
