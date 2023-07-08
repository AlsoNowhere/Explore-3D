import { Point } from "cinnamon";

import { get } from "sage";

import { generateRectangle } from "./generate-rectangle.service";

import { Ledge } from "../models/Ledge.model";

import { cubeSize } from "../data/constants.data";

export const generateLedge = (
  ledge: Ledge,
  x: number,
  z: number,
  eigth: number,
  colour: string,
  height: number
) => {
  {
    const polygons = generateRectangle(
      x,
      height - eigth / 2,
      z,
      colour,
      new Point(cubeSize, eigth, cubeSize)
    );

    ledge.roof = {
      polygon: polygons.roof,
      item: ledge,
      height,
    };

    get(ledge, "polygons", function () {
      if (this.hinge === null) return Object.values(polygons);
      return this.calculateHinge(height, colour);
    });
  }
};
