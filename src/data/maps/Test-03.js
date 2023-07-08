import { computeMap } from "../../logic/compute-map.logic";

import { Cube } from "../../models/Cube.model";
import { Slope } from "../../models/Slope.model";
import { Hinge, Ledge } from "../../models/Ledge.model";

const flipHinge = new Hinge("Z", "down");

const standard = [Cube, { canTraverse: false }];

export const Test_03 = computeMap([
  // Floor -1
  [3, -1, 2, "#894e31", ...standard],
  [3, -1, 1, "#894e31", ...standard],
  [3, -1, 0, "#894e31", ...standard],
  [2, -1, 2, "#894e31", ...standard],
  [2, -1, 1, "#894e31"],
  [2, -1, 0, "#894e31", ...standard],
  [1, -1, 2, "#894e31"],
  [1, -1, 1, "#894e31"],
  [1, -1, 0, "#894e31", ...standard],
  [0, -1, 2, "#894e31", ...standard],
  [0, -1, 1, "#894e31"],
  [0, -1, 0, "#894e31", ...standard],

  // Floor 0
  [3, 0, 2, "green"],
  [3, 0, 1, "green"],
  [
    3,
    0,
    0,
    "pink",
    Cube,
    {
      onOver: (() => {
        let triggered = false;
        return function () {
          if (triggered) return;
          this.changeColour("green");
          flipHinge.changeState("up");
          triggered = true;
        };
      })(),
    },
  ],
  [2, 0, 2, "orange", Slope, { direction: "X" }],
  [2, 0, 0, "green"],
  [1, 0, 0, "green"],
  [0, 0, 2, "green"],
  // [0, 0, 1, "#c9ae92", Ledge, { hinge: new Hinge("Z", "down") }],
  // [0, 0, 1, "rgba(0,0,0,0.2)", Ledge, { hinge: new Hinge("Z", "down") }],
  [0, 0, 1, "lightgreen", Ledge, { hinge: flipHinge }],
  [0, 0, 0, "green"],
]);
