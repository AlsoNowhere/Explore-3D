import { refresh } from "mint";

import { Cinnamon, Point, Direction } from "cinnamon";

import { wait } from "sage";

import { getPlayerPosition } from "../services/get-player-position.service";

import { addGameEvents } from "../logic/add-game-events.logic";
import { updateUI } from "../logic/update/updateUI.logic";
import { render } from "../logic/render.logic";
import { refreshCinnamon } from "../logic/refresh-cinnamon.logic";

import { gameStore } from "../stores/game.store";

import { Cube } from "../models/Cube.model";
import { Slope } from "../models/Slope.model";
import { Level } from "../models/Level.model";

import { IRoof } from "../interfaces/IRoof.interface";

import {
  playerColour,
  pace,
  defaultDirection,
  defaultViewDistance,
} from "../data/constants.data";
import { IItem } from "../interfaces/IItem.interface";
import { ITraversable } from "../interfaces/ITraversable.interface";

export const defaultValues = (game: Game) => {
  game.direction = new Direction(...defaultDirection);
  game.viewDistance = defaultViewDistance;
  game.playerPosition = getPlayerPosition(
    new Point(0, 0, 0, { colour: playerColour })
  );
};

class Game {
  once: boolean;
  element: SVGElement | null;
  cinnamon: Cinnamon | null;
  direction: Direction;
  viewDistance: number;
  playerPosition: Point;
  itemAbove: IRoof | null;
  itemIn: IItem | null;
  pressed: {
    shift: boolean;
    control: boolean;
    left: boolean;
    up: boolean;
    right: boolean;
    down: boolean;
  };
  on: boolean;
  map: Array<IItem> | null;
  roofs: Array<IRoof> | null;
  recyclers: Record<string, () => void>;
  completedLevels: Array<string>;
  disabled: boolean;

  init: (element: SVGElement, map: Level) => void;
  render: () => void;
  recycle: () => void;
  start: () => void;
  cease: () => void;
  stop: () => void;
  reset: (element: SVGElement, map: Level) => void;

  constructor() {
    this.once = false;
    this.element = null;
    this.cinnamon = null;
    defaultValues(this);
    this.itemAbove = null;
    this.itemIn = null;
    this.pressed = {
      shift: false,
      control: false,
      left: false,
      up: false,
      right: false,
      down: false,
    };
    this.on = false;
    this.map = null;
    this.roofs = null;
    this.recyclers = {};
    this.completedLevels = [];
    this.disabled = false;

    this.init = function (element: SVGElement, map: Level) {
      if (!this.once) {
        this.once = true;
        addGameEvents();
      }
      const _this = this as Game;
      _this.reset(element, map);
      _this.render();
    };

    this.render = function () {
      render(this.cinnamon, this.map);
    };

    this.recycle = async function () {
      const _this = this as Game;

      // console.log("3D cycle");

      if (!_this.on) return;
      if (_this.cinnamon === null || _this.map === null) return;

      // Update ui items such as player position, view direction and zoom amount.
      updateUI();

      // Update the Cinnamon object with the latest data from the player move.
      refreshCinnamon(_this.cinnamon);

      // Render/Refresh cinnamon to show the latest.
      _this.render();

      // After waiting update the view again.
      await wait(pace);
      _this.recycle();
    };

    this.start = function () {
      this.on = true;
      this.recycle();
    };

    this.cease = function () {
      if (!this.on) return;
      this.on = false;

      console.log("DEV --- CEASE");
    };

    this.stop = function () {
      if (!this.on) return;
      this.on = false;

      console.log("DEV --- STOPPED");

      gameStore.gameOver = true;
      refresh(gameStore);
    };

    this.reset = function (element: SVGElement, level: Level) {
      const _this = this as Game;
      _this.element = element;
      _this.cinnamon = new Cinnamon(_this.element);
      level.map.forEach((x) => {
        x.reset?.();
      });
      _this.map = level.map;
      _this.roofs = level.map
        .filter((x) => {
          (x as ITraversable).roof;
          return !!(x as ITraversable).roof;
        })
        .map((x) => (x as ITraversable).roof);
      defaultValues(_this);
      _this.itemAbove = null;
      _this.playerPosition = getPlayerPosition(level.playerPosition);
      _this.direction = level.direction.clone({});
      _this.viewDistance = level.viewDistance;
    };
  }

  get playerCanMove() {
    return this.itemAbove !== null && this.disabled === false;
  }
}

export const game = new Game();
