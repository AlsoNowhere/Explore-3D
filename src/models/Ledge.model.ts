import { Point, Polygon, RADIANS } from "cinnamon";

import { get } from "sage";

import { game } from "../game/game";

import { generateRectangle } from "../services/generate-rectangle.service";
import { round } from "../services/round.service";

import { Player } from "./Player.model";

import { IItem, IItemDistance } from "../interfaces/IItem.interface";
import { generateLedge } from "../services/generate-ledge.service";
import { ITraversable } from "../interfaces/ITraversable.interface";
import { IRoof } from "../interfaces/IRoof.interface";

import { cubeSize, time } from "../data/constants.data";
import { shapeId } from "../data/other.data";

const c = cubeSize / 2;
const eigth = cubeSize / 8;

interface IOptions {
  colour: string;
  hinge: Hinge | null;
}

export class Ledge implements IItem, ITraversable {
  position: Point;
  id: number;
  colour: string;
  canTraverse: boolean;
  hinge: Hinge | null;
  polygons: Array<Polygon>;
  roof: IRoof;
  climbable: false;
  changeColour: (_colour: string) => void;
  itemOrder: (
    below: Array<IItemDistance>,
    above: Array<IItemDistance>,
    player: Player
  ) => Array<Player | IItemDistance>;

  constructor(
    position: Point,
    { colour = "rgba(0, 0, 0, 0.6)", hinge = null }: IOptions
  ) {
    this.position = position;
    this.id = shapeId.id++;
    this.hinge = hinge;
    hinge && (hinge.ledge = this);
    this.climbable = false;

    get(this, "colour", () => colour);

    get(this, "canTraverse", function () {
      return this.hinge === null ? true : this.hinge.state === "up";
    });

    get(this, "hingeJoint", function () {
      if (this.hinge === null) return null;
      if (this.hinge.location === "Z")
        return position.clone({ y: position.y + c, z: position.z + c });
      if (this.hinge.location === "Z-")
        return position.clone({ y: position.y + c, z: position.z - c });
      if (this.hinge.location === "X")
        return position.clone({ y: position.y + c, x: position.x + c });
      if (this.hinge.location === "X-")
        return position.clone({ y: position.y + c, x: position.x - c });
    });

    const { x, y, z } = position;

    // this.polygons = [];

    const height = round(y + c);

    generateLedge(this, x, z, eigth, colour, height);

    this.changeColour = (_colour) => {
      colour = _colour;
      generateLedge(this, x, z, eigth, colour, height);
      // const polygons = generateCube(x, y, z, colour);
      // this.polygons = Object.values(polygons);
    };

    this.itemOrder = function (
      below: Array<IItemDistance>,
      above: Array<IItemDistance>,
      player: Player
    ) {
      return [...below, player, ...above];
    };
  }

