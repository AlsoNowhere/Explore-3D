import { Point, Polygon } from "cinnamon";

import { get } from "sage";

import { generateFire } from "../services/generate-fire.service";

import { Player } from "./Player.model";

import { IRoof } from "../interfaces/IRoof.interface";
import { IItem, IItemDistance } from "../interfaces/IItem.interface";
import { IJeopardy } from "../interfaces/IJeopardy.interface";

import { shapeId } from "../data/other.data";
import { red } from "../data/colours.data";
import { fireCount } from "../data/constants.data";

import { TEvent } from "../types/TEvent.type";

export class Fire implements IItem, IJeopardy {
  position: Point;
  id: number;
  roof: IRoof;
  polygons: Array<Polygon>;
  colour: string;
  on: boolean;
  canTraverse: false;
  onEnter: () => void;
  reset?: TEvent;
  changeColour: (_colour: string) => void;
  itemOrder: (
    below: Array<IItemDistance>,
    above: Array<IItemDistance>,
    player: Player
  ) => Array<Player | IItemDistance>;
  updateJeopardy: () => void;

  constructor(
    position: Point,
    {
      colour = red,
      onEnter,
      reset,
    }: { colour: string; onEnter?: () => void; reset?: TEvent }
  ) {
    this.position = position;
    this.id = shapeId.id++;

    this.on = true;

    this.onEnter = () => {
      onEnter?.();
    };

    this.reset = reset;

    get(this, "colour", () => colour);

    const { x, y, z } = position;

    get(this, "polygons", () => Object.values(generateFire(x, y, z, this.on)));

    this.changeColour = (_colour) => {
      colour = _colour;
    };

    this.itemOrder = (
      below: Array<IItemDistance>,
      above: Array<IItemDistance>,
      player: Player
    ) => {
      return [...below, player, ...above];
    };

    this.updateJeopardy = (() => {
      let countDown = fireCount;
      return () => {
        if (countDown === 0) {
          this.on = !this.on;
          countDown = fireCount;
        } else {
          countDown--;
        }
      };
    })();
  }
}
