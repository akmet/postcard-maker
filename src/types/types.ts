export enum Layout {
    TwoByTwo = 0,
    TwoByThree = 1,
    ThreeByTwo = 2,
};

export type ImageData = {
    index: number,
    attributes: object,
    image: string,
    selected: boolean,
}

export type TextData = {
    id: string,
    selected: boolean,
    attributes: string
}