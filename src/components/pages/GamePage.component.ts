import { MintComponent, component, element, getter, refresh } from "mint";

import { path, wait } from "sage";

import { Button } from "thyme";

import { Cinnamon } from "cinnamon";

import { game } from "../../game/game";

import { updateUI } from "../../logic/update/updateUI.logic";
import { refreshCinnamon } from "../../logic/refresh-cinnamon.logic";

import { appStore } from "../../stores/app.store";
import { gameStore } from "../../stores/game.store";

import { levels } from "../../data/levels.data";
import { playerMovement } from "../../data/constants.data";

class GamePageComponent extends MintComponent {
  svgElementRef: SVGElement | null;

  returnToMenu: () => void;

  constructor() {
    super();

    gameStore.connect(this);

    this.svgElementRef = null;

    getter(this, "fade", () => appStore.fade);

    this.oninit = async function () {
      await wait();

      const urlMap = path.get()[1];
      const level = levels.find((x) => x.url === urlMap);

      if (level === undefined) {
        path.set(["menu"]);
        refresh(appStore);
        return;
      }

      game.init(this.svgElementRef, level);

      /// DEV
      // updateUI();
      // refreshCinnamon(game.cinnamon as Cinnamon);
      // game.render();

      game.start();
    };

    this.returnToMenu = function () {
      path.set(["menu"]);
      refresh(appStore);
    };
  }
}

export const GamePage = component(
  "section",
  GamePageComponent,
  { class: "game-page {fade}" },
  [
    element("svg", {
      id: "svg-element",
      class: "width-full height-full",
      "m-ref": "svgElementRef",
    }),

    element(
      "div",
      {
        "m-if": "gameOver",
        class: "banner",
      },
      element("div", { class: "banner__content" }, [
        element("div", { class: "banner__container" }, [
          element("span", null, "Level complete"),
          element(Button, {
            label: "Back to menu",
            class: "orange",
            "[onClick]": "returnToMenu",
          }),
        ]),
      ])
    ),
  ]
);
