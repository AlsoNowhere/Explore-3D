import { computeMap } from "../../logic/compute-map.logic";
import { getLedges } from "../../logic/get-ledge.logic";

import { Cube } from "../../models/Cube.model";
import { Ledge } from "../../models/Ledge.model";

import { blue, green, orange, pink, yellow } from "../colours.data";

import { DirectionAngle } from "../../enums/DirectionAngle.enum";

import { TCompleteLevel, TMap, TMapOutput } from "../../types/TMap.type";

const {
  flipHinges: [flipHinge1],
  triggerOptions: triggerOptions1,
} = getLedges(
  [
    {
      direction: DirectionAngle.X,
      state: "down",
      time: 6000,
      ledgeColours: [blue, green],
    },
  ],
  [blue, pink]
);

const {
  flipHinges: [flipHinge2],
  triggerOptions: triggerOptions2,
} = getLedges(
  [
    {
      direction: DirectionAngle.X,
      state: "down",
      time: 3000,
      ledgeColours: [orange, green],
    },
  ],
  [orange, pink]
);

export const map = (onComplete: TCompleteLevel) => {
  const map: TMap = [
    [0, 0, -4, yellow, Cube, { onOver: () => onComplete("06") }],

    [-1, 0, -4],
    [-1, 0, -3],
    [-1, 0, -2],

    [0, 0, -2],
    [1, 0, -2, orange, Ledge, { hinge: flipHinge2 }],
    [2, 0, -2],
    [
      3,
      0,
      -2,
      orange,
      Cube,
      {
        ...triggerOptions2,
      },
    ],
    [4, 0, -2],
    [5, 0, -2],
    [5, 0, -1],
    [5, 0, 0],

    [4, 0, 0],
    [3, 0, 0, blue, Ledge, { hinge: flipHinge1 }],
    [2, 0, 0],
    [
      1,
      0,
      0,
      blue,
      Cube,
      {
        ...triggerOptions1,
      },
    ],
    [0, 0, 0],
  ];
  return computeMap(map, green);
};

export const Map_06: TMapOutput = (completeLevel) => [
  "06",
  "06",
  "06",
  map(completeLevel),
];
