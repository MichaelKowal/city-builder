export enum BuildingType {
  BUILDING = "building",
}

export enum GroundType {
  DIRT = "dirt",
  GRASS = "grass",
}

// Union of all different asset types.
export type AssetType = BuildingType | GroundType;
