export enum Layout {
    TwoByTwo = 0,
    TwoByThree = 1,
    ThreeByTwo = 2,
};

export type ImageData = {
    index: number,
    attributes: object,
    image: string | null,
    selected: boolean,
}

export type TextData = {
    id: string,
    selected: boolean,
    attributes: string
}

export enum ChangeType {
    TextCreate = 'TextCreate',
    TextUpdate = 'TextUpdate',
    TextDestroy = 'TextDestroy',
    ImageUpdate = 'ImageUpdate',
    ImageDestroy = 'ImageDestroy',
    GapUpdate = 'GapUpdate',
    LayoutUpdate = 'LayoutUpdate',
    BorderUpdate = 'BorderUpdate',
}

export type Config = {
    sidebarPage: number,
}