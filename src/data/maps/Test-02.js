import { computeMap } from "../../logic/compute-map.logic";

import { Ledge } from "../../models/Ledge.model";

export const Test_02 = computeMap([
  [0, 0, -1, "brown", Ledge],
  [0, 0, 2, "green"],
  [2, 0, 0, "green"],
  [0, 0, 0, "green"],
  [0, 0, -2, "green"],
  [-2, 0, 0, "green"],
]);
