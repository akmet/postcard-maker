import Konva from "konva";
import { useStageStore } from "../stores/stageStore";

export default function (factor: number) {
    const stage = useStageStore().stage
    if (!(stage instanceof Konva.Stage)) {
        throw new Error("stage is not an stage");
    }

    stage.scale({
        x: stage.scaleX() + factor,
        y: stage.scaleY() + factor,
    })
        .draw()
}