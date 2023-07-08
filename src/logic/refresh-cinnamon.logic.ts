import { Cinnamon, Point, RADIANS } from "cinnamon";

import { game } from "../game/game";

export const refreshCinnamon = (cinnamon: Cinnamon) => {
  const { x, y, z } = game.playerPosition;

  const zxDistance = Math.cos(game.direction.y / RADIANS) * game.viewDistance;

  cinnamon.direction = game.direction;

  cinnamon.centre = new Point(
    Math.sin(game.direction.zx / RADIANS) * -zxDistance + x,
    Math.sin(game.direction.y / RADIANS) * game.viewDistance + y,
    Math.cos(game.direction.zx / RADIANS) * -zxDistance + z
  );
};
