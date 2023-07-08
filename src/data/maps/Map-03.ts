import { computeMap } from "../../logic/compute-map.logic";

import { Cube } from "../../models/Cube.model";
import { Slope } from "../../models/Slope.model";

import { green, pink, yellow } from "../colours.data";

export const Map_03 = (onComplete: (name: string) => void) => {
  const map: Array<[number, number, number, string?, any?, {}?]> = [
    [4, 1, -2, yellow, Cube, { onOver: () => onComplete("03") }],
    [4, 0, -2],
    [5, 1, -2],
    [5, 0, -2],
    [5, 1, -1],
    [5, 0, -1],
    [5, 1, 0],
    [5, 0, 0],
    [4, 1, 0],
    [4, 0, 0],

    [3, 1, 0, pink, Slope, { direction: "X" }],

    [3, 0, 0],
    [2, 0, 0],
    [1, 0, 0],
  ];
  return computeMap(map, green);
};
