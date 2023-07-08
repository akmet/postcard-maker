import Konva from "konva";
import { useStageStore } from "../stores/stageStore";


export default function () {
    const stageContainer = document.getElementById('stageContainer');
    if (!(stageContainer instanceof HTMLDivElement)) {
        return;
    }
    const stage = useStageStore().stage as Konva.Stage;
    stage.width(stageContainer.offsetWidth);
    stage.height(stageContainer.offsetHeight);
}