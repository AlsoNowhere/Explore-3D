import { Direction, Point } from "cinnamon";

import { defaultDirection, defaultViewDistance } from "../data/constants.data";

import { TItem_All } from "../types/TItem.type";

export class Level {
  label: string;
  url: string;
  name: string;
  map: Array<TItem_All>;
  playerPosition: Point;
  direction: Direction;
  viewDistance: number;
  complete: boolean;

  constructor(
    label: string,
    url: string,
    name: string,
    map: Array<TItem_All>,
    playerPosition: Point = new Point(0, 0, 0),
    direction: Direction = new Direction(...defaultDirection),
    viewDistance: number = defaultViewDistance
  ) {
    this.label = label;
    this.url = url;
    this.name = name;
    this.map = map;
    // this.playerPosition = playerPosition.clone({
    //   options: { colour: playerColour },
    // });
    this.playerPosition = playerPosition.clone();
    this.direction = direction;
    this.viewDistance = viewDistance;
    this.complete = false;
  }
}
