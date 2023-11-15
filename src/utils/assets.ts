import * as THREE from "three";
import { AssetFactory, AssetData } from "../types/AssetFactory";
import {
  AssetType,
  BuildingType,
  GroundType,
  OtherType,
} from "../types/AssetTypes";

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets: AssetFactory = {
  [BuildingType.BUILDING]: (args: AssetData) => {
    // The level is passed as an extra argument into the building
    // factory.  This allows the buildings to grow over time.
    const height = args.level as number;
    const material = new THREE.MeshLambertMaterial({
      color: getColor(BuildingType.BUILDING),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...args, type: BuildingType.BUILDING };
    mesh.scale.set(1, height, 1);
    mesh.position.set(args.x, height / 2, args.y);

    return mesh;
  },
  [BuildingType.RESIDENTIAL]: (args: AssetData) => {
    // The level is passed as an extra argument into the building
    // factory.  This allows the buildings to grow over time.
    const height = args.level as number;
    const material = new THREE.MeshLambertMaterial({
      color: getColor(BuildingType.RESIDENTIAL),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...args, type: BuildingType.RESIDENTIAL };
    mesh.scale.set(1, height, 1);
    mesh.position.set(args.x, height / 2, args.y);

    return mesh;
  },
  [BuildingType.COMMERCIAL]: (args: AssetData) => {
    // The level is passed as an extra argument into the building
    // factory.  This allows the buildings to grow over time.
    const height = args.level as number;
    const material = new THREE.MeshLambertMaterial({
      color: getColor(BuildingType.COMMERCIAL),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...args, type: BuildingType.COMMERCIAL };
    mesh.scale.set(1, height, 1);
    mesh.position.set(args.x, height / 2, args.y);

    return mesh;
  },
  [BuildingType.INDUSTRIAL]: (args: AssetData) => {
    // The level is passed as an extra argument into the building
    // factory.  This allows the buildings to grow over time.
    const height = args.level as number;
    const material = new THREE.MeshLambertMaterial({
      color: getColor(BuildingType.INDUSTRIAL),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...args, type: BuildingType.INDUSTRIAL };
    mesh.scale.set(1, height, 1);
    mesh.position.set(args.x, height / 2, args.y);

    return mesh;
  },
  [GroundType.DIRT]: (args: AssetData) => {
    const material = new THREE.MeshLambertMaterial({
      color: getColor(GroundType.DIRT),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...args, type: GroundType.DIRT };
    mesh.position.set(args.x, -0.5, args.y);

    return mesh;
  },
  [GroundType.GRASS]: (args: AssetData) => {
    const material = new THREE.MeshLambertMaterial({
      color: getColor(GroundType.GRASS),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...args, type: GroundType.GRASS };
    mesh.position.set(args.x, -0.5, args.y);

    return mesh;
  },
  [OtherType.ROAD]: (args: AssetData) => {
    const material = new THREE.MeshLambertMaterial({
      color: getColor(OtherType.ROAD),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...args, type: OtherType.ROAD };
    mesh.scale.set(1, 0.1, 1);
    mesh.position.set(args.x, 0, args.y);

    return mesh;
  },
};

export function createAssetInstance(assetType: AssetType, args: AssetData) {
  return assets[assetType](args);
}

const getColor = (assetType: AssetType) => {
  switch (assetType) {
    case BuildingType.RESIDENTIAL:
      return 0x00ad76;
    case BuildingType.COMMERCIAL:
      return 0xff7c5b;
    case BuildingType.INDUSTRIAL:
      return 0x009bce;
    case GroundType.DIRT:
      return 0x705000;
    case GroundType.GRASS:
      return 0x00aa00;
    case OtherType.ROAD:
      return 0x444440;
  }
  return 0xffffff;
};
