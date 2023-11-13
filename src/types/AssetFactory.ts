import { AssetType } from "./AssetTypes";

export interface AssetData {
  x: number;
  y: number;
  [extraArg: string]: unknown;
}
type AssetFunction = (args: AssetData) => THREE.Object3D;

export type AssetFactory = {
  [key in AssetType]: AssetFunction;
};
