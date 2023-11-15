import React, { useEffect, useState } from "react";
import { BsFillPauseBtnFill, BsFillPlayBtnFill } from "react-icons/bs";
import {
  PiCellSignalFullFill,
  PiCellSignalLowFill,
  PiCellSignalMediumFill,
} from "react-icons/pi";
import { TbSettings } from "react-icons/tb";
import Game from "../game/game";
import { Tool } from "../utils/tools";
import UIButton from "./baseComponents/button";
import Settings from "./settings";

export interface MetaProps {
  setCurrentTool: (tool: Tool) => void;
}

const Meta: React.FC<MetaProps> = (props) => {
  const [showSettings, setShowSettings] = useState(false);
  const { setCurrentTool } = props;
  const [paused, setPaused] = useState(Game.isPaused);
  const [gameSpeed, setGameSpeed] = useState(Game.getSpeed());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        Game.activeTool = Tool.None;
        setCurrentTool(Tool.None);
      }
      if (e.key === Game.keyBinds.pause && e.shiftKey === false) {
        togglePause();
      }
      if (e.key === Game.keyBinds.pause && e.shiftKey === true) {
        handleSpeedChange();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleSpeedChange = () => {
    Game.nextSpeed();
    setGameSpeed(Game.getSpeed());
  };

  const togglePause = () => {
    if (Game.isPaused) {
      Game.play();
    } else {
      Game.pause();
    }
    setPaused(Game.isPaused);
  };

  const getGameSpeedIcon = () => {
    switch (gameSpeed) {
      case 0:
        return <PiCellSignalLowFill size={"2rem"} />;
      case 1:
        return <PiCellSignalMediumFill size={"2rem"} />;
      default:
        return <PiCellSignalFullFill size={"2rem"} />;
    }
  };

  const getPauseButtonIcon = () => {
    if (paused) {
      return <BsFillPauseBtnFill size={"2rem"} />;
    } else {
      return <BsFillPlayBtnFill size={"2rem"} />;
    }
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
    Game.pause();
    setPaused(true);
  };
  return (
    <>
      <div className="ui-section ui-end">
        <div className="ui-section-title">
          <p>{Game.cityName}</p>
        </div>
        <div className="ui-row">
          <UIButton
            icon={getGameSpeedIcon()}
            onClick={handleSpeedChange}
            label={"speed"}
            hideTooltip
            hideLabel
          />
          <UIButton
            icon={getPauseButtonIcon()}
            onClick={togglePause}
            label={paused ? "play" : "pause"}
            hideLabel
            hideTooltip
          />
          <UIButton
            icon={<TbSettings size={"2rem"} />}
            onClick={handleOpenSettings}
            label="settings"
            hideLabel
            hideTooltip
          />
        </div>
      </div>
      <Settings show={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
};

export default Meta;
