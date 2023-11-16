import GameManager from "../game/gameManager";

export function configureEventHandlers() {
  document.addEventListener("mousedown", (e) => {
    GameManager.onMouseDown(e);
  });
  document.addEventListener("mouseup", (e) => {
    GameManager.onMouseUp(e);
  });
  document.addEventListener("mousemove", (e) => {
    GameManager.onMouseMove(e);
  });
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  document.addEventListener("keydown", (e) => {
    GameManager.onKeyDown(e);
  });
  document.addEventListener("keyup", (e) => {
    GameManager.onKeyUp(e);
  });
}
