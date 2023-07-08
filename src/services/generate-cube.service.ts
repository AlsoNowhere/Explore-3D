import { Point, Polygon } from "cinnamon";

import { cubeSize } from "../data/constants.data";

export const generateCube = (
  x: number,
  y: number,
  z: number,
  colour: string,
  size = cubeSize / 2
) => {
  const floor = new Polygon(
    [
      new Point(x - size, y - size, z - size),
      new Point(x + size, y - size, z - size),
      new Point(x + size, y - size, z + size),
      new Point(x - size, y - size, z + size),
    ],
    { colour, attributes: { "data-id": `floor;Y-;${x};${y};${z}` } }
  );

  const roof = new Polygon(
    [
      new Point(x - size, y + size, z - size),
      new Point(x + size, y + size, z - size),
      new Point(x + size, y + size, z + size),
      new Point(x - size, y + size, z + size),
    ],
    { colour, attributes: { "data-id": `roof;Y;${x};${y};${z}` } }
  );

  // Left
  const left = new Polygon(
    [
      new Point(x - size, y - size, z - size),
      new Point(x - size, y + size, z - size),
      new Point(x - size, y + size, z + size),
      new Point(x - size, y - size, z + size),
    ],
    { colour, attributes: { "data-id": `left;X;${x};${y};${z}` } }
  );

  // Right
  const right = new Polygon(
    [
      new Point(x + size, y - size, z - size),
      new Point(x + size, y + size, z - size),
      new Point(x + size, y + size, z + size),
      new Point(x + size, y - size, z + size),
    ],
    { colour, attributes: { "data-id": `right;X-;${x};${y};${z}` } }
  );
  // Back
  const back = new Polygon(
    [
      new Point(x - size, y - size, z - size),
      new Point(x - size, y + size, z - size),
      new Point(x + size, y + size, z - size),
      new Point(x + size, y - size, z - size),
    ],
    { colour, attributes: { "data-id": `back;Z-;${x};${y};${z}` } }
  );

  // Front
  const front = new Polygon(
    [
      new Point(x - size, y - size, z + size),
      new Point(x - size, y + size, z + size),
      new Point(x + size, y + size, z + size),
      new Point(x + size, y - size, z + size),
    ],
    { colour, attributes: { "data-id": `front;Z;${x};${y};${z}` } }
  );

  return { floor, roof, left, right, back, front };
};
