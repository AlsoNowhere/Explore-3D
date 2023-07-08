import { MintComponent, component, element, getter, refresh } from "mint";

import { path, wait } from "sage";

import { Button } from "thyme";

import { game } from "../../game/game";

import { appStore } from "../../stores/app.store";

import { time } from "../../data/constants.data";

class ButtonsComponenet extends MintComponent {
  start: () => void;
  cease: () => void;

  constructor() {
    super();

    this.start = () => game.start();
    this.cease = () => game.cease();
  }
}

const Buttons = component(
  "div",
  ButtonsComponenet,
  { class: "header__container" },
  [
    element(
      "button",
      {
        type: "button",
        class: "header__container-button apple",
        "(click)": "start",
      },
      "Go"
    ),
    element(
      "button",
      {
        type: "button",
        class: "header__container-button tomato",
        "(click)": "cease",
      },
      "Stop"
    ),
  ]
);

class HeaderComponent extends MintComponent {
  cease: () => void;
  returnToMenu: () => void;

  constructor() {
    super();

    getter(this, "fade", () => appStore.fade);

    this.cease = () => game.cease();

    this.returnToMenu = async function () {
      game.cease();
      appStore.fade = "fade-out";
      refresh(appStore);
      await wait(time);
      appStore.fade = "fade-in";
      path.set(["menu"]);
      refresh(appStore);
    };
  }
}

export const Header = component(
  "header",
  HeaderComponent,
  { class: "header {fade}" },
  [
    element("div", { class: "flex" }, [
      element("h1", { class: "header__title" }, "Explore 3D"),
      element(Button, {
        class: "margin-top",
        label: "Menu",
        "[onClick]": "returnToMenu",
      }),
    ]),

    // DEV
    element(Buttons),
  ]
);
