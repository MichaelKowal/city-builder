import * as THREE from "three";
import Game from "./game";
import {
  DEG_TO_RAD,
  MAX_CAMERA_ELEVATION,
  MAX_CAMERA_RADIUS,
  MIN_CAMERA_ELEVATION,
  MIN_CAMERA_RADIUS,
  PAN_SPEED,
  ROTATION_SPEED,
  Y_AXIS,
  ZOOM_SPEED,
} from "../utils/constants";
import { mouseState } from "../utils/mouseHandler";

export default class Camera {
  elevation: number = 60;
  azimuth: number = 150;
  radius: number = (MIN_CAMERA_RADIUS + MAX_CAMERA_RADIUS) / 2;
  origin: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  camera: THREE.Camera;

  constructor(gameWindow: HTMLElement) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      gameWindow.offsetWidth / gameWindow.offsetHeight,
      0.1,
      1000
    );
    // Set the origin to the middle of the board as the board starts at 0, 0, 0.
    this.origin = new THREE.Vector3(
      (Game.size ?? 0) / 2,
      0,
      (Game.size ?? 0) / 2
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

  rotateCamera = (event: MouseEvent) => {
    this.azimuth += -(event.movementX * ROTATION_SPEED);
    this.elevation += event.movementY * ROTATION_SPEED;
    this.elevation = Math.min(
      MAX_CAMERA_ELEVATION,
      Math.max(MIN_CAMERA_ELEVATION, this.elevation)
    );
    this.updateCameraPosition();
  };

  panCamera = (event: MouseEvent) => {
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

  zoomCamera = (event: MouseEvent) => {
    this.radius -= event.movementY * ZOOM_SPEED;
    this.radius = Math.min(
      MAX_CAMERA_RADIUS,
      Math.max(MIN_CAMERA_RADIUS, this.radius)
    );
    this.updateCameraPosition();
  };

  handleCameraMove = (event: MouseEvent) => {
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
