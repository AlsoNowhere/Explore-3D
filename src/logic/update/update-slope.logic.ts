import { Line2D, Point, Point2D, intersectLines2D } from "cinnamon";

import { game } from "../../game/game";

import { Slope } from "../../models/Slope.model";
import { Cube } from "../../models/Cube.model";
import { Ledge } from "../../models/Ledge.model";
import { Fire } from "../../models/Fire.model";

import { cubeSize } from "../../data/constants.data";

import { TItem_All } from "../../types/TItem.type";

const checkEnteringNewSlope = (
  oldPosition: Point,
  item: TItem_All,
  slope: Slope
): string | { topCross: boolean; bottomCross: boolean } => {
  const lineOfMovement = new Line2D(
    new Point2D(oldPosition.x, oldPosition.z),
    new Point2D(game.playerPosition.x, game.playerPosition.z)
  );

  const topCross = intersectLines2D(slope.topLine, lineOfMovement);
  const bottomCross = intersectLines2D(slope.bottomLine, lineOfMovement);

  const height = item.position.y + cubeSize / 2;

  if (topCross !== null) {
    if (slope.top.y !== height) {
      return "reset 3 -- Slope - Top of Slope crossed and height wrong";
    }
  }

  if (bottomCross !== null) {
    if (slope.bottom.y !== height) {
      return "reset 4 -- Slope - Bottom of Slope crossed and height wrong";
    }
  }

  if (topCross === null && bottomCross === null) {
    return "reset 5 -- Slope - Neight top nor bottom crossed into Slope";
  }

  return { topCross: !!topCross, bottomCross: !!bottomCross };
};

export const updateSlope = (
  oldPosition: Point,
  item: Cube | Ledge | Fire,
  slope: Slope
) => {
  const checkEnterSlope = checkEnteringNewSlope(oldPosition, item, slope);
  return checkEnterSlope;
};
