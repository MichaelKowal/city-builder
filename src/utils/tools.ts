import Game from "../game/game";
import Tile from "../game/tile";
import { ZoneType } from "../types/ZoneTypes";

export enum Tool {
  Residential = "residential",
  Commercial = "commercial",
  Industrial = "industrial",
  ZoneErase = "zone-erase",
  Road = "road",
  Destroy = "destroy",
  None = "none",
}

export const handleTool = (tile: Tile) => {
  switch (Game.activeTool) {
    case Tool.Residential:
      tile.changeZone(ZoneType.Residential);
      break;
    case Tool.Commercial:
      tile.changeZone(ZoneType.Commercial);
      break;
    case Tool.Industrial:
      tile.changeZone(ZoneType.Industrial);
      break;
    case Tool.Road:
      tile.createRoad();
      break;
    case Tool.Destroy:
      tile.destroyAsset();
      break;
    case Tool.ZoneErase:
      tile.changeZone(ZoneType.None);
      break;
  }
};
