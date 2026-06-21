import Konva from 'konva';
import { useStageStore } from '../stores/stageStore';
import getStageElementsByTemplate from './getStageElementsByTemplate';
import { usePersistentStore } from '../stores/persistentStore';

export default function (gap: number) {
  usePersistentStore().setGap(gap);
  reloadGap();
}

export function reloadGap() {
  const stage = useStageStore().stage as Konva.Stage;
  for (const layer of getStageElementsByTemplate()) {
    const group = stage.findOne(
      (node: Konva.Node) => node instanceof Konva.Group && node.name() === layer.name
    ) as Konva.Group;
    group.clip({
      x: group.getAttr('baseX') + layer.x,
      y: group.getAttr('baseY') + layer.y,
      width: layer.width,
      height: layer.height
    });
  }
}
