import React, { useState } from "react";
import Game from "../game/game";
import "../styles/ui.css";
import { Tool } from "../utils/tools";
import Meta from "./meta";
import Tools from "./tools";
import Zones from "./zones";

const UI: React.FC = () => {
  const [currentTool, setCurrentTool] = useState(Game.activeTool);

  const isButtonActive = (label: Tool) => {
    return currentTool === label;
  };

  const handleActivateTool = (tool: Tool) => {
    if (currentTool === tool) {
      Game.activeTool = Tool.None;
      setCurrentTool(Tool.None);
    } else {
      Game.activeTool = tool;
      setCurrentTool(tool);
    }
  };

  /** Prevent events from bubbling up from the UI. and causing click events to happen to the game. */
  const handleUIPanelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div id="ui-root" onMouseDown={handleUIPanelClick}>
      <Zones
        handleActivateTool={handleActivateTool}
        isButtonActive={isButtonActive}
      />
      <Tools
        handleActivateTool={handleActivateTool}
        isButtonActive={isButtonActive}
      />
      <Meta setCurrentTool={setCurrentTool} />
    </div>
  );
};

export default UI;
