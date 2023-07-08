import { Hinge } from "../models/Ledge.model";

import { DirectionAngle } from "../enums/DirectionAngle.enum";

interface ILegde {
  direction: DirectionAngle;
  state: string;
  time: number;
  ledgeColours: string | [string, string];
}

export const getLedges = (
  ledges: Array<ILegde>,
  panelColours: string | [string, string]
) => {
  let startColourPanel: string;
  let endColourPanel: string;
  if (typeof panelColours === "string") {
    startColourPanel = panelColours;
    endColourPanel = panelColours;
  } else {
    [startColourPanel, endColourPanel] = panelColours;
  }

  const ledgeColours = ledges.map((x) => {
    let startColourLedge: string;
    let endColourLedge: string;
    if (typeof x.ledgeColours === "string") {
      startColourLedge = x.ledgeColours;
      endColourLedge = x.ledgeColours;
    } else {
      [startColourLedge, endColourLedge] = x.ledgeColours;
    }
    return { startColourLedge, endColourLedge };
  });

  const flipHinges = ledges.map((x) => new Hinge(x.direction, x.state, x.time));

  let triggered = false;
  const triggerOptions = {
    onOver() {
      if (triggered) return;
      flipHinges.forEach((x, i) => {
        x.ledge?.changeColour(ledgeColours[i].endColourLedge);
        x.changeState("up");
      });
      this.changeColour(endColourPanel);
      triggered = true;
    },
    reset() {
      this.changeColour(startColourPanel);
      flipHinges.forEach((x, i) => {
        x.ledge?.changeColour(ledgeColours[i].startColourLedge);
        x.currentMovement = null;
        x.state = "down";
      });
      triggered = false;
    },
  };

  return { flipHinges, triggerOptions };
};
