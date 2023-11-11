import Building from "./building";
import Game from "./game";
import Ground from "./ground";
import { BuildingType } from "./types/AssetTypes";
import IUpdatable from "./types/IUpdatable";
import { IAsset } from "./types/IAsset";

export default class Tile implements IUpdatable {
  x: number = 0;
  y: number = 0;
  building: Building | undefined;
  ground: Ground | undefined;

  constructor(x: number, y: number, building?: Building) {
    this.x = x;
    this.y = y;
    this.building = building;
    this.ground = new Ground();
  }

  createMesh(asset: IAsset) {
    if (!asset || !Game.getInstance().scene) {
      return;
    }
    const scene = Game.getInstance().scene!.scene;
    if (asset.mesh) {
      scene.getObjectByName(asset.mesh.name);
      scene.remove(asset.mesh);
    }
    asset.mesh = asset.createMesh({ x: this.x, y: this.y });
    scene.add(asset.mesh);
  }

  update() {
    const rand = Math.random();
    // 1% chance of building upgrade
    if (rand < 0.01) {
      let updated = false;
      if (!this.building) {
        this.building = new Building(BuildingType.BUILDING);
        updated = true;
      } else {
        updated = this.building.upgrade();
      }
      updated && this.createMesh(this.building);
    }
    // 30% chance of ground upgrade
    if (rand < 0.3) {
      if (this.ground) {
        const upgraded = this.ground?.upgrade();
        upgraded && this.createMesh(this.ground);
      }
    }
  }
}
