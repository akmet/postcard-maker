import Konva from "konva";
import { useStageStore } from "../stores/stageStore";
import handleStageMouseDown from "./handleStageMouseDown";


export default function () {
    let stageContainer = document.getElementById('stageContainer');

    if (!(stageContainer instanceof HTMLDivElement)) {
        return;
    }
    let height = stageContainer.offsetHeight * 0.9
    let width = height * (148 / 105)

    if (width > stageContainer.offsetWidth) {
        width = stageContainer.offsetWidth * 0.9
        height = width * (105 / 148)
    }

    const baseX = (stageContainer.offsetWidth - width) / 2;
    const baseY = (stageContainer.offsetHeight - height) / 2;

    let stage =
        new Konva.Stage({
            container: stageContainer,
            width: stageContainer.offsetWidth,
            height: stageContainer.offsetHeight,
            draggable: true,
        })
            .on('mousedown', (evt) => handleStageMouseDown(evt))
            .add(
                new Konva.Layer()
                    .add(
                        new Konva.Rect({
                            x: baseX,
                            y: baseY,
                            width: width,
                            height: height,
                            fill: "white"
                        })
                    )
            )

    let gap = 30;
    const layers = [
        {
            name: "Bild 1",
            x: 0,
            y: 0,
            width: width / 2 - gap / 2,
            height: height / 2 - gap / 2,
        },
        {
            name: "Bild 2",
            x: 0,
            y: height / 2 + gap / 2,
            width: width / 2 - gap / 2,
            height: height / 2 - gap / 2,
        },
        {
            name: "Bild 3",
            x: width / 2 + gap / 2,
            y: 0,
            width: width / 2 - gap / 2,
            height: height / 2 - gap / 2,
        },
        {
            name: "Bild 4",
            x: width / 2 + gap / 2,
            y: height / 2 + gap / 2,
            width: width / 2 - gap / 2,
            height: height / 2 - gap / 2,
        },

    ];
    for (let layer of layers) {

        stage.add(
            new Konva.Layer()
                .add(
                    new Konva.Transformer({
                        nodes: [],
                        rotateAnchorOffset: 60,
                        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
                    })
                )
                .add(
                    new Konva.Group({
                        name: layer.name,
                        clip: {
                            x: baseX + layer.x,
                            y: baseY + layer.y,
                            width: layer.width,
                            height: layer.height,
                        }
                    })
                )
        )
    }

    stage.draw()
    useStageStore().setStage(stage)
}
