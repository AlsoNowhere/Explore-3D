import { game } from "../../game/game";

import { cubeSize } from "../../data/constants.data";

export const getItemIn = () => {
  if (game.map === null) return;
  let { x, y, z } = game.playerPosition;
  [x, y, z] = [x, y, z].map((x) => Math.round(x / cubeSize));
  const item = game.map.find(
    ({ position }) =>
      Math.round(position.x / cubeSize) === x &&
      Math.round(position.y / cubeSize) === y &&
      Math.round(position.z / cubeSize) === z
  );
  return item;
};
