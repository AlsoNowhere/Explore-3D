import { Direction, Point } from "cinnamon";

import { completeLevel } from "../logic/complete-level.logic";

import { Level } from "../models/Level.model";

import { cubeSize } from "./constants.data";

import { Map_01 } from "./maps/Map-01";
import { Map_02 } from "./maps/Map-02";
import { Map_03 } from "./maps/Map-03";
import { Map_04 } from "./maps/Map-04";
import { Map_05 } from "./maps/Map-05";
import { Map_06 } from "./maps/Map-06";
import { Map_07 } from "./maps/Map-07";
import { Map_08 } from "./maps/Map-08";
import { Map_09 } from "./maps/Map-09";
import { Map_10 } from "./maps/Map-10";

export const levels = [
  new Level("01", "01", "01", Map_01(completeLevel)),
  new Level("02", "02", "02", Map_02(completeLevel)),
  new Level("03", "03", "03", Map_03(completeLevel), new Point(cubeSize, 0, 0)),
  new Level(
    "04",
    "04",
    "04",
    Map_04(completeLevel),
    undefined,
    new Direction(180, 30)
  ),
  new Level("05", "05", "05", Map_05(completeLevel)),
  new Level(...Map_06(completeLevel)),
  new Level(...Map_07(completeLevel)),
  new Level(...Map_08(completeLevel)),
  new Level(...Map_09(completeLevel)),
  new Level(...Map_10(completeLevel)),
];
