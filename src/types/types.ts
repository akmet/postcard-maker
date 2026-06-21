export enum Layout {
  TwoByTwo = 0,
  TwoByThree = 1,
  ThreeByTwo = 2
}

export type ImageData = {
  index: number;
  attributes: Record<string, unknown>;
  image: string | null;
  selected: boolean;
};

export type TextData = {
  id: string;
  selected: boolean;
  attributes: string;
};
