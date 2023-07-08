import { MintComponent, component, element, refresh } from "mint";

import { path, wait } from "sage";

import { Button } from "thyme";

import { appStore } from "../../stores/app.store";

class WelcomePageComponent extends MintComponent {
  goToMenu: () => void;

  constructor() {
    super();

    this.goToMenu = async () => {
      path.set(["menu"]);
      // await wait();
      refresh(appStore);
    };
  }
}

export const WelcomePage = component(
  "section",
  WelcomePageComponent,
  null,
  element("div", { class: "welcome-page" }, [
    element("h1", { class: "welcome-page--title" }, "Welcome to Explore 3D"),

    element(Button, {
      label: "Menu",
      class: "welcome-page--button large",
      "[onClick]": "goToMenu",
    }),
  ])
);
