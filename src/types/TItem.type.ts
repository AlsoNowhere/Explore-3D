import { IItem } from "../interfaces/IItem.interface";
import { IJeopardy } from "../interfaces/IJeopardy.interface";
import { ITraversable } from "../interfaces/ITraversable.interface";

export type TItem_All = IItem & (ITraversable | IJeopardy);
