import { Point, Polygon } from "cinnamon";

export class Player {
  id: string;
  position: Point;
  polygons: Array<Polygon>;
  // colour: string;

  constructor(
    id: string,
    position: Point,
    polygons: Array<Polygon>
    // colour: string
  ) {
    this.id = id;
    this.position = position;
    this.polygons = polygons;
    // this.colour = colour;
  }
}
