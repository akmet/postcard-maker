import Konva from "konva";
import { useStageStore } from "../stores/stageStore";
import getStageElementsByTemplate from "./getStageElementsByTemplate";
import handleStageMouseDown from "./handleStageMouseDown";


export default function () {
    let stageContainer = document.getElementById('stageContainer');

    if (!(stageContainer instanceof HTMLDivElement)) {
        return;
    }
    let store = useStageStore();
    const width = store.dimensions.width
    const height = store.dimensions.height

    let scale = 1;

    if (width > stageContainer.offsetWidth * 0.9) {
        scale = Math.min(scale, stageContainer.offsetWidth * 0.9 / width);
        console.log("new scale: " + scale);
    }
    if (height > stageContainer.offsetHeight * 0.9) {
        scale = Math.min(scale, stageContainer.offsetHeight * 0.9 / height);
        console.log("new scale: " + scale);
    }

    const baseX = (stageContainer.offsetWidth - (width * scale)) / 2;
    const baseY = (stageContainer.offsetHeight - (height * scale)) / 2;

    let stage =
        new Konva.Stage({
            container: stageContainer,
            width: stageContainer.offsetWidth,
            height: stageContainer.offsetHeight,
            draggable: true,
        })
            .on('mousedown', (evt) => handleStageMouseDown(evt))

    const layers = getStageElementsByTemplate();
    const layerImage = new Konva.Layer({
        name: "layer_image"
    })
        .add(
            new Konva.Rect({
                x: baseX,
                y: baseY,
                width: width,
                height: height,
                fill: "white",
                stroke: 'black',
                strokeWidth: 1,
            })
        )
        .add(
            new Konva.Transformer({
                nodes: [],
                rotateAnchorOffset: 60,
                enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
            })
        )
    for (let layer of layers) {
        layerImage.add(
            new Konva.Group({
                name: layer.name,
                clip: {
                    x: baseX + layer.x,
                    y: baseY + layer.y,
                    width: layer.width,
                    height: layer.height,
                }
            }).setAttr('baseX', baseX).setAttr('baseY', baseY)
        )

    }
    stage.add(layerImage);
    stage.add(
        new Konva.Layer({
            name: "layer_text"
        })
    )

    stage.scaleX(scale);
    stage.scaleY(scale);
    stage.draw();
    useStageStore().setStage(stage)
}
