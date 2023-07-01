import Konva from "konva";


export default function (layer: Konva.Layer, node?: Konva.Node) {
    let transformer = layer.findOne((node: Konva.Node) => node instanceof Konva.Transformer) as Konva.Transformer;
    if (node === transformer.getNode()) {
        return;
    }
    if (node) {
        transformer.nodes([node]);
    } else {
        transformer.nodes([]);
    }
}
