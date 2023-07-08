import { game } from "../game/game";

import { localStorageKey } from "../data/constants.data";

export const saveData = () => {
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({ levels: game.completedLevels })
  );
};
