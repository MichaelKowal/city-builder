export enum BuildingType {
  BUILDING = "building",
  COMMERCIAL = "commercial",
  INDUSTRIAL = "industrial",
  RESIDENTIAL = "residential",
}

export enum GroundType {
  DIRT = "dirt",
  GRASS = "grass",
}

export enum OtherType {
  ROAD = "road",
}

// Union of all different asset types.
export type AssetType = BuildingType | GroundType | OtherType;
