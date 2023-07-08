import { game } from "../../game/game";

import { IItem } from "../../interfaces/IItem.interface";
import { IJeopardy } from "../../interfaces/IJeopardy.interface";

type TItem = IItem & IJeopardy;

export const updateJeopardy = () => {
  const { map } = game;
  if (map === null) return;

  const j: Array<TItem> = map.filter(
    (x) => (x as TItem).on !== undefined
  ) as Array<TItem>;

  j.forEach(({ updateJeopardy }) => updateJeopardy());
};
