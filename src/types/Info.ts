import { ZoneType } from "./ZoneTypes";

export interface Info {
  zone: ZoneType;
  level: number;
  location: [number, number];
}

export interface ResidentialInfo extends Info {
  zone: ZoneType.Residential;
  population: number;
}

export interface BusinessInfo extends Info {
  zone: ZoneType.Commercial | ZoneType.Industrial;
  filledJobs: number;
  totalJobs: number;
}
