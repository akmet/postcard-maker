import { usePersistentStore } from '../stores/persistentStore';
import { loadImages } from './imageHelper';
import { initializeTexts } from './textHelper';
import { reloadBorder } from './updateBorder';
import { reloadGap } from './updateGap';

export function jsonExport() {
  const store = usePersistentStore();
  store.pruneImages();
  const raw = store.toJson();
  const filename = prompt('Wie soll die Datei heißen?', 'Postkarte_.json');
  if (!filename) return;

  const link = document.createElement('a');
  const file = new Blob([raw], { type: 'application/json' });
  link.href = URL.createObjectURL(file);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function jsonImport(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const reader = new FileReader();
  reader.addEventListener('load', (progress: ProgressEvent<FileReader>) => {
    const result = progress.target?.result;
    if (typeof result !== 'string') return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(result);
    } catch {
      console.error('JSON import failed: invalid JSON');
      return;
    }

    if (!parsed || typeof parsed !== 'object') {
      console.error('JSON import failed: unexpected format');
      return;
    }

    usePersistentStore().fromJson(result);
    loadImages();
    initializeTexts();
    reloadBorder();
    reloadGap();
  });
  reader.readAsText(target.files[0]);
}
