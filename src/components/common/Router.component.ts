import { MintComponent, component, element, getter, template } from "mint";

import { path } from "sage";

import { Route } from "../../models/Route.model";

const itemMatch = (a: string, b: string) => {
  const [start, end] = [b.charAt(0), b.charAt(b.length - 1)];
  if (start === "{" && end === "}") return true;
  return a === b;
};

const matches = (url: string, target: string) => {
  const urls = url.split("/");
  const targets = target.split("/");
  const match1 = urls.length === targets.length;
  if (!match1) return match1;
  const match2 = urls.reduce(
    (a, b, i) => (!a ? a : itemMatch(b, targets[i])),
    true
  );
  return match2;
};

export const replaceCondition = (() => {
  const output = () => {
    const url = path.url;
    const different = output.currentUrl !== url;
    if (different) {
      output.currentUrl = url;
    }
    return different;
  };
  output.currentUrl = "";
  return output;
})();

class RouterComponent extends MintComponent {
  routes: Array<Route>;

  constructor() {
    super();

    this.routes = [];

    getter(this, "resolveRoutes", function () {
      const _this = this as RouterComponent;
      const routes = _this.routes.filter(({ url }) => matches(path.url, url));
      return routes;
    });
  }
}

export const Router = component(
  "div",
  RouterComponent,
  null,
  element(
    "div",
    {
      "m-for": "resolveRoutes",
      "m-key": "url",
      "[data-id]": "url",
    },
    template("component", { replaceCondition })
  )
);
