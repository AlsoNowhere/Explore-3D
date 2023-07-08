import { Slope } from "../../models/Slope.model";

import { IRoof } from "../../interfaces/IRoof.interface";
import { IItem } from "../../interfaces/IItem.interface";

const filter = (item: IItem, height: number, y: number) => {
  if (item instanceof Slope) {
    return item.bottom.y <= y || item.top.y <= y;
  }
  return height <= y;
};

export const getNewItem = (isOver: Array<IRoof>, y: number) => {
  const [newItem] = isOver
    .filter(({ item, height }) => filter(item, height, y))
    .sort((a, b) => b.height - a.height);
  return newItem;
};
