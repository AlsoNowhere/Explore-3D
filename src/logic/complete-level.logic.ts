import { refresh } from "mint";

import { game } from "../game/game";

import { saveData } from "../services/save.service";

import { gameStore } from "../stores/game.store";

export const completeLevel = (name: string) => {
  if (!game.completedLevels.includes(name)) {
    game.completedLevels.push(name);
    saveData();
  }
  gameStore.gameOver = true;
  game.stop();
  refresh(gameStore);
};
