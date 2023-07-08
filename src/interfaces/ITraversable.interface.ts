import { IRoof } from "./IRoof.interface";

import { TEvent } from "../types/TEvent.type";

export interface ITraversable {
  roof: IRoof;
  canTraverse: boolean;
  climbable: boolean;
  onOver?: TEvent;
}
