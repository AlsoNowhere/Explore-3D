import { Cinnamon } from "cinnamon";

export const getPlayerIndex = (cinnamon: Cinnamon) =>
  cinnamon.points.findIndex(({ id }) => id === "player");
