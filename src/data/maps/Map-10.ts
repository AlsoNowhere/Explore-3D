import { Direction, Point } from "cinnamon";

import { generateRing } from "../../services/generate-ring.service";

import { computeMap } from "../../logic/compute-map.logic";

import { Slope } from "../../models/Slope.model";
import { Cube } from "../../models/Cube.model";

import {
  brown,
  dusty,
  green,
  green_40,
  pyramid,
  yellow,
} from "../colours.data";

import { DirectionAngle } from "../../enums/DirectionAngle.enum";

import {
  TCompleteLevel,
  TMap,
  TMapAll,
  TMapOutput,
} from "../../types/TMap.type";
import { Fire } from "../../models/Fire.model";

const getIndex = (map: TMap, _x: number, _y: number, _z: number) =>
  map.findIndex(([x, y, z]) => x === _x && y === _y && z === _z);

const getCube = (x: number, y: number, z: number, colour: string): TMapAll => [
  x,
  y,
  z,
  colour,
  Cube,
];

const getSlope = (
  x: number,
  y: number,
  z: number,
  colour: string,
  type: "X" | "Z"
): TMapAll => [x, y, z, colour, Slope, { direction: DirectionAngle[type] }];

const getFire = (x: number, y: number, z: number): TMapAll => [
  x,
  y,
  z,
  undefined,
  Fire,
];

const fiddleWithMap = (map: TMap, onComplete: TCompleteLevel) => {
  map.push([1, 0, 1, dusty]);
  map.push([2, 1, 2, pyramid]);

  {
    const index = map.findIndex(([x, y, z]) => x === 1 && y === 1 && z === 1);
    map.splice(index, 1);
  }
  {
    const slope = getSlope(1, 1, 2, pyramid, "Z");
    const index = map.findIndex(([x, y, z]) => x === 1 && y === 1 && z === 2);
    map.splice(index, 1, slope);
  }
  {
    const slope = getSlope(2, 1, 1, pyramid, "X");
    const index = map.findIndex(([x, y, z]) => x === 2 && y === 1 && z === 1);
    map.splice(index, 1, slope);
  }

  {
    const slope = getSlope(5, 2, 2, pyramid, "Z");
    const index = map.findIndex(([x, y, z]) => x === 5 && y === 2 && z === 2);
    map.splice(index, 1, slope);
  }

  {
    const slope = getSlope(3, 3, 3, pyramid, "X");
    const index = map.findIndex(([x, y, z]) => x === 3 && y === 3 && z === 3);
    map.splice(index, 1, slope);
  }

  {
    const cube: any = getCube(4, 3, 4, yellow);
    cube.push({ onOver: () => onComplete("10") });
    const index = getIndex(map, 4, 3, 4);
    map.splice(index, 1, cube);
  }

  {
    const fire = getFire(1, 2, 4);
    map.push(fire);
  }

  {
    const fire = getFire(1, 2, 6);
    map.push(fire);
  }

  {
    const fire = getFire(3, 2, 1);
    map.push(fire);
  }
};

export const map = (onComplete: TCompleteLevel) => {
  const floor_$1: TMap = [...generateRing(new Point(-1, 0, -1), 10, 2, dusty)];
  const floor_0: TMap = [...generateRing(new Point(1, 1, 1), 6, 1, pyramid)];
  const floor_1: TMap = [...generateRing(new Point(2, 2, 2), 4, 1, pyramid)];
  const floor_2: TMap = [...generateRing(new Point(3, 3, 3), 2, 1, pyramid)];
  const floor_3: TMap = [];

  const map: TMap = [
    ...floor_3,
    ...floor_2,
    ...floor_1,
    ...floor_0,
    ...floor_$1,
  ];

  fiddleWithMap(map, onComplete);

  return computeMap(map, green);
};

export const Map_10: TMapOutput = (completeLevel) => [
  "10",
  "10",
  "10",
  map(completeLevel),
  undefined,
  //   new Point(-10 * cubeSize, 1 * cubeSize, 2 * cubeSize),
  new Direction(45, 30),
];
