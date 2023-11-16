import * as THREE from "three";
import { AssetFactory, AssetData } from "../types/AssetFactory";
import {
  AssetType,
  BuildingType,
  GroundType,
  OtherType,
} from "../types/AssetTypes";
import { ZoneType } from "../types/ZoneTypes";

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets: AssetFactory = {
  [BuildingType.BUILDING]: (args: AssetData) => {
    return createBuildingMesh(args, BuildingType.BUILDING);
  },
  [BuildingType.RESIDENTIAL]: (args: AssetData) => {
    return createBuildingMesh(args, BuildingType.RESIDENTIAL);
  },
  [BuildingType.COMMERCIAL]: (args: AssetData) => {
    return createBuildingMesh(args, BuildingType.COMMERCIAL);
  },
  [BuildingType.INDUSTRIAL]: (args: AssetData) => {
    return createBuildingMesh(args, BuildingType.INDUSTRIAL);
  },
  [GroundType.DIRT]: (args: AssetData) => {
    return createGroundMesh(args, GroundType.DIRT);
  },
  [GroundType.GRASS]: (args: AssetData) => {
    return createGroundMesh(args, GroundType.GRASS);
  },
  [OtherType.ROAD]: (args: AssetData) => {
    const material = new THREE.MeshLambertMaterial({
      color: getColor(OtherType.ROAD),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...args, type: OtherType.ROAD };
    mesh.scale.set(1, 0.1, 1);
    mesh.position.set(args.x, 0, args.y);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  },
};

function createGroundMesh(args: AssetData, type: GroundType) {
  const material = new THREE.MeshLambertMaterial({
    color: getColor(type),
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData = { ...args, type };
  mesh.position.set(args.x, -0.5, args.y);
  mesh.receiveShadow = true;

  return mesh;
}

function createBuildingMesh(args: AssetData, type: BuildingType) {
  // The level is passed as an extra argument into the building
  // factory.  This allows the buildings to grow over time.
  const height = args.level as number;
  const material = new THREE.MeshLambertMaterial({
    color: getColor(type),
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData = { ...args, type };
  mesh.scale.set(1, height, 1);
  mesh.position.set(args.x, height / 2, args.y);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

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

export function getEmissiveColor(zoneType?: ZoneType) {
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

export function getNewBuildingType(zoneType: ZoneType) {
  switch (zoneType) {
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
