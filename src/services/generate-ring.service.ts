import { Point } from "cinnamon";

import { TMap } from "../types/TMap.type";

const isWithin = (
  i: number,
  start: number,
  size: number,
  thickness: number
) => {
  const end = start + size - 1;
  const withinStart = i >= start && i < start + thickness;
  const withinEnd = i <= end && i > end - thickness;

  return withinStart || withinEnd;
};

export const generateRing = (
  position = new Point(0, 0, 0),
  size: number | [number, number] = 3,
  thickness = 1,
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
        if (
          isWithin(i, x, sizeX, thickness) ||
          isWithin(j, z, sizeZ, thickness)
        ) {
          output.push([i, y, j, colour]);
        }
        j++;
      }
      i++;
    }
  }

  return output;
};
