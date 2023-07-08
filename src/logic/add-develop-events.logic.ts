import { IStore } from "mint";

import { path } from "sage";

import { game } from "../game/game";
import { mapDevelopStore } from "../stores/map-develop.store";

const keys = [
  // "z", "x",
  "Shift",
  "Control",
  "ArrowLeft",
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
];

const moveAmount = 15;

export const addDevelopEvents = () => {
  const { pressed } = game;

  //   document.body.addEventListener("keydown", (event) => {
  //     if (path.get()[0] !== "develop") return;
  //     const { key } = event;

  //     if (!keys.includes(key)) return;

  //     if (key === "Shift") {
  //       pressed.shift = true;
  //     }

  //     if (key === "Control") {
  //       pressed.control = true;
  //     }

  //     if (key === "ArrowLeft") {
  //       pressed.left = true;
  //     }

  //     if (key === "ArrowUp") {
  //       pressed.up = true;
  //     }
  //     if (key === "ArrowRight") {
  //       pressed.right = true;
  //     }

  //     if (key === "ArrowDown") {
  //       pressed.down = true;
  //     }
  //   });

  document.body.addEventListener("keyup", (event) => {
    if (path.get()[0] !== "develop") return;
    const { key } = event;

    if (!keys.includes(key)) return;

    // if (key === "Shift") {
    //   pressed.shift = false;
    // }

    // if (key === "Control") {
    //   pressed.control = false;
    // }

    if (key === "ArrowLeft") {
      //   pressed.left = false;
      if (mapDevelopStore.level === null) return;
      mapDevelopStore.level.direction.zx += moveAmount;
      mapDevelopStore.refresh();
    }

    if (key === "ArrowUp") {
      //   pressed.up = false;
      if (mapDevelopStore.level === null) return;
      mapDevelopStore.level.direction.y -= moveAmount;
      mapDevelopStore.refresh();
    }
    if (key === "ArrowRight") {
      //   pressed.right = false;
      if (mapDevelopStore.level === null) return;
      mapDevelopStore.level.direction.zx -= moveAmount;
      mapDevelopStore.refresh();
    }

    if (key === "ArrowDown") {
      //   pressed.down = false;
      if (mapDevelopStore.level === null) return;
      mapDevelopStore.level.direction.y += moveAmount;
      mapDevelopStore.refresh();
    }
  });
};
