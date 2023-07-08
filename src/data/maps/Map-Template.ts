import { Direction, Point } from "cinnamon";

import { computeMap } from "../../logic/compute-map.logic";
import { getLedges } from "../../logic/get-ledge.logic";

import { Ledge } from "../../models/Ledge.model";
import { Slope } from "../../models/Slope.model";
import { Cube } from "../../models/Cube.model";

import { green } from "../colours.data";
import { cubeSize } from "../constants.data";

import { DirectionAngle } from "../../enums/DirectionAngle.enum";

import { TCompleteLevel, TMap, TMapOutput } from "../../types/TMap.type";

export const map = (onComplete: TCompleteLevel) => {
  const floor_$1: TMap = [];

  const floor_0: TMap = [];

  const floor_1: TMap = [];

  const floor_2: TMap = [];

  const floor_3: TMap = [];

  const map: TMap = [
    ...floor_3,
    ...floor_2,
    ...floor_1,
    ...floor_0,
    ...floor_$1,
  ];
  return computeMap(map, green);
};

export const Map_00: TMapOutput = (completeLevel) => [
  "00",
  "00",
  "00",
  map(completeLevel),
  undefined,
  //   new Point(0 * cubeSize, 0 * cubeSize, 0 * cubeSize),
  new Direction(45, 30),
];
