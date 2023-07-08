import { game } from "../../game/game";

import { updateKeys } from "./update-keys.logic";
import { updateItem } from "./update-item.logic";
import { updateJeopardy } from "./update-jeopardy.logic";

import { ITraversable } from "../../interfaces/ITraversable.interface";
import { IItem } from "../../interfaces/IItem.interface";
import { IJeopardy } from "../../interfaces/IJeopardy.interface";

const updateRecyclers = () => {
  Object.values(game.recyclers).forEach((action) => action());
};

export const updateUI = () => {
  // We need to defined these BEFORE updateKeys because they will change in that function.
  const oldPosition = game.playerPosition;
  const oldItem = game.itemAbove;
  const oldItemIn = game.itemIn;

  // Update the game data based on keys pressed. Such as player location, direction and zoom amount.
  updateKeys(game.playerCanMove);

  // Update recyclers which runs the animations.
  updateRecyclers();

  // Find the current item the player is over and if different, represent that in the data.
  updateItem(oldPosition, oldItem, oldItemIn);

  // Move the items that have IJeopardy along
  updateJeopardy();

  (game.itemAbove?.item as IItem & ITraversable).onOver?.();
  (game.itemIn as (IItem & IJeopardy) | null)?.onEnter?.();
};
