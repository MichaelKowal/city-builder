import * as THREE from "three";
import CameraManager from "./cameraManager";

export default class SceneManager {
  gameWindow: HTMLElement | null = null;
  scene: THREE.Scene;
  cameraManager: CameraManager;
  renderer: THREE.WebGLRenderer;
  raycaster: THREE.Raycaster;

  constructor() {
    this.gameWindow = document.getElementById("render-target");
    if (!this.gameWindow) {
      throw new Error("Unable to find game window.");
    }
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x777777);

    this.cameraManager = new CameraManager(this.gameWindow);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.gameWindow.offsetWidth,
      this.gameWindow.offsetHeight
    );
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.gameWindow.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
  }

  setUpLights = () => {
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(20, 20, 20);
    sun.castShadow = true;
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 0;
    sun.shadow.camera.bottom = -10;

    // Use these to change shadow resolution
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;

    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    this.scene.add(sun);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  };

  resetScene = () => {
    this.scene.clear();
  };

  draw = () => {
    this.renderer.render(this.scene, this.cameraManager.camera);
  };

  start = () => {
    this.renderer.setAnimationLoop(this.draw);
  };

  stop = () => {
    this.renderer.setAnimationLoop(null);
  };
}
