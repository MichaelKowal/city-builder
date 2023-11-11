import * as THREE from "three";
import { AssetFactory, AssetFactoryFunctionArgs } from "../types/AssetFactory";
import { AssetType, BuildingType, GroundType } from "../types/AssetTypes";

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets: AssetFactory = {
  [BuildingType.BUILDING]: (args: AssetFactoryFunctionArgs) => {
    // The level is passed as an extra argument into the building
    // factory.  This allows the buildings to grow over time.
    const height = args.level as number;
    const material = new THREE.MeshLambertMaterial({
      color: getColor(BuildingType.BUILDING, height),
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, height, 1);
    mesh.position.set(args.x, height / 2, args.y);
    return mesh;
  },
  [GroundType.DIRT]: (args: AssetFactoryFunctionArgs) => {
    const material = new THREE.MeshLambertMaterial({
      color: getColor(GroundType.DIRT),
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(args.x, -0.5, args.y);
    return mesh;
  },
  [GroundType.GRASS]: (args: AssetFactoryFunctionArgs) => {
    const material = new THREE.MeshLambertMaterial({
      color: getColor(GroundType.GRASS),
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(args.x, -0.5, args.y);
    return mesh;
  },
};

export function createAssetInstance(
  assetType: AssetType,
  args: AssetFactoryFunctionArgs
) {
  return assets[assetType](args);
}

const getColor = (assetType: AssetType, level?: number) => {
  switch (assetType) {
    case BuildingType.BUILDING:
      switch (level) {
        case 1:
          return 0x7069f5;
        case 2:
          return 0xe9f569;
        case 3:
          return 0xf569b8;
      }
    case GroundType.DIRT:
      return 0x705000;
    case GroundType.GRASS:
      return 0x00aa00;
    default:
      return 0xffffff;
  }
};
