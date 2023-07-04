import Konva from "konva";
import { useStageStore } from "../stores/stageStore";

export default function (factor: number) {
    const stage = useStageStore().stage
    if (!(stage instanceof Konva.Stage)) {
        console.log("stage is not an stage");
        return;
    }

    stage.scale({
        x: stage.scaleX() + factor,
        y: stage.scaleY() + factor,
    })
        .draw()
}