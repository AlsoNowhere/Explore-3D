import { computeMap } from "../../logic/compute-map.logic";

import { Cube } from "../../models/Cube.model";

import { green, yellow } from "../colours.data";

export const Map_02 = (onComplete: (name: string) => void) => {
  const map: Array<[number, number, number, string?, any?, {}?]> = [
    [2, 0, -4],

    [1, 0, -4],
    [1, 0, -3],

    [1, 0, -2],
    [2, 0, -2],

    [3, 0, -2],
    [3, 0, -1],

    [3, 0, 0],
    [3, 0, 0],
    [2, 0, 0],
    [1, 0, 0],
    [0, 0, 0],

    [3, 0, -4, yellow, Cube, { onOver: () => onComplete("02") }],
  ];
  return computeMap(map, green);
};
