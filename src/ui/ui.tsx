import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEraser, FaRoad } from "react-icons/fa";
import { TbBulldozer, TbSettings } from "react-icons/tb";
import "../styles/ui.css";
import { primaryPalette } from "../utils/color";
import UIButton from "./baseComponents/button";
import Settings from "./settings";
import Game from "../game/game";
import { Tool } from "../utils/tools";

const UI: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [currentTool, setCurrentTool] = useState(Game.activeTool);
  const { t } = useTranslation();

  const handleOpenSettings = () => {
    setShowSettings(true);
    Game.pause();
  };

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
    <>
      <div id="ui-root" onMouseDown={handleUIPanelClick}>
        <div className="ui-section">
          <div className="ui-section-title">
            <p>{t("zones")}</p>
          </div>
          <div className="ui-row">
            <UIButton
              isActive={isButtonActive(Tool.ZoneErase)}
              onClick={() => handleActivateTool(Tool.ZoneErase)}
              label={Tool.ZoneErase}
              hideLabel
              icon={<FaEraser size={"2rem"} />}
              toggle
            />
            <UIButton
              isActive={isButtonActive(Tool.Residential)}
              onClick={() => handleActivateTool(Tool.Residential)}
              label={Tool.Residential}
              fillColor={primaryPalette.dragonScale}
              hideLabel
              toggle
            />
            <UIButton
              isActive={isButtonActive(Tool.Commercial)}
              onClick={() => handleActivateTool(Tool.Commercial)}
              label={Tool.Commercial}
              hideLabel
              fillColor={primaryPalette.melon}
              toggle
            />
            <UIButton
              isActive={isButtonActive(Tool.Industrial)}
              onClick={() => handleActivateTool(Tool.Industrial)}
              label={Tool.Industrial}
              hideLabel
              fillColor={primaryPalette.tombBlue}
              toggle
            />
          </div>
        </div>
        <div className="ui-section">
          <div className="ui-section-title">
            <p>{t("tools")}</p>
          </div>
          <div className="ui-row">
            <UIButton
              isActive={isButtonActive(Tool.Road)}
              onClick={() => handleActivateTool(Tool.Road)}
              label={Tool.Road}
              icon={<FaRoad size={"2rem"} />}
              hideLabel
              toggle
            />
            <UIButton
              isActive={isButtonActive(Tool.Destroy)}
              onClick={() => handleActivateTool(Tool.Destroy)}
              label={Tool.Destroy}
              icon={<TbBulldozer size={"2rem"} />}
              hideLabel
              toggle
            />
          </div>
        </div>
        <div className="ui-section ui-end">
          <div className="ui-section-title">
            <p>{Game.cityName}</p>
          </div>
          <div className="ui-row">
            <UIButton
              icon={<TbSettings size={"2rem"} />}
              onClick={handleOpenSettings}
              label="settings"
              hideLabel
            />
          </div>
        </div>
      </div>
      <Settings show={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
};

export default UI;
