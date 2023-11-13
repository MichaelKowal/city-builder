import Game from "./game";
import Tile from "./tile";
import IUpdatable from "../types/IUpdatable";

export default class City implements IUpdatable {
  tiles: Tile[][] = [];

  constructor() {
    this.initializeCity();
  }

  initializeCity() {
    const scene = Game.scene?.scene;
    if (!scene) {
      return;
    }
    // Create a 2D array of size x size
    // For each element in the array, create a building
    for (let x = 0; x < Game.size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < Game.size; y++) {
        const tile = new Tile(x, y);
        tile.createMesh(tile.ground!);
        column.push(tile);
      }
      this.tiles.push(column);
    }
  }

  update() {
    // Update the city
    for (let x = 0; x < Game.size; x++) {
      for (let y = 0; y < Game.size; y++) {
        this.tiles[x][y].update();
      }
    }
  }

  getTile(x: number, y: number) {
    return this.tiles[x][y];
  }
}
