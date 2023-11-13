import Game from "../game/game";
import Scene from "../game/scene";

export interface GameWindow extends Window {
  scene?: Scene;
  game?: typeof Game;
}
