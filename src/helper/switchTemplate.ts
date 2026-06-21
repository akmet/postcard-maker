import Konva from 'konva';
import { useStageStore } from '../stores/stageStore';
import getStageElementsByTemplate from './getStageElementsByTemplate';
import { usePersistentStore } from '../stores/persistentStore';
import type { Layout } from '../types/types';

export default function (layout: Layout) {
  const persistentStore = usePersistentStore();
  if (persistentStore.layout === layout) return;

  persistentStore.setLayout(layout);
  const stage = useStageStore().stage as Konva.Stage;
  const layers = getStageElementsByTemplate();

  for (const layer of layers) {
    const group = stage.findOne(
      (node: Konva.Node) => node instanceof Konva.Group && node.name() === layer.name
    ) as Konva.Group;
    group.clip({
      x: group.getAttr('baseX') + layer.x,
      y: group.getAttr('baseY') + layer.y,
      width: layer.width,
      height: layer.height
    });
    const image = group.findOne((node: Konva.Node) => node instanceof Konva.Image) as Konva.Image;
    if (!(image instanceof Konva.Image)) continue;
    image.width(layer.width);
    image
      .height((layer.width / image.getAttr('imgWidth')) * image.getAttr('imgHeight'))
      .x(group.clipX())
      .y(group.clipY());
    image.draw();
  }
}
