export default function (layer, node) {
    const transformer = layer.findOne((node) => node.getClassName() === 'Transformer');
    if (node === transformer.node()) {
        return;
    }
    if (node) {
        transformer.nodes([node]);
    } else {
        transformer.nodes([]);
    }
}
