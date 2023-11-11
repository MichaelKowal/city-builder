import * as THREE from "three";
import Game from "./game";
import Tile from "./tile";
import IUpdatable from "./types/IUpdatable";
import IMeshable from "./types/IMeshable";

export default class City implements IUpdatable, IMeshable {
  data: Tile[][] = [];
  size: number = 0;
  meshes: THREE.Mesh[][] = [];

  constructor(size: number) {
    this.size = size;
    this.initializeCity();
  }

  initializeCity() {
    const scene = Game.getInstance().scene?.scene;
    if (!scene) {
      return;
    }
    // Create a 2D array of size x size
    // For each element in the array, create a building
    for (let x = 0; x < this.size; x++) {
      const column: Tile[] = [];
      const meshColumn: THREE.Mesh[] = [];
      for (let y = 0; y < this.size; y++) {
        const tile = new Tile(x, y);
        column.push(tile);

        // Create the ground tile mesh.
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, -0.5, y);
        scene.add(mesh);
        meshColumn.push(mesh);
      }
      this.data.push(column);
      this.meshes.push(meshColumn);
    }
  }

  update() {
    // Update the city
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        this.data[x][y].update();
      }
    }
  }
}
