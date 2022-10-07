type Color = 0 | 1;

type Animal =
  | "mouse"
  | "cat"
  | "dog"
  | "wolf"
  | "cheetah"
  | "tiger"
  | "lion"
  | "elephant";

type Board = Record<
  string,
  {
    piece: boolean;
    color: Color;
    animal: Animal | null;
  }
>;
