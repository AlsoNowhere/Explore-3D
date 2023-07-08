import { getDistance3D, Point, Polygon } from "cinnamon";

import { game } from "../../game/game";

import { shaveTouching } from "./shave-touching.logic";

import { Cube } from "../../models/Cube.model";
import { Player } from "../../models/Player.model";

import { IItem, IItemDistance } from "../../interfaces/IItem.interface";

import { showTexts } from "../../data/development.data";

type TOutput = Array<IItemDistance | Player>;

export const setPolygonsOrder = (
  map: Array<IItem>,
  player: Player,
  cinnamonCentre: Point
) => {
  const _items = map
    .map(
      (x) =>
        ({
          ...x,
          distance: getDistance3D(x.position, cinnamonCentre),
          from: x,
        } as IItemDistance)
    )
    .sort((a, b) => b.distance - a.distance);

  const items: TOutput = (() => {
    const output: TOutput = [..._items];
    if (game.itemAbove === null) {
      output.push(player);
      return output;
    }

    const { below, above } = _items.reduce(
      (a, b) => {
        const type = b.position.y <= player.position.y ? "below" : "above";
        const target = a[type];
        target.push(b);
        return a;
      },
      { below: [] as Array<IItemDistance>, above: [] as Array<IItemDistance> }
    );

    return game.itemAbove.item.itemOrder?.(below, above, player);
  })();

  const itemsForPolygons = items.map((x) => {
    if (x instanceof Player || !(x.from instanceof Cube)) return x;

    let polygons = [...x.polygons];

    polygons = polygons
      .sort(
        (a, b) =>
          getDistance3D(cinnamonCentre, a.centre) -
          getDistance3D(cinnamonCentre, b.centre)
      )
      .slice(0, 3);

    shaveTouching(x, items, polygons);

    return {
      ...x,
      polygons,
    };
  });

  const polygons = itemsForPolygons
    // Hide the player cube
    // DEV
    // .filter((x) => !(x instanceof Player))
    .reduce((a, b) => (a.push(...b.polygons), a), [] as Array<Polygon>);

  const output: {
    polygons: Array<Polygon>;
    texts: Array<{ point: Point; distance: number }>;
  } = {
    polygons,
    texts: [],
  };

  if (showTexts) {
    const texts = items.map(({ position }) => ({
      point: position,
      distance: getDistance3D(position, cinnamonCentre),
    }));

    output.texts = texts;
  }

  return output;
};
