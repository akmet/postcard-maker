import { useImageStore } from "../stores/imageStore";
import updateImageFile from "./updateImageFile";

export default function (target: HTMLInputElement, item: number) {
    if (target.files?.length !== 1) {
        throw new Error("Error: files hat nicht ein Element");
    }


    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result;
        if (typeof base64String !== 'string') {
            throw new Error("Error: Image not string");
        }

        useImageStore().setImage(item, base64String);
        updateImageFile(item);
    };
    reader.readAsDataURL(target.files[0]);

}