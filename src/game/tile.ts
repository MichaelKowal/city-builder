import Building from "./building";
import Game from "./game";
import Ground from "./ground";
import { BuildingType } from "../types/AssetTypes";
import IUpdatable from "../types/IUpdatable";
import { IAsset } from "../types/IAsset";
import { ZoneType } from "../types/ZoneTypes";
import Road from "./road";

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

  createMesh(asset: IAsset) {
    if (!asset || !Game.scene) {
      return;
    }
    const scene = Game.scene.scene;
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

  removeMesh(asset: IAsset) {
    if (!asset || !Game.scene) {
      return;
    }
    const scene = Game.scene.scene;
    if (asset.mesh) {
      scene.getObjectByName(asset.mesh.name);
      scene.remove(asset.mesh);
    }
  }

  update() {
    const rand = Math.random();
    // 1% chance of building upgrade if the tile has been zoned and is
    // not a road.
    if (rand < 0.01 && this.zoneType !== ZoneType.None && !this.road) {
      let updated = false;
      if (!this.building) {
        this.building = new Building(this.getNewBuildingType());
        updated = true;
      } else {
        updated = this.building.upgrade();
      }
      updated && this.createMesh(this.building);
    }
    // 10% chance for ground upgrade.
    if (rand < 0.1) {
      if (this.ground) {
        const upgraded = this.ground?.upgrade();
        upgraded && this.createMesh(this.ground);
        (
          this.ground.mesh?.material as THREE.MeshLambertMaterial
        ).emissive.setHex(this.getEmissiveColor(this.zoneType));
      }
    }
  }

  changeZone(zoneType: ZoneType) {
    // If changing zone type remove the current building.
    if (this.building && this.zoneType !== zoneType) {
      const building = this.building;
      this.building = undefined;
      this.removeMesh(building);
    }
    this.zoneType = zoneType;
    this.createMesh(this.ground!);
    (this.ground!.mesh?.material as THREE.MeshLambertMaterial).emissive.setHex(
      this.getEmissiveColor(zoneType)
    );
  }

  createRoad() {
    if (this.building) {
      return;
    }
    this.road = new Road();
  }

  // Remove a building or road that is on a tile. The ground on that tile should be
  // reset to the default ground type.
  destroyAsset() {
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
      this.getEmissiveColor(this.zoneType)
    );
  }

  private getNewBuildingType() {
    switch (this.zoneType) {
      case ZoneType.Residential:
        return BuildingType.RESIDENTIAL;
      case ZoneType.Commercial:
        return BuildingType.COMMERCIAL;
      case ZoneType.Industrial:
        return BuildingType.INDUSTRIAL;
      default:
        return BuildingType.BUILDING;
    }
  }

  private getEmissiveColor(zoneType: ZoneType) {
    switch (zoneType) {
      case ZoneType.Residential:
        return 0x00ad76;
      case ZoneType.Commercial:
        return 0xff7c5b;
      case ZoneType.Industrial:
        return 0x009bce;
      default:
        return 0x000000;
    }
  }
}
