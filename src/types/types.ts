import Konva from "konva"

export enum Layout {
    TwoByTwo = 0,
    TwoByThree = 1,
    ThreeByTwo = 2,
};

export type ImageData = {
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
}

export type TextData = {
    id: number,
    text: Konva.Text,
}