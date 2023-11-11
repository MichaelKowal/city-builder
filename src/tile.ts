import * as THREE from "three";
import Game from "./game";
import Building from "./building";
import { BuildingType } from "./types/BuildingType";

export default class Tile {
  x: number = 0;
  y: number = 0;
  building: Building | undefined;
  mesh: THREE.Mesh | null = null;

  constructor(x: number, y: number, building?: Building) {
    this.x = x;
    this.y = y;
    this.building = building;
  }

  createMesh() {
    if (!this.building || !Game.getInstance().scene) {
      return;
    }
    const scene = Game.getInstance().scene!.scene;
    if (this.mesh) {
      scene.getObjectByName(this.mesh.name);
      scene.remove(this.mesh);
    }
    const height = this.building.level;
    const geometry = new THREE.BoxGeometry(0.8, height, 0.8);
    const material = new THREE.MeshLambertMaterial({
      color: 0x777777,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(this.x, height / 2, this.y);
    scene.add(this.mesh);
  }

  update() {
    const rand = Math.random();
    if (rand < 0.01) {
      console.log("Building upgraded!");
      if (!this.building) {
        this.building = new Building(BuildingType.BUILDING);
      } else {
        this.building.upgrade();
      }
      this.createMesh();
    }
  }
}
