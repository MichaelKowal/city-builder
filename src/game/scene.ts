import * as THREE from "three";
import Camera from "./camera";
import {
  mouseState,
  setMouseDownState,
  setMouseUpState,
} from "../utils/mouseHandler";
import Game from "./game";

export default class Scene {
  gameWindow: HTMLElement | null = null;
  scene: THREE.Scene;
  camera: Camera;
  renderer: THREE.WebGLRenderer;
  raycaster: THREE.Raycaster;

  constructor() {
    this.gameWindow = document.getElementById("render-target");
    if (!this.gameWindow) {
      throw new Error("Unable to find game window.");
    }
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x777777);

    this.camera = new Camera(this.gameWindow);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.gameWindow.offsetWidth,
      this.gameWindow.offsetHeight
    );

    this.gameWindow.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
  }

  setUpLights = () => {
    const lights = [
      new THREE.AmbientLight(0xffffff, 0.2),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3),
    ];

    // Set position of directional lights.
    lights[1].position.set(0, 1, 0);
    lights[2].position.set(1, 1, 0);
    lights[3].position.set(0, 1, 1);

    this.scene.add(...lights);
  };

  resetScene = () => {
    this.scene.clear();
  };

  draw = () => {
    this.renderer.render(this.scene, this.camera.camera);
  };

  start = () => {
    this.renderer.setAnimationLoop(this.draw);
  };

  stop = () => {
    this.renderer.setAnimationLoop(null);
  };

  checkForIntersections = (event: MouseEvent) => {
    // Calculate mouse position in normalized device coordinates
    mouseState.mousePosition.x =
      (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouseState.mousePosition.y =
      (event.clientY / this.renderer.domElement.clientHeight) * -2 + 1;

    this.raycaster.setFromCamera(mouseState.mousePosition, this.camera.camera);
    const intersections = this.raycaster.intersectObjects(
      this.scene.children,
      false
    );
    if (intersections.length > 0) {
      Game.handleIntersection(intersections);
    }
  };

  onMouseDown = (event: MouseEvent) => {
    // Call this first to ensure the mouse state is set for
    // further event handlers.
    setMouseDownState(event);
    this.checkForIntersections(event);
  };

  onMouseUp = (event: MouseEvent) => {
    // Call this first to ensure the mouse state is set for
    // further event handlers.
    setMouseUpState(event);
  };

  onMouseMove = (event: MouseEvent) => {
    this.camera.handleCameraMove(event);
  };
}
