import * as THREE from "three";

// Math shortcuts
export const Y_AXIS = new THREE.Vector3(0, 1, 0);
export const DEG_TO_RAD = Math.PI / 180;

// Camera radius
export const MAX_CAMERA_RADIUS = 20;
export const MIN_CAMERA_RADIUS = 10;
export const ROTATION_SPEED = 0.5;

// Camera panning
export const PAN_SPEED = -0.01;

// Camera zooming
export const ZOOM_SPEED = 0.02;
export const MIN_CAMERA_ELEVATION = 30;
export const MAX_CAMERA_ELEVATION = 90;
