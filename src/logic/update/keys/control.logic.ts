import { game } from "../../../game/game";

const zoomChange = 5;
const zoomLimitMin = 20;
const zoomLimitMax = 110;

export const updateControl = () => {
  if (game.pressed.control) {
    if (game.pressed.up) {
      game.viewDistance -= zoomChange;
      if (game.viewDistance < zoomLimitMin) {
        game.viewDistance = zoomLimitMin;
      }
    }

    if (game.pressed.down) {
      game.viewDistance += zoomChange;
      if (game.viewDistance > zoomLimitMax) {
        game.viewDistance = zoomLimitMax;
      }
    }
  }
};
