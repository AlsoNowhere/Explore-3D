import { game } from "../../game/game";

import { generateCube } from "../../services/generate-cube.service";

import { Player } from "../../models/Player.model";

import { playerColour, playerColourFlash } from "../../data/constants.data";

const count = 2;
let countDown = count;
let playerFlash = false;

export const renderPlayer = () => {
  const { x, y, z } = game.playerPosition;
  if (game.disabled) {
    if (countDown === 0) {
      countDown = count;
      playerFlash = !playerFlash;
    } else {
      countDown--;
    }
  } else {
    countDown = count;
    playerFlash = false;
  }
  const colour = playerFlash ? playerColourFlash : playerColour;
  return new Player(
    "player",
    game.playerPosition,
    Object.values(generateCube(x, y, z, colour, 0.1))
  );
};
