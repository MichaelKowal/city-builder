import { GameWindow } from "../types/GameWindow";

export function configureEventHandlers() {
  document.addEventListener("mousedown", (e) => {
    (window as GameWindow).scene?.onMouseDown(e);
  });
  document.addEventListener("mouseup", (e) => {
    (window as GameWindow).scene?.onMouseUp(e);
  });
  document.addEventListener("mousemove", (e) => {
    (window as GameWindow).scene?.onMouseMove(e);
  });
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  document.addEventListener("keydown", (e) => {
    (window as GameWindow).scene?.onKeyDown(e);
  });
  document.addEventListener("keyup", (e) => {
    (window as GameWindow).scene?.onKeyUp(e);
  });
}
