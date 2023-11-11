import Game from "../game";
import Scene from "../scene";

export interface GameWindow extends Window {
  scene?: Scene;
  game?: Game;
}
