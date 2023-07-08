import { Direction, Point } from "cinnamon";

import { computeMap } from "../../logic/compute-map.logic";
import { getLedges } from "../../logic/get-ledge.logic";

import { Ledge } from "../../models/Ledge.model";
import { Slope } from "../../models/Slope.model";
import { Cube } from "../../models/Cube.model";

import {
  grey,
  blue,
  green,
  orange,
  pink,
  violet,
  water,
  yellow,
  lightgreen,
} from "../colours.data";
import { cubeSize } from "../constants.data";

import { DirectionAngle } from "../../enums/DirectionAngle.enum";

import { TCompleteLevel, TMap, TMapOutput } from "../../types/TMap.type";

const standard = (
  dir: "X" | "X-" | "Z" | "Z-",
  ledgeColours: string | [string, string]
) => ({
  direction: DirectionAngle[dir],
  state: "down",
  time: 3000,
  ledgeColours,
});

const {
  flipHinges: [flipHinge1],
  triggerOptions: triggerOptions1,
} = getLedges([standard("X-", [blue, lightgreen])], [blue, lightgreen]);

const {
  flipHinges: [flipHinge2],
  triggerOptions: triggerOptions2,
} = getLedges([standard("Z", [grey, lightgreen])], [grey, lightgreen]);

const {
  flipHinges: [flipHinge3],
  triggerOptions: triggerOptions3,
} = getLedges([standard("X-", [orange, lightgreen])], [orange, lightgreen]);

const {
  flipHinges: [flipHinge4],
  triggerOptions: triggerOptions4,
} = getLedges([standard("X-", [pink, lightgreen])], [pink, lightgreen]);

const {
  flipHinges: [flipHinge5],
  triggerOptions: triggerOptions5,
} = getLedges([standard("Z", [violet, lightgreen])], [violet, lightgreen]);

