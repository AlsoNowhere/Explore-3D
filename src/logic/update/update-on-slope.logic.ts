import { game } from "../../game/game";

import { Slope } from "../../models/Slope.model";

const calculateHeight = (newItem: Slope): number => {
  const { x, z } = newItem.bottom;
  const { playerPosition: pos } = game;
  const { direction } = newItem;
  if (direction === "Z") return pos.z - z;
  if (direction === "Z-") return 0 - (pos.z - z);
  if (direction === "X") return pos.x - x;
  if (direction === "X-") return 0 - (pos.x - x);
  return 0;
};

export const updateOnSlope = (newItem: Slope) => {
  // Calculate the new height where the player is on the slope.
  const height = calculateHeight(newItem);
  const y = newItem.floor + height;
  game.playerPosition = game.playerPosition.clone({ y });
};
