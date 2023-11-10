import * as THREE from "three";
import Camera from "./camera.js";
import { setMouseDownState, setMouseUpState } from "./mouseHandler.js";

export default class Scene {
  /**
   * @type {HTMLDivElement}
   */
  gameWindow = null;
  /**
   * @type {THREE.Scene}
   */
  scene = null;
  /**
   * @type {Camera}
   */
  camera = null;
  /**
   * @type {THREE.WebGLRenderer}
   */
  renderer = null;

  constructor() {
    this.init();
    this.createBox();
  }

  init() {
    this.gameWindow = document.getElementById("render-target");
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x777777);

    this.camera = new Camera(this.gameWindow);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.gameWindow.offsetWidth,
      this.gameWindow.offsetHeight
    );

    this.gameWindow.appendChild(this.renderer.domElement);
  }

  createBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }

  draw = () => {
    // mesh.geometry.rotateX(0.01);
    // mesh.geometry.rotateY(0.01);
    this.renderer.render(this.scene, this.camera.camera);
  };

  start = () => {
    this.renderer.setAnimationLoop(this.draw);
  };

  stop = () => {
    this.renderer.setAnimationLoop(null);
  };

  onMouseDown = (event) => {
    // Call this first to ensure the mouse state is set for
    // further event handlers.
    setMouseDownState(event);
  };

  onMouseUp = (event) => {
    // Call this first to ensure the mouse state is set for
    // further event handlers.
    setMouseUpState(event);
  };

  onMouseMove = (event) => {
    console.log("mouse move");
    this.camera.handleCameraMove(event);
  };
}
