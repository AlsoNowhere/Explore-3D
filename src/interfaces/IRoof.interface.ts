import { Polygon } from "cinnamon";

import { IItem } from "./IItem.interface";

export interface IRoof {
  polygon: Polygon;
  item: IItem;
  height: number;
}
