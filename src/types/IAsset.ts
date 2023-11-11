import { AssetType } from "./AssetTypes";

export interface IAsset {
  type: AssetType;
  level: number;
  maxLevel: number;
  mesh: THREE.Mesh | null;
  upgrade(): boolean;
  createMesh(args?: unknown): THREE.Mesh;
}
