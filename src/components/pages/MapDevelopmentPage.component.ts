import { MintComponent, MintEvent, component, element } from "mint";

import { Cinnamon, Direction, Point } from "cinnamon";

import { path, wait } from "sage";

import { computeMap } from "../../logic/compute-map.logic";
import { addDevelopEvents } from "../../logic/add-develop-events.logic";

import { mapDevelopStore } from "../../stores/map-develop.store";

import { Level } from "../../models/Level.model";

import { levels } from "../../data/levels.data";
import { grey } from "../../data/colours.data";
import { cubeSize } from "../../data/constants.data";

const defaultDevelop = () => ({
  map: computeMap([[0, 0, 0]], grey),
  //   map: computeMap([...generateGrid(new Point(-3, 0, -3), 7)], grey),

  playerPosition: new Point(0, 0, 0),
  direction: new Direction(45, 30),
  viewDistance: 50,
});

const newPointMap: Map<
  string,
  (x: [number, number, number]) => [number, number, number]
> = new Map();
newPointMap.set("floor", ([x, y, z]) => [x, y - 1, z]);
newPointMap.set("roof", ([x, y, z]) => [x, y + 1, z]);

newPointMap.set("left", ([x, y, z]) => [x - 1, y, z]);
newPointMap.set("right", ([x, y, z]) => [x + 1, y, z]);

newPointMap.set("back", ([x, y, z]) => [x, y, z - 1]);
newPointMap.set("front", ([x, y, z]) => [x, y, z + 1]);

class MapDevelopPageComponent extends MintComponent {
  svgElementDevelopmentRef: SVGElement | null;
  once: boolean;
  level: Level;

  refresh: () => void;
  selectSVGLayer: MintEvent;
  removeSVGLayer: MintEvent;

  constructor() {
    super();

    mapDevelopStore.connect(this);

    this.svgElementDevelopmentRef = null;

    this.once = false;

    this.oninit = async function () {
      await wait();
      if (!this.once) {
        addDevelopEvents();
        this.once = true;
      }
      mapDevelopStore.cinnamon = new Cinnamon(this.svgElementDevelopmentRef);

      const level = (() => {
        const urls = path.get();
        const target = urls[1];
        if (target === undefined) return defaultDevelop();
        const level = levels.find((x) => x.name === target);
        return level || defaultDevelop();
      })();

      this.level = level;

      this.refresh();
    };

    this.selectSVGLayer = function (event) {
      const { target } = event;
      if (!(target instanceof SVGPolygonElement)) return;
      const dataId = target.getAttribute("data-id");
      if (dataId === null) return;
      const [direction] = dataId.split(";");
      const point = dataId.split(";").slice(2);
      if (point === undefined) return;
      const [x, y, z] = point.map((x) => Number(x) / cubeSize);
      const newPoint = newPointMap.get(direction)?.([x, y, z]);
      if (newPoint === undefined) return;

      this.level.map.push(...computeMap([newPoint]));

      this.refresh();
    };

    this.removeSVGLayer = function (event) {
      event.preventDefault();
      const { target } = event;
      if (!(target instanceof SVGPolygonElement)) return;
      const dataId = target.getAttribute("data-id");
    };
  }
}

export const MapDevelopPage = component(
  "section",
  MapDevelopPageComponent,
  {},
  [
    element("svg", {
      id: "svg-element-development",
      class: "width-full height-full",
      "m-ref": "svgElementDevelopmentRef",
      "(click)": "selectSVGLayer",
      "(contextmenu)": "removeSVGLayer",
    }),
  ]
);