export const map = (onComplete: TCompleteLevel) => {
  const floor_$1: TMap = [
    [1, -1, 3],
    [2, -1, 3],
    [3, -1, 3, violet, Cube, { ...triggerOptions5 }],
    [-1, -1, 7],
    [-1, -1, 6],
    [-1, -1, 5],
    [-1, -1, 4, pink, Cube, { ...triggerOptions4 }],
  ];

  const floor_0: TMap = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 0, 2],
    [0, 0, 3],
    [-1, 0, 0, blue, Ledge, { hinge: flipHinge1 }],
    [0, 0, -2],
    [-2, 0, -1, grey, Ledge, { hinge: flipHinge2 }],
    [-2, 0, 0],
    [-1, 0, -2, orange, Ledge, { hinge: flipHinge3 }],
    [-2, 0, -2],
    [1, 0, -2, pink, Ledge, { hinge: flipHinge4 }],
    [2, 0, -2],
    [2, 0, -1, violet, Ledge, { hinge: flipHinge5 }],
    [2, 0, 0, yellow, Cube, { onOver: () => onComplete("09") }],
    [1, 0, 3, green, Slope, { direction: DirectionAngle["X-"] }],
    [0, 0, 4],
    [-1, 0, 3],
    [-2, 0, 7],
    [-2, 0, 8],
    [-1, 0, 8],
    [-1, 0, 7, green, Slope, { direction: DirectionAngle.Z }],

    [-10, 0, 4],
    [-11, 0, 4],
    [-10, 0, 3],
    [-11, 0, 3],

    [-9, 0, 3],
    [-8, 0, 3],
    [-8, 0, 2],
    [-8, 0, 1],
    [-8, 0, 0],
    [-9, 0, 0],
    [-10, 0, 0],
    [-11, 0, 0],
    [-12, 0, 3],
    [-12, 0, 2],
    [-12, 0, 1],
    [-12, 0, 0],
    [-13, 0, 3],
    [-13, 0, 2],
    [-13, 0, 1],
    [-13, 0, 0],

    [-9, 0, 1],
    [-9, 0, 2],

    [-10, 0, 2],
    [-11, 0, 2],
    [-10, 0, 1],
    [-11, 0, 1],

    [-8, 0, -1],
    [-9, 0, -1],
    [-10, 0, -1],
    [-11, 0, -1],
    [-12, 0, -1],
    [-13, 0, -1],

    [-8, 0, -2],
    [-9, 0, -2],
    [-10, 0, -2],
    [-11, 0, -2],
    [-12, 0, -2],
    [-13, 0, -2],
  ];

  const floor_1: TMap = [
    [0, 1, 4, green, Slope, { direction: DirectionAngle.Z }],
    [0, 1, 5],
    [-1, 1, 5],
    [-1, 1, 3, green, Slope, { direction: DirectionAngle["X-"] }],
    [-2, 1, 3],
    [-2, 1, 4],
    [-2, 1, 5],
    [-2, 1, 6],
    [-3, 1, 5],
    [-3, 1, 6],
    [-2, 1, 7, green, Slope, { direction: DirectionAngle["Z-"] }],

    [-4, 1, 4],
    [-4, 1, 5],
    [-4, 1, 6],
    [-4, 1, 7],

    [-5, 1, 5],
    [-5, 1, 6],

    [-6, 1, 4],
    [-6, 1, 5],
    [-6, 1, 6],
    [-6, 1, 7],

    [-7, 1, 5],
    [-7, 1, 6],

    [-8, 1, 4],
    [-8, 1, 5],
    [-8, 1, 6],
    [-8, 1, 7],

    [-9, 1, 5],
    [-9, 1, 6],

    [-10, 1, 5],
    [-10, 1, 6],
    [-11, 1, 5],
    [-11, 1, 6],

    [-10, 1, 4],
    [-11, 1, 4],
    [-10, 1, 3],
    [-11, 1, 3],

    [-12, 1, 3],
    [-12, 1, 2, water, Cube, { canTraverse: false }],
    [-12, 1, 1, water, Cube, { canTraverse: false }],
    [-12, 1, 0, water, Cube, { canTraverse: false }],

    [-13, 1, 3],
    [-13, 1, 2],
    [-13, 1, 1],
    [-13, 1, 0],

    [-9, 1, 3],
    [-8, 1, 3],
    [-8, 1, 2],
    [-8, 1, 1],
    [-8, 1, 0],
    [-9, 1, 0, water, Cube, { canTraverse: false }],
    [-10, 1, 0],
    [-11, 1, 0],

    [-9, 1, 1, water, Cube, { canTraverse: false }],
    [-9, 1, 2, water, Cube, { canTraverse: false }],

    [-10, 1, 2],
    [-11, 1, 2],
    [-10, 1, 1],
    [-11, 1, 1],

    [-8, 1, -1],
    [-9, 1, -1, water, Cube, { canTraverse: false }],
    [-10, 1, -1],
    [-11, 1, -1],
    [-12, 1, -1, water, Cube, { canTraverse: false }],
    [-13, 1, -1],

    [-8, 1, -2, orange, Cube, { ...triggerOptions3 }],
    [-9, 1, -2],
    [-10, 1, -2],
    [-11, 1, -2],
    [-12, 1, -2],
    [-13, 1, -2, blue, Cube, { ...triggerOptions1 }],
  ];

  const floor_2: TMap = [
    [-4, 2, 4],
    [-4, 2, 7],

    [-6, 2, 4],
    [-6, 2, 7],

    [-8, 2, 4],
    [-8, 2, 7],
    [-7, 2, 7, green, Slope, { direction: DirectionAngle.Z }],
    [-7, 2, 8],
  ];

  const floor_3: TMap = [
    [-4, 3, 4],
    [-4, 3, 5],
    [-4, 3, 6],
    [-4, 3, 7],

    [-6, 3, 4],
    [-6, 3, 5],
    [-6, 3, 6],
    [-6, 3, 7],

    [-8, 3, 4, grey, Cube, { ...triggerOptions2 }],
    [-8, 3, 5],
    [-8, 3, 6],
    [-8, 3, 7],
    [-8, 3, 8, green, Slope, { direction: DirectionAngle["X-"] }],
    [-9, 3, 8],
    [-9, 3, 7],
  ];

  const map: TMap = [
    ...floor_3,
    ...floor_2,
    ...floor_1,
    ...floor_0,
    ...floor_$1,
  ];
  return computeMap(map, green);
};

export const Map_09: TMapOutput = (completeLevel) => [
  "09",
  "09",
  "09",
  map(completeLevel),
  undefined,
  //   new Point(-10 * cubeSize, 1 * cubeSize, 2 * cubeSize),
  new Direction(45, 30),
];
