export default function () {
    for (let stage of this.stages) {
        let page = document.getElementById('page');

        let scaleWidth = page.offsetWidth / stage.width();
        let scaleHeight = page.offsetHeight / stage.height();
        //console.log(page.offsetWidth, stage.width(), scaleWidth);
        //console.log(page.offsetHeight, stage.height(), scaleHeight);
        stage.scale({
            x: scaleWidth,
            y: scaleHeight,
            width: 100,
        })
        stage.width(page.offsetWidth);
        stage.height(page.offsetHeight);
        stage.draw();
        /*
            let container = stage.getContainer();
                        const layer = stage.findOne((node) => node.getClassName() === 'Layer');
                        const clip = layer.clip();
        
        
                        let scaleWidth = container.offsetWidth / Math.max(1, clip.width);
                        let scaleHeight = container.offsetHeight / Math.max(1, clip.height);
                        layer.scale({
                            x: clip.width * scaleWidth,
                            y: clip.height * scaleHeight,
                        });
                        layer.clip({
                            width: clip.width * scaleWidth,
                            height: clip.height * scaleHeight,
                        });
                        */
    }
}