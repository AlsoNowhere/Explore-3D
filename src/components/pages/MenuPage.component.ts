import { MintComponent, component, element, getter, refresh } from "mint";

import { path, wait } from "sage";

import { Button } from "thyme";

import { game } from "../../game/game";

import { saveData } from "../../services/save.service";

import { appStore } from "../../stores/app.store";
import { gameStore } from "../../stores/game.store";

import { levels } from "../../data/levels.data";
import { time } from "../../data/constants.data";

class MenuPageComponent extends MintComponent {
  levels: Array<any>;

  startGame: () => void;
  resetGames: () => void;
  develop: () => void;

  constructor() {
    super();

    this.levels = levels;

    getter(this, "fade", () => appStore.fade);

    getter(this, "startLabel", function () {
      const [level1] = levels;
      return level1.complete ? "Continue" : "Start";
    });

    getter(this, "completeIcon", function () {
      const complete = appStore.rootData.levels.includes(this.name);
      return complete ? "check" : "";
    });

    getter(this, "isComplete", function () {
      const complete = appStore.rootData.levels.includes(this.name);
      return complete ? "complete" : "";
    });

    this.oninit = function () {
      appStore.rootData.levels.forEach((x) => {
        const level = levels.find((y) => y.name === x);
        if (level === undefined) return;
        level.complete = true;
      });
    };

    this.startGame = async function () {
      const [nextLevel] = levels.filter((x) => !x.complete);
      const level = levels.find(({ name }) => name === this.name) || nextLevel;
      if (level === undefined) return;
      const { url } = level;
      gameStore.gameOver = false;
      appStore.fade = "fade-out";
      refresh(appStore);
      await wait(time);
      appStore.fade = "fade-in";
      path.set(["game", url]);
      refresh(appStore);
    };

    this.resetGames = function () {
      levels.forEach((x) => (x.complete = false));
      game.completedLevels.length = 0;
      appStore.rootData.levels = game.completedLevels;
      saveData();
      refresh(appStore);
    };

    this.develop = function () {
      path.set(["develop", "10"]);
      refresh(appStore);
    };
  }
}

export const MenuPage = component(
  "section",
  MenuPageComponent,
  { class: "section__page {fade}" },
  [
    element("div", { class: "menu-page" }, [
      element("h1", { class: "menu-page__title" }, "Menu"),
      element("div", { class: "menu-page__buttons margin-bottom-large" }, [
        element(Button, {
          "[startLabel]": "startLabel",
          label: "{startLabel}",
          class: "large margin-right",
          "[onClick]": "startGame",
        }),

        element(Button, {
          icon: "trash",
          label: "Reset",
          class: "large margin-right",
          "[onClick]": "resetGames",
        }),

        element(Button, {
          icon: "ccog",
          label: "Develop",
          class: "large black",
          "[onClick]": "develop",
        }),
      ]),

      element(
        "div",
        { class: "menu-page__levels margin-bottom-large" },
        element(
          "ul",
          { class: "menu-page__levels-list" },
          element(
            "li",
            {
              "m-for": "levels",
              "m-key": "name",
              class: "menu-page__levels-level",
            },
            element(Button, {
              "[isComplete]": "isComplete",
              "[url]": "url",
              "[name]": "name",
              "[label]": "label",
              "[icon]": "completeIcon",
              class: "large {isComplete}",
              "[map]": "map",
              "[onClick]": "startGame",
            })
          )
        )
      ),
    ]),
  ]
);
