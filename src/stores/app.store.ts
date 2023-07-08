import { IStore, Resolver, Store, element, refresh } from "mint";

import { path, wait } from "sage";

import { game } from "../game/game";

import { WelcomePage } from "../components/pages/WelcomePage.component";
import { MenuPage } from "../components/pages/MenuPage.component";
import { GamePage } from "../components/pages/GamePage.component";
import { MapDevelopPage } from "../components/pages/MapDevelopmentPage.component";
import { replaceCondition } from "../components/common/Router.component";

import { loadData } from "../services/load.service";

import { Route } from "../models/Route.model";

import { ISaveData } from "../interfaces/ISaveData.interface";

import { defaultData } from "../data/constants.data";

const noHeaderPages = ["welcome", "menu"];

export const appStore = new Store({
  rootData: defaultData,
  fade: "",

  routes: [
    new Route("welcome", element(WelcomePage)),
    new Route("menu", element(MenuPage)),
    new Route("game/{id}", element(GamePage)),
    new Route("develop/{id}", element(MapDevelopPage)),
  ],

  showHeader: new Resolver(() => {
    const urls = path.get();
    const [url] = urls;
    return urls.length !== 0 && !noHeaderPages.includes(url);
  }),

  async oninit() {
    const data = loadData();
    game.completedLevels = data.levels;
    appStore.rootData = data;
    replaceCondition.currentUrl = path.url;
    if (path.url !== "") return;
    path.set(["welcome"]);
    await wait();
    refresh(appStore);
  },
}) as IStore & {
  rootData: ISaveData;
  fade: "fade-out" | "fade-in" | "";
  routes: Array<Route>;
  showHeader: boolean;
  oninit: () => void;
};
