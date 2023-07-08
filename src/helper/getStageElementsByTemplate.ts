import { useStageStore } from "../stores/stageStore";
import { ImageData, Layout } from "../types/types";


export default function (): ImageData[] {

    let store = useStageStore();
    const gap = store.gap as number;
    const width = store.dimensions.width
    const height = store.dimensions.height
    const layout = store.layout

    if (layout === Layout.TwoByThree) {
        return [
            {
                name: "Bild 1",
                x: 0,
                y: 0,
                width: width / 2 - gap / 2,
                height: height / 2 - gap / 2,
            },
            {
                name: "Bild 2",
                x: width / 2 + gap / 2,
                y: 0,
                width: width / 2 - gap / 2,
                height: height / 2 - gap / 2,
            },
            {
                name: "Bild 3",
                x: 0,
                y: height / 2 + gap / 2,
                width: width / 3 - gap / 2,
                height: height / 2 - gap / 2,
            },
            {
                name: "Bild 4",
                x: width / 3 + gap / 2,
                y: height / 2 + gap / 2,
                width: width / 3 - gap,
                height: height / 2 - gap / 2,
            },
            {
                name: "Bild 5",
                x: width / 3 * 2 + gap / 2,
                y: height / 2 + gap / 2,
                width: width / 3 - gap / 2,
                height: height / 2 - gap / 2,
            },
        ]

    }
    if (layout === Layout.ThreeByTwo) {
        return [
            {
                name: "Bild 1",
                x: 0,
                y: 0,
                width: width / 3 - gap / 2,
                height: height / 2 - gap / 2,
            },
            {
                name: "Bild 2",
                x: width / 3 + gap / 2,
                y: 0,
                width: width / 3 - gap,
                height: height / 2 - gap / 2,
            },
            {
                name: "Bild 3",
                x: width / 3 * 2 + gap / 2,
                y: 0,
                width: width / 3 - gap / 2,
                height: height / 2 - gap / 2,
            },
            {
                name: "Bild 4",
                x: 0,
                y: height / 2 + gap / 2,
                width: width / 2 - gap / 2,
                height: height / 2 - gap / 2,
            },
            {
                name: "Bild 5",
                x: width / 2 + gap / 2,
                y: height / 2 + gap / 2,
                width: width / 2 - gap / 2,
                height: height / 2 - gap / 2,
            },
        ]

    }
    //else (layout === Layout.TwoByTwo)
    return [
        {
            name: "Bild 1",
            x: 0,
            y: 0,
            width: width / 2 - gap / 2,
            height: height / 2 - gap / 2,
        },
        {
            name: "Bild 2",
            x: width / 2 + gap / 2,
            y: 0,
            width: width / 2 - gap / 2,
            height: height / 2 - gap / 2,
        },
        {
            name: "Bild 3",
            x: 0,
            y: height / 2 + gap / 2,
            width: width / 2 - gap / 2,
            height: height / 2 - gap / 2,
        },
        {
            name: "Bild 4",
            x: width / 2 + gap / 2,
            y: height / 2 + gap / 2,
            width: width / 2 - gap / 2,
            height: height / 2 - gap / 2,
        },
        {
            name: "Bild 5",
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
    ]
}
