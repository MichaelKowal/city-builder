import { BuildingType } from "../types/AssetTypes";
import { IAsset } from "../types/IAsset";
import { createAssetInstance } from "../utils/assets";

export default class Building implements IAsset {
  type: BuildingType;
  level: number = 1;
  maxLevel: number = 3;
  mesh: THREE.Mesh | null = null;

  constructor(type: BuildingType, level = 1, maxLevel = 3) {
    this.type = type;
    this.level = level;
    this.maxLevel = maxLevel;
  }

  /**
   * Upgrade the building to the next level.
   * If the upgrade is successful, return true.
   */
  upgrade() {
    if (this.level < this.maxLevel) {
      this.level++;
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
