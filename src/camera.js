import * as THREE from "three";
import { mouseState } from "./mouseHandler.js";
import { DEG_TO_RAD } from "./constants.js";

const MIN_CAMERA_RADIUS = 2;
const MAX_CAMERA_RADIUS = 10;
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const ROTATION_SPEED = 0.5;
const PAN_SPEED = -0.01;
const ZOOM_SPEED = 0.02;
const MIN_CAMERA_ELEVATION = 30;
const MAX_CAMERA_ELEVATION = 90;

export default class Camera {
  /**
   * @type {number}
   */
  elevation = MIN_CAMERA_ELEVATION;
  /**
   * @type {number}
   */
  azimuth = 0;
  /**
   * @type {number}
   */
  radius = 4;
  /**
   * @type {THREE.Vector3}
   */
  origin = new THREE.Vector3(0, 0, 0);
  /**
   * @type {THREE.PerspectiveCamera}
   */
  camera = null;

  constructor(gameWindow) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      gameWindow.offsetWidth / gameWindow.offsetHeight,
      0.1,
      1000
    );
    this.updateCameraPosition();
  }

  updateCameraPosition() {
    this.camera.position.x =
      this.radius *
      Math.sin(this.azimuth * DEG_TO_RAD) *
      Math.cos(this.elevation * DEG_TO_RAD);
    this.camera.position.y =
      this.radius * Math.sin(this.elevation * DEG_TO_RAD);
    this.camera.position.z =
      this.radius *
      Math.cos(this.azimuth * DEG_TO_RAD) *
      Math.cos(this.elevation * DEG_TO_RAD);
    this.camera.position.add(this.origin);
    this.camera.lookAt(this.origin);
    this.camera.updateMatrix();
  }

  rotateCamera = (event) => {
    this.azimuth += -(event.movementX * ROTATION_SPEED);
    this.elevation += event.movementY * ROTATION_SPEED;
    this.elevation = Math.min(
      MAX_CAMERA_ELEVATION,
      Math.max(MIN_CAMERA_ELEVATION, this.elevation)
    );
    this.updateCameraPosition();
  };

  panCamera = (event) => {
    const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
      Y_AXIS,
      this.azimuth * DEG_TO_RAD
    );
    const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
      Y_AXIS,
      this.azimuth * DEG_TO_RAD
    );
    this.origin.addScaledVector(forward, event.movementY * PAN_SPEED);
    this.origin.addScaledVector(left, event.movementX * PAN_SPEED);
    this.updateCameraPosition();
  };

  zoomCamera = (event) => {
    this.radius -= event.movementY * ZOOM_SPEED;
    this.radius = Math.min(
      MAX_CAMERA_RADIUS,
      Math.max(MIN_CAMERA_RADIUS, this.radius)
    );
    this.updateCameraPosition();
  };

  handleCameraMove = (event) => {
    if (mouseState.isLeftMouseDown) {
      this.rotateCamera(event);
    }

    if (mouseState.isRightMouseDown) {
      this.panCamera(event);
    }

    if (mouseState.isMiddleMouseDown) {
      this.zoomCamera(event);
    }
  };
}
