import { IStore, Store } from "mint";

import { Cinnamon, Direction, Point, RADIANS } from "cinnamon";

import { Level } from "../models/Level.model";
import { render } from "../logic/render.logic";

const refreshCinnamonLocal = (
  cinnamon: Cinnamon,
  playerPosition: Point,
  direction: Direction,
  viewDistance: number
) => {
  const { x, y, z } = playerPosition;

  const zxDistance = Math.cos(direction.y / RADIANS) * viewDistance;

  cinnamon.direction = direction;

  cinnamon.centre = new Point(
    Math.sin(direction.zx / RADIANS) * -zxDistance + x,
    Math.sin(direction.y / RADIANS) * viewDistance + y,
    Math.cos(direction.zx / RADIANS) * -zxDistance + z
  );
};

export const mapDevelopStore = new Store({
  cinnamon: null,
  once: false,
  level: null,

  refresh() {
    refreshCinnamonLocal(
      this.cinnamon,
      this.level.playerPosition,
      this.level.direction,
      this.level.viewDistance
    );

    render(this.cinnamon, this.level.map);
  },
}) as IStore & {
  cinnamon: Cinnamon;
  once: boolean;
  level: Level | null;

  refresh: () => void;
};
