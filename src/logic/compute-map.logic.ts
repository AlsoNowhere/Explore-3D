import { Point } from "cinnamon";

import { Cube } from "../models/Cube.model";

import { cubeSize } from "../data/constants.data";

import { TItem_All } from "../types/TItem.type";

export const computeMap = (
  input: Array<[number, number, number, string?, any?, {}?]>,
  defaultColour?: string
): Array<TItem_All> => {
  const map = input.map((item) => {
    const [x, y, z, colour, , options] = item;
    const type = item[4] || Cube;
    return new type(new Point(x * cubeSize, y * cubeSize, z * cubeSize), {
      colour: colour || defaultColour,
      ...options,
    });
  });
  return map;
};