  public calculateHinge = function (height: number) {
    const { floor, roof, left, right, back, front } = generateRectangle(
      this.position.x,
      height - eigth / 2,
      this.position.z,
      this.colour,
      new Point(cubeSize, eigth, cubeSize)
    );

    const { _floor, _roof, _left, _right, _back, _front } = (() => {
      if (this.hinge.location.includes("Z")) {
        const _floor = floor.clone({
          points: floor.points.map((point) => {
            const { y, z } = point;
            return point.clone({
              y:
                z === this.hingeJoint.z
                  ? y
                  : this.hingeJoint.y -
                    round(Math.sin(this.hinge.angle / RADIANS) * cubeSize) -
                    eigth,
              z:
                z === this.hingeJoint.z
                  ? z
                  : this.hingeJoint.z +
                    round(Math.cos(this.hinge.angle / RADIANS) * cubeSize) *
                      (this.hinge.location.includes("-") ? 1 : -1),
            });
          }),
        });
        const _roof = roof.clone({
          points: roof.points.map((point) => {
            const { y, z } = point;
            const newPoint = point.clone({
              y:
                z === this.hingeJoint.z
                  ? y
                  : this.hingeJoint.y -
                    round(Math.sin(this.hinge.angle / RADIANS) * cubeSize),
              z:
                z === this.hingeJoint.z
                  ? z
                  : this.hingeJoint.z +
                    round(Math.cos(this.hinge.angle / RADIANS) * cubeSize) *
                      (this.hinge.location.includes("-") ? 1 : -1),
            });
            return newPoint;
          }),
        });
        const _left = left.clone({
          points: left.points.map((point) => {
            const { y, z } = point;
            const newPoint = point.clone({
              y:
                z === this.hingeJoint.z
                  ? y
                  : this.hingeJoint.y -
                    round(Math.sin(this.hinge.angle / RADIANS) * cubeSize) -
                    (y === this.hingeJoint.y ? 0 : eigth),
              z:
                z === this.hingeJoint.z
                  ? z
                  : this.hingeJoint.z +
                    round(Math.cos(this.hinge.angle / RADIANS) * cubeSize) *
                      (this.hinge.location.includes("-") ? 1 : -1),
            });
            return newPoint;
          }),
        });
        const _right = right.clone({
          points: right.points.map((point) => {
            const { y, z } = point;
            const newPoint = point.clone({
              y:
                z === this.hingeJoint.z
                  ? y
                  : this.hingeJoint.y -
                    round(Math.sin(this.hinge.angle / RADIANS) * cubeSize) -
                    (y === this.hingeJoint.y ? 0 : eigth),
              z:
                z === this.hingeJoint.z
                  ? z
                  : this.hingeJoint.z +
                    round(Math.cos(this.hinge.angle / RADIANS) * cubeSize) *
                      (this.hinge.location.includes("-") ? 1 : -1),
            });
            return newPoint;
          }),
        });
        const _back =
          this.hinge.location === "Z-"
            ? back
            : back.clone({
                points: back.points.map((point) => {
                  const { y, z } = point;
                  const newPoint = point.clone({
                    y:
                      z === this.hingeJoint.z
                        ? y
                        : this.hingeJoint.y -
                          round(
                            Math.sin(this.hinge.angle / RADIANS) * cubeSize
                          ) -
                          (y === this.hingeJoint.y ? 0 : eigth),
                    z:
                      z === this.hingeJoint.z
                        ? z
                        : this.hingeJoint.z +
                          round(
                            Math.cos(this.hinge.angle / RADIANS) * cubeSize
                          ) *
                            (this.hinge.location.includes("-") ? 1 : -1),
                  });
                  return newPoint;
                }),
              });
        const _front =
          this.hinge.location === "Z"
            ? front
            : front.clone({
                points: front.points.map((point) => {
                  const { y, z } = point;
                  const newPoint = point.clone({
                    y:
                      z === this.hingeJoint.z
                        ? y
                        : this.hingeJoint.y -
                          round(
                            Math.sin(this.hinge.angle / RADIANS) * cubeSize
                          ) -
                          (y === this.hingeJoint.y ? 0 : eigth),
                    z:
                      z === this.hingeJoint.z
                        ? z
                        : this.hingeJoint.z +
                          round(
                            Math.cos(this.hinge.angle / RADIANS) * cubeSize
                          ) *
                            (this.hinge.location.includes("-") ? 1 : -1),
                  });
                  return newPoint;
                }),
              });
        return { _floor, _roof, _left, _right, _back, _front };
      } else {
        const _floor = floor.clone({
          points: floor.points.map((point) => {
            const { x, y } = point;
            return point.clone({
              y:
                x === this.hingeJoint.x
                  ? y
                  : this.hingeJoint.y -
                    round(Math.sin(this.hinge.angle / RADIANS) * cubeSize) -
                    eigth,
              x:
                x === this.hingeJoint.x
                  ? x
                  : this.hingeJoint.x +
                    round(Math.cos(this.hinge.angle / RADIANS) * cubeSize) *
                      (this.hinge.location.includes("-") ? 1 : -1),
            });
          }),
        });
        const _roof = roof.clone({
          points: roof.points.map((point) => {
            const { x, y } = point;
            const newPoint = point.clone({
              x:
                x === this.hingeJoint.x
                  ? x
                  : this.hingeJoint.x +
                    round(Math.cos(this.hinge.angle / RADIANS) * cubeSize) *
                      (this.hinge.location.includes("-") ? 1 : -1),
              y:
                x === this.hingeJoint.x
                  ? y
                  : this.hingeJoint.y -
                    round(Math.sin(this.hinge.angle / RADIANS) * cubeSize),
            });
            return newPoint;
          }),
        });
        const _left = left.clone({
          points: left.points.map((point) => {
            const { x, y } = point;
            const newPoint = point.clone({
              x:
                x === this.hingeJoint.x
                  ? x
                  : this.hingeJoint.x +
                    round(Math.cos(this.hinge.angle / RADIANS) * cubeSize) *
                      (this.hinge.location.includes("-") ? 1 : -1),
              y:
                x === this.hingeJoint.x
                  ? y
                  : this.hingeJoint.y -
                    round(Math.sin(this.hinge.angle / RADIANS) * cubeSize) -
                    (y === this.hingeJoint.y ? 0 : eigth),
            });
            return newPoint;
          }),
        });
        const _right = right.clone({
          points: right.points.map((point) => {
            const { x, y } = point;
            const newPoint = point.clone({
              x:
                x === this.hingeJoint.x
                  ? x
                  : this.hingeJoint.x +
                    round(Math.cos(this.hinge.angle / RADIANS) * cubeSize) *
                      (this.hinge.location.includes("-") ? 1 : -1),
              y:
                x === this.hingeJoint.x
                  ? y
                  : this.hingeJoint.y -
                    round(Math.sin(this.hinge.angle / RADIANS) * cubeSize) -
                    (y === this.hingeJoint.y ? 0 : eigth),
            });
            return newPoint;
          }),
        });
        const _back =
          this.hinge.location === "Z-"
            ? back
            : back.clone({
                points: back.points.map((point) => {
                  const { x, y } = point;
                  const newPoint = point.clone({
                    x:
                      x === this.hingeJoint.x
                        ? x
                        : this.hingeJoint.x +
                          round(
                            Math.cos(this.hinge.angle / RADIANS) * cubeSize
                          ) *
                            (this.hinge.location.includes("-") ? 1 : -1),
                    y:
                      x === this.hingeJoint.x
                        ? y
                        : this.hingeJoint.y -
                          round(
                            Math.sin(this.hinge.angle / RADIANS) * cubeSize
                          ) -
                          (y === this.hingeJoint.y ? 0 : eigth),
                  });
                  return newPoint;
                }),
              });
        const _front =
          this.hinge.location === "Z"
            ? front
            : front.clone({
                points: front.points.map((point) => {
                  const { x, y } = point;
                  const newPoint = point.clone({
                    x:
                      x === this.hingeJoint.x
                        ? x
                        : this.hingeJoint.x +
                          round(
                            Math.cos(this.hinge.angle / RADIANS) * cubeSize
                          ) *
                            (this.hinge.location.includes("-") ? 1 : -1),
                    y:
                      x === this.hingeJoint.x
                        ? y
                        : this.hingeJoint.y -
                          round(
                            Math.sin(this.hinge.angle / RADIANS) * cubeSize
                          ) -
                          (y === this.hingeJoint.y ? 0 : eigth),
                  });
                  return newPoint;
                }),
              });
        return { _floor, _roof, _left, _right, _back, _front };
      }
    })();

    return [_floor, _roof, _left, _right, _back, _front];
  };
}

let hingeId = 0;

export class Hinge {
  id: number;
  location: string;
  state: string;
  currentMovement: number | null;
  ledge: Ledge | null;

  angle: number;

  changeState: (_state: string) => void;

  constructor(location: string, state = "up", speed = 1000) {
    this.id = hingeId++;
    this.location = location;
    this.state = state;
    this.currentMovement = null;

    get(this, "angle", function () {
      if (this.currentMovement !== null) {
        const value = Number(((90 * this.currentMovement) / speed).toFixed(2));
        return this.state.includes("down") ? value : 90 - value;
      }
      return this.state === "up" ? 0 : 90;
    });

    this.changeState = (_state: string) => {
      if (this.currentMovement !== null) return;
      this.state = `going-${_state}`;
      this.currentMovement = 0;
      const id = `hinge-${this.id}`;
      game.recyclers[id] = () => {
        if (this.currentMovement === null) return;
        this.currentMovement += time;
        if (this.currentMovement < speed) return;
        this.currentMovement = null;
        delete game.recyclers[id];
        this.state = _state;
      };
    };
  }
}
