import * as THREE from "https://unpkg.com/three@0.158.0/build/three.module.js";

export const createScene = () => {
  const gameWindow = document.getElementById("render-target");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const draw = () => {
    mesh.geometry.rotateX(0.01);
    mesh.geometry.rotateY(0.01);
    renderer.render(scene, camera);
  };

  const start = () => {
    renderer.setAnimationLoop(draw);
  };

  const stop = () => {
    renderer.setAnimationLoop(null);
  };

  return {
    start,
    stop,
  };
};
