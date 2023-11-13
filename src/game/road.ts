import { OtherType } from "../types/AssetTypes";
import { IAsset } from "../types/IAsset";
import { createAssetInstance } from "../utils/assets";

export default class Road implements IAsset {
  type: OtherType = OtherType.ROAD;
  level: number = 1;
  maxLevel: number = 1;
  mesh: THREE.Mesh | null = null;

  /**
   * Roads are not upgradeable so this function will always return false.
   */
  upgrade() {
    return false;
  }

  createMesh(args: { x: number; y: number }) {
    this.mesh = createAssetInstance(this.type, {
      x: args.x,
      y: args.y,
    }) as THREE.Mesh;
    return this.mesh;
  }
}
