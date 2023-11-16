import { BuildingType } from "../types/AssetTypes";
import { IAsset } from "../types/IAsset";
import IUpdatable from "../types/IUpdatable";
import { createAssetInstance } from "../utils/assets";
import Citizen from "./citizen";
import PeopleManager from "./peopleManager";

export default class Building implements IAsset, IUpdatable {
  type: BuildingType;
  level: number = 1;
  maxLevel: number = 3;
  mesh: THREE.Mesh | null = null;
  residents: Citizen[] = [];
  maxResidents: number = 0;
  id: string = crypto.randomUUID();

  constructor(type: BuildingType, level = 1, maxLevel = 3) {
    this.type = type;
    this.level = level;
    this.maxLevel = maxLevel;
    if (type === BuildingType.RESIDENTIAL) {
      this.maxResidents = 2;
    }
  }

  update(): void {
    if (
      this.type === BuildingType.RESIDENTIAL &&
      this.residents.length < this.maxResidents &&
      Math.random() < 0.1
    ) {
      this.residents.push(PeopleManager.createPerson(this));
    }
  }

  /**
   * Upgrade the building to the next level.
   * If the upgrade is successful, return true.
   */
  upgrade() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.maxResidents *= 2;
      return true;
    }
    return false;
  }

  createMesh(args: { x: number; y: number }) {
    this.mesh = createAssetInstance(this.type, {
      x: args.x,
      y: args.y,
      level: this.level,
    }) as THREE.Mesh;
    return this.mesh;
  }
}
