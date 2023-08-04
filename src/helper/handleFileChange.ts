import { useImageStore } from "../stores/imageStore";
import updateImageFile from "./updateImageFile";

export default function (target: HTMLInputElement, item: number) {
    if (target.files?.length !== 1) {
        console.log("Error: files hat nicht ein Element");
        return;
    }


    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result;
        if (typeof base64String !== 'string') {
            console.log("Error: Image not string");
            return;
        }

        useImageStore().setImage(item, base64String);
        updateImageFile(item);
    };
    reader.readAsDataURL(target.files[0]);

}