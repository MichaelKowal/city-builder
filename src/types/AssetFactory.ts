import { AssetType } from "./AssetTypes";

export interface AssetFactoryFunctionArgs {
  x: number;
  y: number;
  [extraArg: string]: unknown;
}
type AssetFunction = (args: AssetFactoryFunctionArgs) => THREE.Object3D;

export type AssetFactory = {
  [key in AssetType]: AssetFunction;
};
