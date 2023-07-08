import { Direction, Point } from "cinnamon";

import { computeMap } from "../../logic/compute-map.logic";
import { getLedges } from "../../logic/get-ledge.logic";

import { Cube } from "../../models/Cube.model";
import { Slope } from "../../models/Slope.model";
import { Ledge } from "../../models/Ledge.model";

import { blue, brown, green, pink, yellow } from "../colours.data";
import { cubeSize } from "../constants.data";

import { DirectionAngle } from "../../enums/DirectionAngle.enum";

import { TCompleteLevel, TMap, TMapOutput } from "../../types/TMap.type";

const standard = (type: "X" | "X-") => ({
  direction: DirectionAngle[type],
  state: "down",
  time: 3000,
  ledgeColours: blue,
});

const {
  flipHinges: [flipHinge1, flipHinge2, flipHinge3, flipHinge4],
  triggerOptions,
} = getLedges(
  [standard("X"), standard("X"), standard("X-"), standard("X-")],
  pink
);

export const map = (onComplete: TCompleteLevel) => {
  const floor_0: TMap = [
    [8, 0, 5, brown],
    [7, 0, 5, brown],
    [6, 0, 5, brown],
    [5, 0, 5, blue, Cube, { ...triggerOptions }],
    [4, 0, 5],
    [3, 0, 5],
    [2, 0, 5],
    [1, 0, 5],
    [0, 0, 5],

    [8, 0, 4, brown],
    [7, 0, 4, brown],
    [6, 0, 4, brown],
    [5, 0, 4],
    [4, 0, 4],
    [3, 0, 4],
    [2, 0, 4],
    [1, 0, 4],
    [0, 0, 4],

    [8, 0, 3, brown],
    [7, 0, 3, brown],
    [6, 0, 3, brown],
    [5, 0, 3],
    [4, 0, 3],
    [1, 0, 3],
    [0, 0, 3],

    [8, 0, 2, brown],
    [7, 0, 2, brown],
    [6, 0, 2, brown],
    [5, 0, 2],
    [4, 0, 2],
    [1, 0, 2],
    [0, 0, 2],

    [8, 0, 1, brown],
    [7, 0, 1, brown],
    [6, 0, 1, brown],
    [5, 0, 1],
    [4, 0, 1],
    [3, 0, 1],
    [2, 0, 1],
    [1, 0, 1],
    [0, 0, 1],

    [8, 0, 0, brown],
    [7, 0, 0, brown],
    [6, 0, 0, brown],
    [5, 0, 0],
    [4, 0, 0],
    [3, 0, 0],
    [2, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
  ];

  const floor_1: TMap = [
    [8, 1, 5, brown],
    [7, 1, 5, brown],
    [6, 1, 5, brown],

    [8, 1, 4, brown],
    [7, 1, 4, brown],
    [6, 1, 4, brown],

    [8, 1, 3, brown],
    [7, 1, 3, brown],
    [6, 1, 3, brown],
    [3, 1, 3, brown],
    [2, 1, 3, brown],

    [8, 1, 2, brown],
    [7, 1, 2, brown],
    [6, 1, 2, brown],
    [3, 1, 2, brown],
    [2, 1, 2, brown],

    [8, 1, 1, brown],
    [7, 1, 1, brown],
    [6, 1, 1, green, Slope, { direction: DirectionAngle.X }],

    [8, 1, 0, brown],
    [7, 1, 0, brown],
    [6, 1, 0, green, Slope, { direction: DirectionAngle.X }],
  ];

  const floor_2: TMap = [
    [8, 2, 3],
    [8, 2, 2],
    [8, 2, 1],
    [8, 2, 0],

    [7, 2, 3],
    [6, 2, 3],
    [5, 2, 3, pink, Ledge, { hinge: flipHinge2 }],
    [4, 2, 3, pink, Ledge, { hinge: flipHinge3 }],
    [3, 2, 3],
    [2, 2, 3, yellow, Cube, { onOver: () => onComplete("07") }],

    [7, 2, 2],
    [6, 2, 2],
    [5, 2, 2, pink, Ledge, { hinge: flipHinge1 }],
    [4, 2, 2, pink, Ledge, { hinge: flipHinge4 }],
    [3, 2, 2],
    [2, 2, 2],

    [7, 2, 1, green, Slope, { direction: DirectionAngle.X }],

    [7, 2, 0, green, Slope, { direction: DirectionAngle.X }],
  ];

  const map: TMap = [...floor_2, ...floor_1, ...floor_0];
  return computeMap(map, green);
};

export const Map_07: TMapOutput = (completeLevel) => [
  "07",
  "07",
  "07",
  map(completeLevel),
  new Point(cubeSize / 2, 0, cubeSize / 2),
  new Direction(45, 30),
  //   new Direction(135, 15),
  //   100,
];
