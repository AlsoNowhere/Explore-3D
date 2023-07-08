import { Point } from "cinnamon";

import { TMap } from "../types/TMap.type";

export const generateGrid = (
  position = new Point(0, 0, 0),
  size: number | [number, number] = 3,
  colour?: string
) => {
  const { x, y, z } = position;
  const [sizeX, sizeZ] = size instanceof Array ? size : [size, size];

  const output: TMap = [];

  {
    let i = x;

    while (i < x + sizeX) {
      let j = z;
      while (j < z + sizeZ) {
        output.push([i, y, j, colour]);
        j++;
      }
      i++;
    }
  }

  return output;
};
