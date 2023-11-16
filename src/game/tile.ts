import Building from "./building";
import GameManager from "./gameManager";
import Ground from "./ground";
import IUpdatable from "../types/IUpdatable";
import { IAsset } from "../types/IAsset";
import { ZoneType } from "../types/ZoneTypes";
import Road from "./road";
import { Info, ResidentialInfo } from "../types/Info";
import { getEmissiveColor, getNewBuildingType } from "../utils/assets";
import { BuildingType } from "../types/AssetTypes";

export default class Tile implements IUpdatable {
  x: number = 0;
  y: number = 0;
  building: Building | undefined;
  ground: Ground | undefined;
  zoneType: ZoneType = ZoneType.None;
  road: Road | undefined;

  constructor(x: number, y: number, building?: Building) {
    this.x = x;
    this.y = y;
    this.building = building;
    this.ground = new Ground();
  }

  public createMesh(asset: IAsset) {
    if (!asset || !GameManager.sceneManager) {
      return;
    }
    const scene = GameManager.sceneManager.scene;
    if (asset.mesh) {
      scene.getObjectByName(asset.mesh.name);
      scene.remove(asset.mesh);
    }
    asset.mesh = asset.createMesh({
      x: this.x,
      y: this.y,
      zone: this.zoneType,
    });
    scene.add(asset.mesh);
  }

  public update() {
    const rand = Math.random();
    // 1% chance of building upgrade if the tile has been zoned and is
    // not a road.
    if (rand < 0.01 && this.zoneType !== ZoneType.None && !this.road) {
      let upgraded = false;
      if (!this.building) {
        this.building = new Building(getNewBuildingType(this.zoneType));
        upgraded = true;
      } else {
        upgraded = this.building.upgrade();
      }
      upgraded && this.createMesh(this.building);
    }
    if (this.building) {
      this.building.update();
    }
    // 10% chance for ground upgrade.
    if (rand < 0.1) {
      if (this.ground) {
        const upgraded = this.ground?.upgrade();
        upgraded && this.createMesh(this.ground);
        (
          this.ground.mesh?.material as THREE.MeshLambertMaterial
        ).emissive.setHex(getEmissiveColor(this.zoneType));
      }
    }
  }

  public changeZone(zoneType: ZoneType) {
    // If changing zone type remove the current building.
    if (this.building && this.zoneType !== zoneType) {
      const building = this.building;
      this.building = undefined;
      this.removeMesh(building);
    }
    this.zoneType = zoneType;
    this.createMesh(this.ground!);
    (this.ground!.mesh?.material as THREE.MeshLambertMaterial).emissive.setHex(
      getEmissiveColor(zoneType)
    );
  }

  public createRoad() {
    if (this.building) {
      return;
    }
    this.road = new Road();
    this.createMesh(this.road);
  }

  // Remove a building or road that is on a tile. The ground on that tile should be
  // reset to the default ground type.
  public destroyAsset() {
    if (this.building) {
      const building = this.building;
      this.building = undefined;
      this.removeMesh(building);
    }
    if (this.road) {
      const road = this.road;
      this.road = undefined;
      this.removeMesh(road);
    }
    this.ground?.reset();
    this.createMesh(this.ground!);
    (this.ground!.mesh?.material as THREE.MeshLambertMaterial).emissive.setHex(
      getEmissiveColor(this.zoneType)
    );
  }

  public getInfo(): Info {
    const info: Info = {
      level: this.building!.level,
      zone: this.zoneType,
      location: [this.x, this.y],
    };
    if (this.building?.type === BuildingType.RESIDENTIAL) {
      (info as ResidentialInfo).population = this.building.residents.length;
    }
    return info;
  }

  private removeMesh(asset: IAsset) {
    if (!asset || !GameManager.sceneManager) {
      return;
    }
    const scene = GameManager.sceneManager.scene;
    if (asset.mesh) {
      scene.getObjectByName(asset.mesh.name);
      scene.remove(asset.mesh);
    }
  }
}
