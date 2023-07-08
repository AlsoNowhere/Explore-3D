import { IStore, Store } from "mint";

export const gameStore = new Store({
  gameOver: false,
}) as IStore & { gameOver: boolean };
