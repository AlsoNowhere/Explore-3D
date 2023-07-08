import { Point, Polygon } from "cinnamon";

import { get } from "sage";

import { generateCube } from "../services/generate-cube.service";
import { round } from "../services/round.service";

import { Player } from "./Player.model";

import { IRoof } from "../interfaces/IRoof.interface";
import { IItem, IItemDistance } from "../interfaces/IItem.interface";
import { ITraversable } from "../interfaces/ITraversable.interface";

import { cubeSize } from "../data/constants.data";
import { shapeId } from "../data/other.data";

import { TEvent } from "../types/TEvent.type";

const c = cubeSize / 2;

export class Cube implements IItem, ITraversable {
  position: Point;
  id: number;
  canTraverse: boolean;
  roof: IRoof;
  polygons: Array<Polygon>;
  colour: string;
  climbable: false;
  onOver?: TEvent;
  reset?: TEvent;
  changeColour: (_colour: string) => void;
  itemOrder: (
    below: Array<IItemDistance>,
    above: Array<IItemDistance>,
    player: Player
  ) => Array<Player | IItemDistance>;

  constructor(
    position: Point,
    {
      colour = "rgba(0, 0, 0, 0.6)",
      canTraverse = true,
      onOver,
      reset,
    }: { colour: string; canTraverse: boolean; onOver?: TEvent; reset?: TEvent }
  ) {
    this.position = position;
    this.id = shapeId.id++;
    this.canTraverse = canTraverse;
    this.climbable = false;
    this.onOver = onOver;
    this.reset = reset;

    get(this, "colour", () => colour);

    const { x, y, z } = position;

    const polygons = generateCube(x, y, z, colour);

    this.roof = {
      polygon: polygons.roof,
      item: this,
      height: round(y + c),
    };

    this.polygons = Object.values(polygons);

    this.changeColour = (_colour) => {
      colour = _colour;
      const polygons = generateCube(x, y, z, colour);
      this.polygons = Object.values(polygons);
    };

    this.itemOrder = (
      below: Array<IItemDistance>,
      above: Array<IItemDistance>,
      player: Player
    ) => {
      return [...below, player, ...above];
    };
  }
}
