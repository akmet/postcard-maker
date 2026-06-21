import { usePersistentStore } from '../stores/persistentStore';
import { reloadGap } from './updateGap';

export default function (border: number) {
  usePersistentStore().setBorder(border);
  reloadBorder();
}

export function reloadBorder() {
  reloadGap();
}
