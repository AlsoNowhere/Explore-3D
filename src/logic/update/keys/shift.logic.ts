import { game } from "../../../game/game";

import {
  maxY,
  minY,
  yAngleAttack,
  zxAngleAttack,
} from "../../../data/constants.data";

export const updateShift = () => {
  if (game.pressed.shift) {
    if (game.pressed.left) {
      game.direction.zx += zxAngleAttack;
      if (game.direction.zx > 360) {
        game.direction.zx = game.direction.zx - 360;
      }
    }

    if (game.pressed.up) {
      game.direction.y -= yAngleAttack;
      if (game.direction.y < minY) {
        game.direction.y = minY;
      }
    }

    if (game.pressed.right) {
      game.direction.zx -= zxAngleAttack;
      if (game.direction.zx < 0) {
        game.direction.zx = 360 + game.direction.zx;
      }
    }

    if (game.pressed.down) {
      game.direction.y += yAngleAttack;
      if (game.direction.y > maxY) {
        game.direction.y = maxY;
      }
    }
  }
};
