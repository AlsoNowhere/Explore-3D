import { Point, Polygon } from "cinnamon";

export const generateRectangle = (
  x: number,
  y: number,
  z: number,
  colour: string,
  size: Point
) => {
  const { x: widthX, y: height, z: widthZ } = size;

  const wX = widthX / 2;
  const h = height / 2;
  const wZ = widthZ / 2;

  const floor = new Polygon(
    [
      new Point(x - wX, y - h, z - wZ),
      new Point(x + wX, y - h, z - wZ),
      new Point(x + wX, y - h, z + wZ),
      new Point(x - wX, y - h, z + wZ),
    ],
    { colour }
  );

  const roof = new Polygon(
    [
      new Point(x - wX, y + h, z - wZ),
      new Point(x + wX, y + h, z - wZ),
      new Point(x + wX, y + h, z + wZ),
      new Point(x - wX, y + h, z + wZ),
    ],
    { colour }
  );

  const left = new Polygon(
    [
      new Point(x - wX, y - h, z - wZ),
      new Point(x - wX, y + h, z - wZ),
      new Point(x - wX, y + h, z + wZ),
      new Point(x - wX, y - h, z + wZ),
    ],
    { colour }
  );

  const right = new Polygon(
    [
      new Point(x + wX, y - h, z - wZ),
      new Point(x + wX, y + h, z - wZ),
      new Point(x + wX, y + h, z + wZ),
      new Point(x + wX, y - h, z + wZ),
    ],
    { colour }
  );

  const back = new Polygon(
    [
      new Point(x - wX, y - h, z - wZ),
      new Point(x - wX, y + h, z - wZ),
      new Point(x + wX, y + h, z - wZ),
      new Point(x + wX, y - h, z - wZ),
    ],
    { colour }
  );

  const front = new Polygon(
    [
      new Point(x - wX, y - h, z + wZ),
      new Point(x - wX, y + h, z + wZ),
      new Point(x + wX, y + h, z + wZ),
      new Point(x + wX, y - h, z + wZ),
    ],
    { colour }
  );

  return {
    floor,
    roof,
    left,
    right,
    back,
    front,
  };
};
