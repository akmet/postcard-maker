import Konva from "konva";
import { useStageStore } from "../stores/stageStore";


export default function () {
    let filename = prompt("Dateiname", "postkarte.png");
    if (filename === null || filename.length < 3) {
        return;
    }
    const stage = useStageStore().stage as Konva.Stage;
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
            a.download = filename;
            a.href = str;
            a.click();
        }
    });
    stage.scale(scale);
}