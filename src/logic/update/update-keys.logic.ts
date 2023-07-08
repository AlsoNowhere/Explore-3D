import { updateShift } from "./keys/shift.logic";
import { updateControl } from "./keys/control.logic";
import { updateDirection } from "./keys/direction.logic";

export const updateKeys = (playerCanMove: boolean) => {
  updateShift();

  updateControl();

  updateDirection(playerCanMove);
};
