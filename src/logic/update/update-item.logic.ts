import { Point } from "cinnamon";

import { wait } from "sage";

import { game } from "../../game/game";

import { isOverItem } from "../is-over-item.logic";

import { updateSlope } from "./update-slope.logic";
import { updateOnSlope } from "./update-on-slope.logic";
import { getNewItem } from "./get-new-item.logic";
import { getItemIn } from "./get-item-in.logic";

import { Slope } from "../../models/Slope.model";
import { Cube } from "../../models/Cube.model";
import { Ledge } from "../../models/Ledge.model";
import { Fire } from "../../models/Fire.model";

import { IRoof } from "../../interfaces/IRoof.interface";
import { ITraversable } from "../../interfaces/ITraversable.interface";
import { IItem } from "../../interfaces/IItem.interface";
import { IJeopardy } from "../../interfaces/IJeopardy.interface";

import { cubeSize, disabledTimeout } from "../../data/constants.data";

const logger = (
  type: string,
  oldPosition: Point,
  oldItem: IRoof | null,
  oldItemIn: IItem | null
) => {
  console.warn(
    type,
    "|",
    oldPosition,
    game.playerPosition,
    "|",
    oldItem,
    game.itemAbove,
    "|",
    oldItemIn,
    game.itemIn,
    "|",
    game.direction
  );
};

export const updateItem = (
  oldPosition: Point,
  oldItem: IRoof | null,
  oldItemIn: IItem | null
) => {
  const isOver = isOverItem();

  const reset = (type: string, position = oldPosition) => {
    logger(type, oldPosition, oldItem, oldItemIn);
    game.playerPosition = position;
    game.itemAbove = oldItem;
    game.itemIn = oldItemIn;
  };

  const resetToCentre = async (type: string) => {
    if (oldItem === null) return;

    let position = oldItem.item.position;

    position = position.clone({
      x: Math.round(position.x),
      y: oldItem.height,
      z: Math.round(position.z),
    });

    reset(type, position);
    game.disabled = true;
    await wait(disabledTimeout);
    game.disabled = false;
  };

  if (isOver === undefined || isOver.length === 0) {
    return reset("reset 1 -- There are no items below player");
  }

  if (oldItem?.item instanceof Slope) {
    const oldY = game.playerPosition.y;
    updateOnSlope(oldItem.item);
    if (oldY > game.playerPosition.y) {
      game.playerPosition = game.playerPosition.clone({ y: oldY });
    }
  }

  const y = Math.round(game.playerPosition.y * cubeSize) / cubeSize;

  const newItem = getNewItem(isOver, y);
  const newItemIn = getItemIn();
  game.itemAbove = newItem;
  game.itemIn = newItemIn ?? null;

  if (newItem === undefined) {
    reset("reset 6 -- newItem is undefined while there are items below player");
    return;
  }

  if (newItem instanceof Slope) {
    updateOnSlope(newItem);
  }

  if (newItemIn !== undefined) {
    if (
      (newItemIn as IItem & IJeopardy).on === undefined &&
      (newItemIn as IItem & ITraversable).climbable === false
    ) {
      reset("reset 8 -- player has passed through a wall");
      return;
    }
    if ((newItemIn as IItem & IJeopardy).on === true) {
      resetToCentre("reset 9 -- player has encountered jeopardy");
      return;
    }
  }

  if (
    (newItem.item as IItem & ITraversable).canTraverse !== undefined &&
    (newItem.item as IItem & ITraversable).canTraverse === false
  ) {
    return reset("reset 2 -- canTraverse flag is false");
  }

  if (oldItem?.item instanceof Cube && newItem.item instanceof Cube) {
    if (oldItem.item.position.y !== newItem.item.position.y) {
      reset("reset 7 -- Cube to Cube at wrong height");
    }
  }

  if (oldItem?.item instanceof Slope && newItem.item instanceof Slope) {
    updateOnSlope(newItem.item);
  }

  if (oldItem?.item instanceof Slope && !(newItem.item instanceof Slope)) {
    const crosses = updateSlope(
      oldPosition,
      newItem.item as Cube | Ledge | Fire,
      oldItem.item
    );
    if (typeof crosses === "string") {
      return reset(crosses);
    }
    const { topCross, bottomCross } = crosses;
    if (topCross) {
      game.playerPosition = game.playerPosition.clone({
        y: oldItem.item.top.y,
      });
    }
    if (bottomCross) {
      game.playerPosition = game.playerPosition.clone({
        y: oldItem.item.bottom.y,
      });
    }
  }

  if (
    newItem?.item instanceof Slope &&
    !(oldItem?.item instanceof Slope) &&
    oldItem !== null
  ) {
    const crosses = updateSlope(
      oldPosition,
      oldItem.item as Cube | Ledge | Fire,
      newItem?.item
    );

    if (typeof crosses === "string") {
      return reset(crosses);
    }
    const { topCross, bottomCross } = crosses;

    if (topCross) {
      game.playerPosition = game.playerPosition.clone({
        y: newItem.item.top.y,
      });
    }
    if (bottomCross) {
      game.playerPosition = game.playerPosition.clone({
        y: newItem.item.bottom.y,
      });
    }
  }
};
