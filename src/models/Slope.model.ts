import { Line2D, Point, Point2D, Polygon } from "cinnamon";

import { game } from "../game/game";

import { generateSlope } from "../services/generate-slope.service";
import { round } from "../services/round.service";

import { Player } from "./Player.model";

import { IRoof } from "../interfaces/IRoof.interface";
import { IItem, IItemDistance } from "../interfaces/IItem.interface";
import { ITraversable } from "../interfaces/ITraversable.interface";

import { cubeSize } from "../data/constants.data";
import { shapeId } from "../data/other.data";

import { DirectionAngle } from "../enums/DirectionAngle.enum";

import { TEvent } from "../types/TEvent.type";

const c = cubeSize / 2;

export class Slope implements IItem, ITraversable {
  position: Point;
  id: number;
  colour: string;
  canTraverse: boolean;
  direction: DirectionAngle;
  angles: [number, number];
  top: Point;
  bottom: Point;
  topLine: Line2D;
  bottomLine: Line2D;
  roof: IRoof;
  floor: number;
  polygons: Array<Polygon>;
  climbable: true;
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
      direction,
      onOver,
      reset,
    }: {
      colour: string;
      direction: DirectionAngle;
      onOver?: TEvent;
      reset?: TEvent;
    }
  ) {
    this.position = position;
    this.id = shapeId.id++;
    this.colour = colour;
    this.canTraverse = true;
    this.direction = direction;
    this.climbable = true;
    this.onOver = onOver;
    this.reset = reset;

    if (direction === DirectionAngle["Z"]) this.angles = [90, 270];
    if (direction === DirectionAngle["Z-"]) this.angles = [270, 90];
    if (direction === DirectionAngle["X"]) this.angles = [0, 180];
    if (direction === DirectionAngle["X-"]) this.angles = [180, 360];

    const { x, y, z } = position;

    {
      const newX = direction.includes("Z") ? 0 : direction === "X" ? c : -c;
      const newZ = direction.includes("X") ? 0 : direction === "Z" ? c : -c;

      this.top = new Point(x + newX, y + c, z + newZ);
      this.bottom = new Point(x - newX, y - c, z - newZ);

      if (direction.includes("Z")) {
        this.topLine = new Line2D(
          new Point2D(this.top.x - c, this.top.z),
          new Point2D(this.top.x + c, this.top.z)
        );
        this.bottomLine = new Line2D(
          new Point2D(this.bottom.x - c, this.bottom.z),
          new Point2D(this.bottom.x + c, this.bottom.z)
        );
      } else {
        this.topLine = new Line2D(
          new Point2D(this.top.x, this.top.z - c),
          new Point2D(this.top.x, this.top.z + c)
        );
        this.bottomLine = new Line2D(
          new Point2D(this.bottom.x, this.bottom.z - c),
          new Point2D(this.bottom.x, this.bottom.z + c)
        );
      }
    }

    const { polygons, slopePolygons } = generateSlope(
      x,
      y,
      z,
      colour,
      direction
    );

    this.roof = {
      polygon: polygons.roof,
      item: this,
      height: round(y + c),
    };

    this.floor = y - c;

    this.polygons = [...slopePolygons];

    this.changeColour = (_colour) => {
      colour = _colour;
      // const polygons = generateCube(x, y, z, colour);
      // this.polygons = Object.values(polygons);
      const { slopePolygons } = generateSlope(x, y, z, colour, direction);
      this.polygons = [...slopePolygons];
    };

    this.itemOrder = (
      below: Array<IItemDistance>,
      above: Array<IItemDistance>,
      player: Player
    ) => {
      const { zx } = game.direction;
      const [from, to] = this.angles;
      const items: Array<IItemDistance | Player> = [...below, ...above];
      const index = items.findIndex(({ id }) => Number(id) === this.id);
      const target = zx > from && zx < to ? index + 1 : index;
      items.splice(target, 0, player);
      return items;
    };
  }
}
