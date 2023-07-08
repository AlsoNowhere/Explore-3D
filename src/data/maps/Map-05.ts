import { computeMap } from "../../logic/compute-map.logic";

import { Cube } from "../../models/Cube.model";
import { Hinge, Ledge } from "../../models/Ledge.model";

import { green, pink, yellow, blue } from "../colours.data";

const flipHinge = new Hinge("X", "down", 6000);

export const Map_05 = (onComplete: (name: string) => void) => {
  const map: Array<[number, number, number, string?, any?, {}?]> = [
    [5, 0, 0, yellow, Cube, { onOver: () => onComplete("05") }],

    [4, 0, 0],
    [3, 0, 0, blue, Ledge, { hinge: flipHinge }],
    [2, 0, 0],
    [
      1,
      0,
      0,
      blue,
      Cube,
      (() => {
        let triggered = false;
        return {
          onOver() {
            if (triggered) return;
            flipHinge.ledge?.changeColour(pink);
            this.changeColour(green);
            flipHinge.changeState("up");
            triggered = true;
          },
          reset() {
            flipHinge.ledge?.changeColour(blue);
            this.changeColour(blue);
            flipHinge.currentMovement = null;
            flipHinge.state = "down";
            triggered = false;
          },
        };
      })(),
    ],
    [0, 0, 0],
  ];
  return computeMap(map, green);
};
