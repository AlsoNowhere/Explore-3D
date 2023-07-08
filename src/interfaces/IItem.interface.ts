import { Point, Polygon } from "cinnamon";

import { Player } from "../models/Player.model";

import { TEvent } from "../types/TEvent.type";
import { TItem_All } from "../types/TItem.type";

export interface IItem {
  position: Point;
  id: number;
  polygons: Array<Polygon>;
  colour: string;
  reset?: TEvent;
  changeColour: (_colour: string) => void;
  itemOrder: (
    below: Array<IItemDistance>,
    above: Array<IItemDistance>,
    player: Player
  ) => Array<Player | IItemDistance>;
}

export interface IItemDistance extends IItem {
  distance: number;
  from: TItem_All;
}
