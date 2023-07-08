import { Point, Polygon } from "cinnamon";

import { generateCube } from "./generate-cube.service";

import { cubeSize } from "../data/constants.data";

import { DirectionAngle } from "../enums/DirectionAngle.enum";

const c = cubeSize / 2;

export const generateSlope = (
  x: number,
  y: number,
  z: number,
  colour: string,
  direction: DirectionAngle
) => {
  const polygons = generateCube(x, y, z, colour);

  const slopePolygons = [polygons.floor];

  if (direction === "X") {
    slopePolygons.push(polygons.right);
    slopePolygons.push(
      new Polygon(
        [
          new Point(x + c, y - c, z - c),
          new Point(x - c, y - c, z - c),
          new Point(x + c, y + c, z - c),
        ],
        { colour }
      ),
      new Polygon(
        [
          new Point(x + c, y - c, z + c),
          new Point(x - c, y - c, z + c),
          new Point(x + c, y + c, z + c),
        ],
        { colour }
      ),
      new Polygon(
        [
          new Point(x + c, y + c, z - c),
          new Point(x - c, y - c, z - c),
          new Point(x - c, y - c, z + c),
          new Point(x + c, y + c, z + c),
        ],
        { colour }
      )
    );
  }

  if (direction === "X-") {
    slopePolygons.push(polygons.left);
    slopePolygons.push(
      new Polygon(
        [
          new Point(x + c, y - c, z - c),
          new Point(x - c, y - c, z - c),
          new Point(x - c, y + c, z - c),
        ],
        { colour }
      ),
      new Polygon(
        [
          new Point(x + c, y - c, z + c),
          new Point(x - c, y - c, z + c),
          new Point(x - c, y + c, z + c),
        ],
        { colour }
      ),
      new Polygon(
        [
          new Point(x - c, y + c, z - c),
          new Point(x + c, y - c, z - c),
          new Point(x + c, y - c, z + c),
          new Point(x - c, y + c, z + c),
        ],
        { colour }
      )
    );
  }

  if (direction === "Z") {
    slopePolygons.push(polygons.front);
    slopePolygons.push(
      new Polygon(
        [
          new Point(x - c, y + c, z + c),
          new Point(x - c, y - c, z - c),
          new Point(x - c, y - c, z + c),
        ],
        { colour }
      ),
      new Polygon(
        [
          new Point(x + c, y + c, z + c),
          new Point(x + c, y - c, z - c),
          new Point(x + c, y - c, z + c),
        ],
        { colour }
      ),
      new Polygon(
        [
          new Point(x - c, y - c, z - c),
          new Point(x - c, y + c, z + c),
          new Point(x + c, y + c, z + c),
          new Point(x + c, y - c, z - c),
        ],
        { colour }
      )
    );
  }

  if (direction === "Z-") {
    slopePolygons.push(polygons.back);
    slopePolygons.push(
      new Polygon(
        [
          new Point(x - c, y - c, z + c),
          new Point(x - c, y - c, z - c),
          new Point(x - c, y + c, z - c),
        ],
        { colour }
      ),
      new Polygon(
        [
          new Point(x + c, y - c, z + c),
          new Point(x + c, y - c, z - c),
          new Point(x + c, y + c, z - c),
        ],
        { colour }
      ),
      new Polygon(
        [
          new Point(x - c, y + c, z - c),
          new Point(x - c, y - c, z + c),
          new Point(x + c, y - c, z + c),
          new Point(x + c, y + c, z - c),
        ],
        { colour }
      )
    );
  }

  return { polygons, slopePolygons };
};
