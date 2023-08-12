import { usePersistentStore } from "../stores/persistentStore";
import { useStageStore } from "../stores/stageStore";
import { Layout } from "../types/types";


export default function () {

    const persistentStore = usePersistentStore();
    const stageStore = useStageStore();
    const gap = persistentStore.gap as number;
    const border = persistentStore.border as number;
    const layout = persistentStore.layout
    const width = stageStore.dimensions.width
    const height = stageStore.dimensions.height

    if (layout === Layout.TwoByThree) {
        return [
            {
                name: "Bild 1",
                x: border,
                y: border,
                width: width / 2 - gap / 2 - border,
                height: height / 2 - gap / 2 - border,
            },
            {
                name: "Bild 2",
                x: width / 2 + gap / 2,
                y: border,
                width: width / 2 - gap / 2 - border,
                height: height / 2 - gap / 2 - border,
            },
            {
                name: "Bild 3",
                x: border,
                y: height / 2 + gap / 2,
                width: width / 3 - gap / 2 - border,
                height: height / 2 - gap / 2 - border,
            },
            {
                name: "Bild 4",
                x: width / 3 + gap / 2,
                y: height / 2 + gap / 2,
                width: width / 3 - gap,
                height: height / 2 - gap / 2 - border,
            },
            {
                name: "Bild 5",
                x: width / 3 * 2 + gap / 2,
                y: height / 2 + gap / 2,
                width: width / 3 - gap / 2 - border,
                height: height / 2 - gap / 2 - border,
            },
        ]

    }
    if (layout === Layout.ThreeByTwo) {
        return [
            {
                name: "Bild 1",
                x: border,
                y: border,
                width: width / 3 - gap / 2 - border,
                height: height / 2 - gap / 2 - border,
            },
            {
                name: "Bild 2",
                x: width / 3 + gap / 2,
                y: border,
                width: width / 3 - gap,
                height: height / 2 - gap / 2 - border,
            },
            {
                name: "Bild 3",
                x: width / 3 * 2 + gap / 2,
                y: border,
                width: width / 3 - gap / 2 - border,
                height: height / 2 - gap / 2 - border,
            },
            {
                name: "Bild 4",
                x: border,
                y: height / 2 + gap / 2,
                width: width / 2 - gap / 2 - border,
                height: height / 2 - gap / 2 - border,
            },
            {
                name: "Bild 5",
                x: width / 2 + gap / 2,
                y: height / 2 + gap / 2,
                width: width / 2 - gap / 2 - border,
                height: height / 2 - gap / 2 - border,
            },
        ]

    }
    //else (layout === Layout.TwoByTwo)
    return [
        {
            name: "Bild 1",
            x: border,
            y: border,
            width: width / 2 - gap / 2 - border,
            height: height / 2 - gap / 2 - border,
        },
        {
            name: "Bild 2",
            x: width / 2 + gap / 2,
            y: border,
            width: width / 2 - gap / 2 - border,
            height: height / 2 - gap / 2 - border,
        },
        {
            name: "Bild 3",
            x: border,
            y: height / 2 + gap / 2,
            width: width / 2 - gap / 2 - border,
            height: height / 2 - gap / 2 - border,
        },
        {
            name: "Bild 4",
            x: width / 2 + gap / 2,
            y: height / 2 + gap / 2,
            width: width / 2 - gap / 2 - border,
            height: height / 2 - gap / 2 - border,
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
