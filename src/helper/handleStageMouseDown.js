export default function (e) {

    if (e.target === e.target.getStage()) {
        for (let stage of this.stages) {
            const layer = stage.findOne((node) => node.getClassName() === 'Layer');
            this.attachNodeToTransformer(layer, null);
        }
        return;
    }

    if (e.target.getParent().getClassName() === 'Transformer') {
        return;
    }
    if (e.target.getClassName() === 'Image') {
        this.attachNodeToTransformer(e.target.getLayer(), e.target);
        return;
    }
    console.log("Leider nichts gefunden", e.target.getClassName(), e.target.getParent().getClassName());
}