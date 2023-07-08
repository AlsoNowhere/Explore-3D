import { Polygon } from "cinnamon";

import { Player } from "../../models/Player.model";
import { Cube } from "../../models/Cube.model";

import { IItemDistance } from "../../interfaces/IItem.interface";

import { cubeSize } from "../../data/constants.data";

export const shaveTouching = (
  item: Player | IItemDistance,
  items: Array<IItemDistance | Player>,
  polygons: Array<Polygon>
) => {
  //   const { x, y, z } = item.position;

  const filtered = items.filter(
    (y) => !(y instanceof Player) && y !== item
  ) as Array<IItemDistance>;

  //   const shave = (type: "x" | "y" | "z", invert: 1 | -1) => {
  //     const touchingItem = filtered.find(
  //       ({ position }) =>
  //         position.x === x + (type === "x" ? cubeSize * invert * -1 : 0) &&
  //         position.y === y + (type === "y" ? cubeSize * invert * -1 : 0) &&
  //         position.z === z + (type === "z" ? cubeSize * invert * -1 : 0)
  //     );
  //     if (!!touchingItem) {
  //       if (touchingItem?.from instanceof Cube) {
  //         const i = polygons.findIndex(
  //           ({ centre }) => centre[type] * invert < item.position[type]
  //         );
  //         i !== -1 && polygons.splice(i, 1);
  //       }
  //     }
  //   };

  //   shave("x", 1);
  //   shave("x", -1);

  //   shave("y", 1);
  //   shave("y", -1);

  //   shave("z", 1);
  //   shave("z", -1);

  const shave = (
    [x, y, z]: [number, number, number],
    type: "x" | "y" | "z",
    inverse: boolean
  ) => {
    const touching = filtered.find(
      ({ position }) =>
        position.x === item.position.x + x * cubeSize &&
        position.y === item.position.y + y * cubeSize &&
        position.z === item.position.z + z * cubeSize
    );
    if (!!touching) {
      if (touching?.from instanceof Cube) {
        const i = polygons.findIndex((y) =>
          inverse
            ? y.centre[type] < item.position[type]
            : y.centre[type] > item.position[type]
        );
        i !== -1 && polygons.splice(i, 1);
      }
    }
  };

  shave([-1, 0, 0], "x", true);
  shave([1, 0, 0], "x", false);

  shave([0, -1, 0], "y", true);
  shave([0, 1, 0], "y", false);

  shave([0, 0, -1], "z", true);
  shave([0, 0, 1], "z", false);

  //   const hasY_ = filtered.find(
  //     (y) =>
  //       y.position.x === item.position.x &&
  //       y.position.z === item.position.z &&
  //       y.position.y === item.position.y - cubeSize
  //   );
  //   if (!!hasY_) {
  //     if (hasY_?.from instanceof Cube) {
  //       const i = polygons.findIndex((y) => y.centre.y < item.position.y);
  //       i !== -1 && polygons.splice(i, 1);
  //     }
  //   }

  //   const hasY = filtered.find(
  //     (y) =>
  //       y.position.x === item.position.x &&
  //       y.position.z === item.position.z &&
  //       y.position.y === item.position.y + cubeSize
  //   );
  //   if (!!hasY) {
  //     if (hasY?.from instanceof Cube) {
  //       const i = polygons.findIndex((y) => y.centre.y > item.position.y);
  //       i !== -1 && polygons.splice(i, 1);
  //     }
  //   }

  //   const hasZ_ = filtered.find(
  //     (y) =>
  //       y.position.x === item.position.x &&
  //       y.position.z === item.position.z - cubeSize &&
  //       y.position.y === item.position.y
  //   );
  //   if (!!hasZ_) {
  //     if (hasZ_?.from instanceof Cube) {
  //       const i = polygons.findIndex((y) => y.centre.z < item.position.z);
  //       i !== -1 && polygons.splice(i, 1);
  //     }
  //   }

  //   const hasZ = filtered.find(
  //     (y) =>
  //       y.position.x === item.position.x &&
  //       y.position.z === item.position.z + cubeSize &&
  //       y.position.y === item.position.y
  //   );
  //   if (!!hasZ) {
  //     if (hasZ?.from instanceof Cube) {
  //       const i = polygons.findIndex((y) => y.centre.z > item.position.z);
  //       i !== -1 && polygons.splice(i, 1);
  //     }
  //   }

  //   const hasX_ = filtered.find(
  //     (y) =>
  //       y.position.x === item.position.x - cubeSize &&
  //       y.position.z === item.position.z &&
  //       y.position.y === item.position.y
  //   );
  //   if (!!hasX_) {
  //     if (hasX_?.from instanceof Cube) {
  //       const i = polygons.findIndex((y) => y.centre.x < item.position.x);
  //       i !== -1 && polygons.splice(i, 1);
  //     }
  //   }

  //   const hasX = filtered.find(
  //     (y) =>
  //       y.position.x === item.position.x + cubeSize &&
  //       y.position.z === item.position.z &&
  //       y.position.y === item.position.y
  //   );
  //   if (!!hasX) {
  //     if (hasX?.from instanceof Cube) {
  //       const i = polygons.findIndex((y) => y.centre.x > item.position.x);
  //       i !== -1 && polygons.splice(i, 1);
  //     }
  //   }
};
