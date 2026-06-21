import Konva from 'konva';
import { useStageStore } from '../stores/stageStore';

export default function (factor: number) {
  const stage = useStageStore().stage;
  if (!(stage instanceof Konva.Stage)) {
    throw new Error('stage is not a Stage');
  }
  const newScale = Math.max(0.1, Math.min(5, stage.scaleX() + factor));
  stage.scale({ x: newScale, y: newScale }).draw();
}
