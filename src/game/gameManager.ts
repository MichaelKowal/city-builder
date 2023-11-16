import throttle from "lodash.throttle";
import { Object3D, Object3DEventMap } from "three";
import City from "./city";
import SceneManager from "./sceneManager";
import { GameWindow } from "../types/GameWindow";
import IUpdatable from "../types/IUpdatable";
import { configureEventHandlers } from "../utils/events";
import { isAssetData, isMesh } from "../utils/typeGuards";
import { Tool, handleTool } from "../utils/tools";
import { getDefaultKeyBinds } from "../utils/keyBindUtils";
import { load, saveKeys } from "../utils/save";
import { KeyBindings } from "../types/KeyBindings";
import {
  currentKeysPressed,
  mouseState,
  setKeyDownState,
  setKeyUpState,
  setMouseDownState,
  setMouseUpState,
} from "../utils/inputHandler";
import PeopleManager from "./peopleManager";

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
  public sceneManager: SceneManager | null = null;
  public city: City | null = null;
  public selectedObject: THREE.Object3D | null = null;
  public size: number = 0;
  public activeTool: Tool = Tool.None;
  public cityName: string = "";
  public keyBinds = getDefaultKeyBinds();
  public isPaused: boolean = false;
  private speedIndex: number = 0;
  private intervalId: number | null = null;

  private static instance: Game;

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

    this.sceneManager = new SceneManager();
    (window as GameWindow).scene = this.sceneManager;

    configureEventHandlers();

    this.city = new City();

    this.sceneManager.setUpLights();
    this.sceneManager.start();
  };

  /**
   * Start the game with the current city.  The game will update once every second.
   */
  public start = () => {
    if (this.sceneManager) {
      this.sceneManager.start();
      this.intervalId = setInterval(
        () => this.update(),
        GAME_SPEEDS[this.speedIndex]
      );
    }
  };

  public update() {
    this.city?.update();
    console.log(PeopleManager.people);
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

  private getTileAtIntersection = (
    intersection: THREE.Intersection<Object3D<Object3DEventMap>>[]
  ) => {
    if (intersection.length > 0) {
      const object = intersection[0].object;
      if (isAssetData(object.userData)) {
        return this.city?.getTile(object.userData.x, object.userData.y);
      }
    }
    return null;
  };

  private checkForIntersections = (event: MouseEvent) => {
    const {
      cameraManager: camera,
      renderer,
      raycaster,
      scene,
    } = this.sceneManager!;
    // Calculate mouse position in normalized device coordinates
    mouseState.mousePosition.x =
      (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouseState.mousePosition.y =
      (event.clientY / renderer.domElement.clientHeight) * -2 + 1;

    raycaster.setFromCamera(mouseState.mousePosition, camera.camera);
    const intersections = raycaster.intersectObjects(scene.children, false);
    if (intersections.length > 0) {
      const tile = this.getTileAtIntersection(intersections);
      // If there is already a selected object, reset its emissive color and deselect it.
      if (this.selectedObject && isMesh(this.selectedObject)) {
        (
          this.selectedObject.material as THREE.MeshLambertMaterial
        ).emissive.set(0x000000);
        this.selectedObject = null;
      }
      // Set the emissive color of the selected object and set it as the selected object.
      this.selectedObject = intersections[0].object;
      (
        (this.selectedObject as THREE.Mesh)
          .material as THREE.MeshLambertMaterial
      ).emissive.set(0x555555);
      if (mouseState.isLeftMouseDown && !currentKeysPressed.has("Shift")) {
        tile && handleTool(tile);
      }
    }
  };

  public onMouseDown = (event: MouseEvent) => {
    // Call this first to ensure the mouse state is set for
    // further event handlers.
    setMouseDownState(event);
    if (!currentKeysPressed.has("Shift")) {
      this.checkForIntersections(event);
    }
  };

  public onMouseUp = (event: MouseEvent) => {
    // Call this first to ensure the mouse state is set for
    // further event handlers.
    setMouseUpState(event);
  };

  // Limit the mouse move to fire only once every 24ms/60 times per second.
  public onMouseMove = throttle((event: MouseEvent) => {
    this.sceneManager!.cameraManager.handleCameraMoveWithMouse(event);
    this.checkForIntersections(event);
  }, 24);

  public onKeyDown = (event: KeyboardEvent) => {
    setKeyDownState(event);
    this.sceneManager!.cameraManager.handleCameraMoveWithKeys();
  };

  public onKeyUp = (event: KeyboardEvent) => {
    setKeyUpState(event);
    this.sceneManager!.cameraManager.handleCameraStop();
  };
}

const GameManager = Game.getInstance();

export default GameManager;
