import Konva from "konva";
import handleStageMouseDown from "./handleStageMouseDown";


export default function (stages: Konva.Stage[]) {
    let parentContainer = document.getElementById('container_parent');
    let page = document.getElementById('page');
    if (parentContainer === null || page === null) {
        console.log("Error: parentContainer or page is null");
        return;
    }
    parentContainer.childNodes.forEach(
        function (container: ChildNode) {
            if (!(container instanceof HTMLDivElement) || !(page instanceof HTMLElement)) {
                return;
            }
            stages.push(
                new Konva.Stage({
                    container: container,
                    width: page.offsetWidth,
                    height: page.offsetHeight,
                })
                    .on('mousedown', (evt) => handleStageMouseDown(evt, stages))
                    .add(
                        new Konva.Layer({
                            clip: {
                                x: 0,
                                y: 0,
                                width: container.offsetWidth,
                                height: container.offsetHeight
                            }
                        })
                            .add(
                                new Konva.Transformer({
                                    nodes: [],
                                    rotateAnchorOffset: 60,
                                    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
                                })
                            )
                    )
                    .draw()
            )
        }
    )

}
