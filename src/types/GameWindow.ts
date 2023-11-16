import GameManager from "../game/gameManager";
import SceneManager from "../game/sceneManager";

export interface GameWindow extends Window {
  scene?: SceneManager;
  game?: typeof GameManager;
}
