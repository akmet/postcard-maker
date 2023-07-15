import Konva from "konva";
import { useStageStore } from "../stores/stageStore";

export default function (event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) {
        return;
    }
    const method = event.target.value;
    event.target.value = "-1";

    const now = new Date();
    let filename = "Postkarte_" + now.toISOString().substring(0, 10) + '_' + now.toLocaleTimeString();

    const stage = useStageStore().stage as Konva.Stage;

    if (method === 'json') {
        const json = stage.toJSON();
        console.log(json);
        return;
    }

    const rect = stage.findOne((node: Node) => node instanceof Konva.Rect) as Konva.Rect;
    const scale = stage.scale();
    stage.scale({
        x: 1,
        y: 1,
    })
    const transformers = stage.find((node: Node) => node instanceof Konva.Transformer) as Konva.Transformer[];

    if (transformers) {
        for (let transformer of transformers) {
            transformer.nodes([]);
        }
    }
    stage.toDataURL({
        x: rect.x(),
        y: rect.y(),
        width: rect.width(),
        height: rect.height(),
        callback(str: string) {
            var a = document.createElement("a");
            a.download = filename + '.png';
            a.href = str;
            a.click();
        }
    });
    stage.scale(scale);

}