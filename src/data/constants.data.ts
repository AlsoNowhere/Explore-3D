import { ISaveData } from "../interfaces/ISaveData.interface";
import { aqua, aqua_40 } from "./colours.data";

// export const pace = 1000 / 15;
export const pace = 1000 / 30;

export const time = 300;
// export const time = 3000;

export const cubeSize = 2;

export const itemOpacity = 1;
// export const itemOpacity = 0.6;
// export const itemOpacity = 0.2;

export const playerSize = 10;

export const playerMovement = 0.3;
// export const playerMovement = 0.5;

export const playerDot = "#ff002d";

export const playerColour = aqua;
export const playerColourFlash = aqua_40;
// export const playerColourFlash = "blue";
export const defaultDirection = [0, 30];
export const defaultViewDistance = 50;

export const localStorageKey = "explore-3D-v1-key";
export const defaultData: ISaveData = {
  levels: [],
};

export const minY = 2;
// export const minY = 0;
export const maxY = 89;
// export const zxAngleAttack = 10;
// export const yAngleAttack = 2;
export const zxAngleAttack = 15;
export const yAngleAttack = 7;

export const disabledTimeout = 1000;

export const fireCount = 25;
