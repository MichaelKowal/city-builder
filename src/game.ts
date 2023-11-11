import City from "./city";
import Scene from "./scene";
import { GameWindow } from "./types/GameWindow";
import IUpdatable from "./types/IUpdatable";
import { configureEventHandlers } from "./utils/events";

export default class Game implements IUpdatable {
  scene: Scene | null = null;
  city: City | null = null;
  private _selectedObject: THREE.Object3D | null = null;
  static instance: Game;

  static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  /**
   * Create a new game with a city of the given size.
   * @param size The size of the city to create.  The city will be size x size blocks.
   */
  init = (size: number) => {
    this.scene = new Scene();
    (window as GameWindow).scene = this.scene;

    configureEventHandlers();

    this.city = new City(size);

    this.scene.setUpLights();
    this.scene.start();
  };

  /**
   * Start the game with the current city.  The game will update once every second.
   */
  start = () => {
    if (this.scene) {
      this.scene.start();
      setInterval(() => this.update(), 1000);
    }
  };

  update() {
    this.city?.update();
  }

  set selectedObject(object: THREE.Object3D | null) {
    this._selectedObject = object;
  }

  get selectedObject() {
    return this._selectedObject;
  }
}
