import Konva from "konva";

export default function (target: HTMLInputElement, stage: Konva.Stage) {
    if (target.files?.length !== 1) {
        console.log("Error: files hat nicht ein Element");
        return;
    }
    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(target.files[0]);
    const img = new window.Image();
    img.src = url;
    console.log(url);
    img.onload = () => {
        let layer = stage.findOne((node: Node) => node instanceof Konva.Layer) as Konva.Layer;
        let image = layer.findOne((node: Node) => node instanceof Konva.Image) as Konva.Image;
        console.log(image);
        image.image(img);
    };
}