import { Point } from "cinnamon";

import { cubeSize } from "../data/constants.data";

export const getPlayerPosition = (position: Point) => {
  return position.clone({ y: position.y + cubeSize * 0.5 });
};
