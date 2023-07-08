import { Point2D, Polygon2D, isPointOnPolygon2D } from "cinnamon";

import { game } from "../game/game";

export const isOverItem = () => {
  const {
    playerPosition: { x, z },
    roofs,
  } = game;

  if (roofs === null) return;

  const point = new Point2D(x, z);
  const over = [];

  let i = 0;
  while (i < roofs.length) {
    const { polygon } = roofs[i];
    const _polygon = new Polygon2D(
      polygon.points.map(({ x, z }) => new Point2D(x, z))
    );
    if (isPointOnPolygon2D(point, _polygon)) {
      over.push(roofs[i]);
    }
    i++;
  }

  return over;
};
