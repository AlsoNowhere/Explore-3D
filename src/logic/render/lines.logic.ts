import { Cinnamon, Polygon, IResolvedPoint } from "cinnamon";

import { generateStyles } from "../../services/generate-styles.service";
import { setAttributes } from "../../services/set-attributes.service";
import { darken } from "../../services/darken.service";

import { itemOpacity } from "../../data/constants.data";

export const renderLines = (
  polygon: {
    points: Array<IResolvedPoint>;
    polygon: Polygon;
  },
  cinnamon: Cinnamon,
  colour: string,
  id?: string
) => {
  {
    const fourLines = polygon.points.reduce((a, b, i) => {
      if (i === 0) {
        a.push(b);
        return a;
      }
      if (
        b.width === polygon.points[i - 1].width &&
        b.height === polygon.points[i - 1].height
      )
        return a;
      a.push(b);
      return a;
    }, [] as Array<IResolvedPoint>);
    const lines = fourLines.reduce((a, b, i) => {
      if (i === 0) return a;
      a.push({
        x1: fourLines[i - 1].width,
        y1: fourLines[i - 1].height,
        x2: b.width,
        y2: b.height,
      });
      return a;
    }, [] as Array<{ x1: number; y1: number; x2: number; y2: number }>);

    if (lines.length === 0) {
      return;
    }

    const darkerColour = darken(colour, 0.05);

    lines.forEach((line) => {
      const lineSVG = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      const { x1, y1, x2, y2 } = line;
      setAttributes(lineSVG, {
        x1,
        y1,
        x2,
        y2,
        style: generateStyles({
          stroke: darkerColour,
          "stroke-width": "2px",
          opacity: itemOpacity,
        }),
        id,
      });
      cinnamon.target.appendChild(lineSVG);
    });
  }
};
