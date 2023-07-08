import { path } from "sage";

import { game } from "../game/game";

const keys = [
  // "z", "x",
  "Shift",
  "Control",
  "ArrowLeft",
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
];

export const addGameEvents = () => {
  const { pressed } = game;

  document.body.addEventListener("keydown", (event) => {
    if (path.get()[0] !== "game") return;
    const { key } = event;

    if (!keys.includes(key)) return;

    if (key === "Shift") {
      pressed.shift = true;
    }

    if (key === "Control") {
      pressed.control = true;
    }

    if (key === "ArrowLeft") {
      pressed.left = true;
    }

    if (key === "ArrowUp") {
      pressed.up = true;
    }
    if (key === "ArrowRight") {
      pressed.right = true;
    }

    if (key === "ArrowDown") {
      pressed.down = true;
    }
  });

  document.body.addEventListener("keyup", (event) => {
    if (path.get()[0] !== "game") return;
    const { key } = event;

    if (!keys.includes(key)) return;

    if (key === "Shift") {
      pressed.shift = false;
    }

    if (key === "Control") {
      pressed.control = false;
    }

    if (key === "ArrowLeft") {
      pressed.left = false;
    }

    if (key === "ArrowUp") {
      pressed.up = false;
    }
    if (key === "ArrowRight") {
      pressed.right = false;
    }

    if (key === "ArrowDown") {
      pressed.down = false;
    }
  });
};
