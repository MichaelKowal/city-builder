import { GroundType } from "../types/AssetTypes";
import { IAsset } from "../types/IAsset";
import { createAssetInstance } from "../utils/assets";

export default class Ground implements IAsset {
  type: GroundType;
  level: number = 1;
  maxLevel: number = 3;
  mesh: THREE.Mesh | null = null;

  constructor(type: GroundType = GroundType.DIRT, level = 1) {
    this.type = type;
    this.level = level;
  }

  /**
   * Upgrade the ground from dirt to grass.
   * If the upgrade is successful, return true.
   */
  upgrade() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.type = GroundType.GRASS;
      return true;
    }
    return false;
  }

  createMesh(args: { x: number; y: number }): THREE.Mesh {
    this.mesh = createAssetInstance(this.type, {
      x: args.x,
      y: args.y,
    }) as THREE.Mesh;
    return this.mesh;
  }

  reset() {
    this.type = GroundType.DIRT;
    this.level = 1;
  }
}
