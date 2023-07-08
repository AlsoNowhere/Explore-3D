import { Direction, Point } from "cinnamon";

import { Cube } from "../models/Cube.model";
import { Slope } from "../models/Slope.model";
import { Hinge, Ledge } from "../models/Ledge.model";
import { Fire } from "../models/Fire.model";

import { DirectionAngle } from "../enums/DirectionAngle.enum";

import { TItem_All } from "./TItem.type";

type TMapCube = [
  number,
  number,
  number,
  string?,
  typeof Cube?,
  {
    onOver?: () => void;
    reset?: () => void;
    canTraverse?: boolean;
  }?
];

type TMapSlope = [
  number,
  number,
  number,
  string,
  typeof Slope,
  {
    direction: DirectionAngle;
    onOver?: () => void;
    reset?: () => void;
  }
];

type TMapLedge = [
  number,
  number,
  number,
  string,
  typeof Ledge,
  {
    hinge: Hinge;
    onOver?: () => void;
    reset?: () => void;
  }
];

type TMapFire = [
  number,
  number,
  number,
  string | undefined,
  typeof Fire,
  {
    onEnter?: () => void;
    reset?: () => void;
  }?
];

export type TMapAll = TMapCube | TMapSlope | TMapLedge | TMapFire;

export type TMap = Array<TMapAll>;

export type TMapOutput = (
  completeLevel: TCompleteLevel
) => [string, string, string, Array<TItem_All>, Point?, Direction?, number?];

export type TCompleteLevel = (name: string) => void;
