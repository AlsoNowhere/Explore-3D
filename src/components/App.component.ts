import { component, element } from "mint";

import { Header } from "./structure/Header.component";
import { Router } from "./common/Router.component";

import { appStore } from "../stores/app.store";

export const App = component("div", appStore, { class: "explore-3d-main" }, [
  element(Header, { "m-if": "showHeader" }),

  element("main", null, [element(Router, { "[routes]": "routes" })]),
]);
