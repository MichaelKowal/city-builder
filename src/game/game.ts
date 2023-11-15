import { Object3D } from "three";
import City from "./city";
import Scene from "./scene";
import { GameWindow } from "../types/GameWindow";
import IUpdatable from "../types/IUpdatable";
import { configureEventHandlers } from "../utils/events";
import { isAssetData, isMesh } from "../utils/typeGuards";
import { Tool, handleTool } from "../utils/tools";
import { getDefaultKeyBinds } from "../utils/keyBindUtils";
import { load, saveKeys } from "../utils/save";
import { KeyBindings } from "../types/KeyBindings";

const GAME_SPEEDS = [1000, 500, 100];

/**
 * The Game controls the high level game logic and acts as a
 * single source of truth for common game data. It is a singleton
 * and can be accessed from anywhere in the application with a simple
 * `Game` import.
 *
 * Game.getInstance() is not necessary as the instance is exported as
 * the default export of this file.
 */
class Game implements IUpdatable {
  public scene: Scene | null = null;
  public city: City | null = null;
  public selectedObject: THREE.Object3D | null = null;
  public size: number = 0;
  public activeTool: Tool = Tool.None;
  public cityName: string = "";
  public keyBinds = getDefaultKeyBinds();
  public isPaused: boolean = false;
  private speedIndex: number = 0;
  private intervalId: number | null = null;

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
  public init = (size: number, cityName: string) => {
    this.size = size;
    this.cityName = cityName;

    const controls = load(saveKeys.keyBindings);
    if (controls) {
      this.keyBinds = controls as KeyBindings;
    }

    this.scene = new Scene();
    (window as GameWindow).scene = this.scene;

    configureEventHandlers();

    this.city = new City();

    this.scene.setUpLights();
    this.scene.start();
  };

  /**
   * Start the game with the current city.  The game will update once every second.
   */
  public start = () => {
    if (this.scene) {
      this.scene.start();
      this.intervalId = setInterval(
        () => this.update(),
        GAME_SPEEDS[this.speedIndex]
      );
    }
  };

  public update() {
    this.city?.update();
  }

  public getSpeed = () => {
    return this.speedIndex;
  };

  public nextSpeed = () => {
    this.speedIndex = this.speedIndex + 1;
    if (this.speedIndex >= GAME_SPEEDS.length) {
      this.speedIndex = 0;
    }
    this.play();
  };

  public togglePause = () => {
    if (this.isPaused) {
      this.play();
    } else {
      this.pause();
    }
  };

  public play = () => {
    this.isPaused = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(
      () => this.update(),
      GAME_SPEEDS[this.speedIndex]
    );
  };

  public pause = () => {
    this.isPaused = true;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  };

  public handleIntersection = (intersections: THREE.Intersection[]) => {
    // If there is already a selected object, reset its emissive color and deselect it.
    if (this.selectedObject && isMesh(this.selectedObject)) {
      (this.selectedObject.material as THREE.MeshLambertMaterial).emissive.set(
        0x000000
      );
      this.selectedObject = null;
    }
    // Set the emissive color of the selected object and set it as the selected object.
    this.selectedObject = intersections[0].object;
    (
      (this.selectedObject as THREE.Mesh).material as THREE.MeshLambertMaterial
    ).emissive.set(0x555555);
    this.onObjectSelected(this.selectedObject);
  };

  public onObjectSelected = (object: Object3D) => {
    if (isAssetData(object.userData)) {
      const tile = this.city?.getTile(object.userData.x, object.userData.y);
      tile && handleTool(tile);
    }
  };
}

export default Game.getInstance();
