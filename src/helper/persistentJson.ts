import { usePersistentStore } from '../stores/persistentStore';
import { loadImages } from './imageHelper';
import { initializeTexts } from './textHelper';
import { reloadBorder } from './updateBorder';
import { reloadGap } from './updateGap';

function jsonExport() {
    const raw = usePersistentStore().toJson();
    const filename = prompt('Wie soll die Datei heißen?', 'Postkarte_.json');
    if (!filename) {
        return console.log('Could not handle empty filename');
    }

    const link = document.createElement("a");
    const file = new Blob([raw], { type: 'application/json' });
    link.href = URL.createObjectURL(file);

    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

function jsonImport(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.files) {
        console.log('file is not filled');
        return;
    }

    let reader = new FileReader();
    reader.onload = function (progress: ProgressEvent<FileReader>) {
        if (!progress.target) {
            console.log('Could not read file');
            return;
        }
        if (typeof progress.target.result !== 'string') {
            console.log('filereader.result is not plain string');
            return;
        }
        if (!isJsonString(progress.target.result)) {
            console.log('input is not valid json');
            return;
        }
        usePersistentStore().fromJson(progress.target.result)

        loadImages();
        initializeTexts();
        reloadBorder();
        reloadGap()
    }
    reader.readAsText(target.files[0])
}

function isJsonString(input: string): boolean {
    try {
        JSON.parse(input);
    } catch (e) {
        return false;
    }
    return true;
}
export { jsonExport, jsonImport }