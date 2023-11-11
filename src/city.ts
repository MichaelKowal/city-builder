import * as THREE from "three";
import Game from "./game";
import Tile from "./tile";
import IUpdatable from "./types/IUpdatable";

export default class City implements IUpdatable {
  data: Tile[][] = [];
  size: number = 0;

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
      for (let y = 0; y < this.size; y++) {
        const tile = new Tile(x, y);
        tile.createMesh(tile.ground!);
        column.push(tile);
      }
      this.data.push(column);
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
