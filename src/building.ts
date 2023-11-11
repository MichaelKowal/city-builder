import { BuildingType } from "./types/BuildingType";

export default class Building {
  type: string = "";
  level: number = 1;
  maxLevel: number = 3;

  constructor(type: BuildingType, level = 1, maxLevel = 3) {
    this.type = type;
    this.level = level;
    this.maxLevel = maxLevel;
  }

  upgrade() {
    if (this.level < this.maxLevel) {
      this.level++;
    }
  }
}
