import { computeMap } from "../../logic/compute-map.logic";

import { Cube } from "../../models/Cube.model";

import { green, yellow } from "../colours.data";

import { TMap } from "../../types/TMap.type";

export const Map_01 = (onComplete: (name: string) => void) => {
  const map: TMap = [
    [3, 0, 3, yellow, Cube, { onOver: () => onComplete("01") }],

    [2, 0, 3],
    [1, 0, 3],

    [0, 0, 3],
    [0, 0, 2],
    [0, 0, 1],
    [0, 0, 0],
  ];
  return computeMap(map, green);
};
