import { MintElement } from "mint";

export class Route {
  url: string;
  component: MintElement;

  constructor(url: string, component: MintElement) {
    this.url = url;
    this.component = component;
  }
}
