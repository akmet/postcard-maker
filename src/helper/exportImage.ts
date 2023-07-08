import Konva from "konva";
import { useStageStore } from "../stores/stageStore";


export default function (event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) {
        return;
    }
    const method = event.target.value;
    event.target.value = "-1";
    const filename = prompt("Dateiname ohne Dateiendung", "postkarte");
    if (filename === null || filename.length < 3) {
        return;
    }
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