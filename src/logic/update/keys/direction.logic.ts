import { RADIANS } from "cinnamon";

import { game } from "../../../game/game";

import { round } from "../../../services/round.service";

import { playerMovement } from "../../../data/constants.data";

export const updateDirection = (playerCanMove: boolean) => {
  if (playerCanMove) {
    if (!game.pressed.shift && !game.pressed.control) {
      const sin = Math.sin(game.direction.zx / RADIANS) * playerMovement;
      const cos = Math.cos(game.direction.zx / RADIANS) * playerMovement;

      if (game.pressed.left) {
        const { playerPosition: pos } = game;
        const { x, z } = pos;
        const _x = round(x - cos);
        const _z = round(z + sin);
        game.playerPosition = pos.clone({ x: _x, z: _z });
      }

      if (game.pressed.up) {
        const { playerPosition: pos } = game;
        const { x, z } = pos;
        const _x = round(x + sin);
        const _z = round(z + cos);
        game.playerPosition = pos.clone({ x: _x, z: _z });
      }

      if (game.pressed.right) {
        const { playerPosition: pos } = game;
        const { x, z } = pos;
        const _x = round(x + cos);
        const _z = round(z - sin);
        game.playerPosition = pos.clone({ x: _x, z: _z });
      }

      if (game.pressed.down) {
        const { playerPosition: pos } = game;
        const { x, z } = pos;
        const _x = round(x - sin);
        const _z = round(z - cos);
        game.playerPosition = pos.clone({ x: _x, z: _z });
      }
    }
  }
};
