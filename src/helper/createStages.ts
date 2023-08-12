import Konva from "konva";
import { useStageStore } from "../stores/stageStore";
import getStageElementsByTemplate from "./getStageElementsByTemplate";
import handleStageMouseDown from "./handleStageMouseDown";
import { initializeTexts } from "./textHelper";
import { loadImages } from "./imageHelper";


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
    }
    if (height > stageContainer.offsetHeight * 0.9) {
        scale = Math.min(scale, stageContainer.offsetHeight * 0.9 / height);
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
            .on('mousedown', (evt) => handleStageMouseDown(evt.target))

    const layers = getStageElementsByTemplate();
    const group_images = new Konva.Group({
        name: "group_images"
    });
    const group_texts = new Konva.Group({
        name: "group_texts"
    }).setAttr('baseX', baseX).setAttr('baseY', baseY);

    const background_rect = new Konva.Rect({
        id: "background_rect",
        x: baseX,
        y: baseY,
        width: width,
        height: height,
        fill: "white",
        stroke: 'black',
        strokeWidth: 1,
    });

    stage.add(
        new Konva.Layer()
            .add(
                background_rect
            )
            .add(
                new Konva.Transformer({
                    nodes: [],
                    rotateAnchorOffset: 60,
                })
            )
            .add(group_images)
            .add(group_texts)
    );
    for (let layer of layers) {
        group_images.add(
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

    stage.scaleX(scale);
    stage.scaleY(scale);
    stage.draw();
    useStageStore().setStage(stage)
    useStageStore().setGroupTexts(group_texts);
    useStageStore().setGroupImages(group_images);
    useStageStore().setBackgroundRect(background_rect);

    loadImages();
    initializeTexts();
}
