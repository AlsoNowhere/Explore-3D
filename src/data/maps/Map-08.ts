import { Direction, Point } from "cinnamon";

import { computeMap } from "../../logic/compute-map.logic";
import { getLedges } from "../../logic/get-ledge.logic";

import { Cube } from "../../models/Cube.model";
import { Slope } from "../../models/Slope.model";
import { Ledge } from "../../models/Ledge.model";

import { blue, brown, green, orange, yellow } from "../colours.data";

import { DirectionAngle } from "../../enums/DirectionAngle.enum";

import { TCompleteLevel, TMap, TMapOutput } from "../../types/TMap.type";
import { cubeSize } from "../constants.data";

const {
  flipHinges: [flipHinge1],
  triggerOptions: triggerOptions1,
} = getLedges(
  [
    {
      direction: DirectionAngle["X-"],
      state: "down",
      time: 3000,
      ledgeColours: blue,
    },
  ],
  blue
);

const {
  flipHinges: [flipHinge2, flipHinge3],
  triggerOptions: triggerOptions2,
} = getLedges(
  [
    {
      direction: DirectionAngle["X-"],
      state: "down",
      time: 3000,
      ledgeColours: orange,
    },
    {
      direction: DirectionAngle["Z-"],
      state: "down",
      time: 3000,
      ledgeColours: orange,
    },
  ],
  orange
);

const {
  flipHinges: [flipHinge4],
  triggerOptions: triggerOptions4,
} = getLedges(
  [
    {
      direction: DirectionAngle["X-"],
      state: "down",
      time: 3000,
      ledgeColours: brown,
    },
  ],
  brown
);

export const map = (onComplete: TCompleteLevel) => {
  const floor_0: TMap = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 0, 2],
  ];

  const floor_1: TMap = [
    [0, 1, 2, green, Slope, { direction: DirectionAngle.Z }],
    [0, 1, 3],
    [1, 1, 3],
    [2, 1, 3],
    [3, 1, 3],
    [4, 1, 3, blue, Cube, { ...triggerOptions1 }],
    [-1, 1, 3, blue, Ledge, { hinge: flipHinge1 }],
    [-2, 1, 3],
    [-3, 1, 3],
    [-3, 1, 2],
  ];

  const floor_2: TMap = [
    [-3, 2, 2, green, Slope, { direction: DirectionAngle["Z-"] }],
    [-4, 2, 1, orange, Ledge, { hinge: flipHinge2 }],
    [-5, 2, 2, orange, Ledge, { hinge: flipHinge3 }],
    [-3, 2, 1],
    [-2, 2, 1],
    [-1, 2, 1],
    [-1, 2, 0],
    [0, 2, 0],
    [1, 2, 0],
    [2, 2, 0, orange, Cube, { ...triggerOptions2 }],
    [-5, 2, 1],
    [-5, 2, 3],
    [-5, 2, 4],
    [-4, 2, 4],
  ];

  const floor_3: TMap = [
    [-4, 3, 4, green, Slope, { direction: DirectionAngle.X }],
    [-3, 3, 4],
    [-2, 3, 4],
    [-1, 3, 4],
    [0, 3, 4],
    [1, 3, 4],
    [1, 3, 3],
    [0, 3, 5],
    [0, 3, 6, brown, Cube, { ...triggerOptions4 }],
    [-1, 3, 5],
    [-1, 3, 6],
    [-1, 3, 7],
    [1, 3, 5],
    [1, 3, 6],
    [1, 3, 7],
  ];

  const floor_4: TMap = [
    [1, 4, 3, green, Slope, { direction: DirectionAngle["Z-"] }],
    [1, 4, 2],
    [0, 4, 2, brown, Ledge, { hinge: flipHinge4 }],
    [-1, 4, 2],
    [-2, 4, 2],
    [-1, 4, 5],
    [-1, 4, 6],
    [-1, 4, 7],
    [1, 4, 5],
    [1, 4, 6],
    [1, 4, 7],
  ];

  const floor_5: TMap = [
    [-2, 5, 2, green, Slope, { direction: DirectionAngle["X-"] }],
    [-3, 5, 2],
    [-3, 5, 1],
    [-3, 5, 0],
    [-3, 5, -1],
    [-3, 5, -2],
    [-2, 5, -2],
    [-1, 5, -2],
    [0, 5, -2],
    [1, 5, -2],
    [1, 5, -1],
    [1, 5, 0],
    [-1, 5, 5],
    [-1, 5, 6],
    [-1, 5, 7],
    [0, 5, 5],
    [0, 5, 6],
    [0, 5, 7],
    [1, 5, 5],
    [1, 5, 6],
    [1, 5, 7],
  ];

  const floor_6: TMap = [
    [1, 6, 0, green, Slope, { direction: DirectionAngle["Z"] }],
    [1, 6, 1],
  ];

  const floor_7: TMap = [
    [1, 7, 1, green, Slope, { direction: DirectionAngle.Z }],
    [1, 7, 2],
    [0, 7, 2],
    [0, 7, 1],
    [0, 7, 0, yellow, Cube, { onOver: () => onComplete("08") }],
  ];

  const map: TMap = [
    ...floor_7,
    ...floor_6,
    ...floor_5,
    ...floor_4,
    ...floor_3,
    ...floor_2,
    ...floor_1,
    ...floor_0,
  ];
  return computeMap(map, green);
};

export const Map_08: TMapOutput = (completeLevel) => [
  "08",
  "08",
  "08",
  map(completeLevel),
  undefined,
  // new Point(0 * cubeSize, 3 * cubeSize, 4 * cubeSize),
  //   new Direction(-90, 10),
  new Direction(-25, 80),
];
