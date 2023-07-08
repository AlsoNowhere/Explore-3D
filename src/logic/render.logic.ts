import { Cinnamon, Point } from "cinnamon";

import { game } from "../game/game";

import { setAttributes } from "../services/set-attributes.service";
import { generateStyles } from "../services/generate-styles.service";

import { setPolygonsOrder } from "./render/set-polygons-order.logic";
import { renderPlayer } from "./render/player.logic";
import { renderLines } from "./render/lines.logic";

import { IItem } from "../interfaces/IItem.interface";

import { itemOpacity, playerDot } from "../data/constants.data";
import { showTexts } from "../data/development.data";

const clearSVG = (target: SVGElement) => {
  Array.from(target.children).forEach((x) => target.removeChild(x));
};

export const render = (cinnamon: Cinnamon, map: Array<IItem>) => {
  const player = renderPlayer();
  const polygonsOrder = setPolygonsOrder(map, player, cinnamon.centre);
  const { polygons } = polygonsOrder;
  cinnamon.polygons = polygons;
  const { polygons: cinnPolygons } = cinnamon.resolver();
  const cPoints = (() => {
    const colour = playerDot;
    const points = [game.playerPosition.clone({ options: { colour } })];
    return { points };
  })();
  const { points: cinnPoints } = cinnamon.resolver(cPoints);

  // Clear SVG
  clearSVG(cinnamon.target);

  // Add polygons
  cinnPolygons.forEach((polygon) => {
    const { colour, id } = polygon.polygon;

    const polygonSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    const points = polygon.points
      .map(({ width, height }) => `${width},${height}`)
      .join(" ");
    setAttributes(polygonSVG, {
      points,
      style: generateStyles({ fill: colour, opacity: itemOpacity }),
      id,
      ...(polygon.polygon.attributes || {}),
    });
    cinnamon.target.appendChild(polygonSVG);

    if (!colour.includes("a")) {
      renderLines(polygon, cinnamon, colour, id);
    }
  });

  // Add points (player dot)
  cinnPoints.forEach((point) => {
    const pointSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    setAttributes(pointSVG, {
      cx: point.width,
      cy: point.height,
      r: 2,
      style: generateStyles({ fill: point.point.colour }),
    });
    cinnamon.target.appendChild(pointSVG);
  });

  // Show development texts
  if (showTexts && polygonsOrder.texts !== undefined) {
    const { texts } = polygonsOrder;
    const { points: cinnTexts } = cinnamon.resolver({
      points: texts.map(({ point }) => point),
    });

    // Shown the distance and point as text.
    texts.forEach((text, i) => {
      const cinnText = cinnTexts[i];
      const textSVG = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      setAttributes(textSVG, {
        x: cinnText.width,
        y: cinnText.height,
        style: generateStyles({ "font-size": "7px" }),
      });
      textSVG.innerHTML = `${i} | ${text.point.x},${text.point.y},${
        text.point.z
      } | ${text.distance.toFixed(3)}`;
      cinnamon.target.appendChild(textSVG);
    });
  }
};
