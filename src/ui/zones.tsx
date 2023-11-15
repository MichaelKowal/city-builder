import React from "react";
import { useTranslation } from "react-i18next";
import { FaEraser } from "react-icons/fa";
import { primaryPalette } from "../utils/color";
import { Tool } from "../utils/tools";
import UIButton from "./baseComponents/button";

export interface ZonesProps {
  isButtonActive: (tool: Tool) => boolean;
  handleActivateTool: (tool: Tool) => void;
}

const Zones: React.FC<ZonesProps> = (props) => {
  const { isButtonActive, handleActivateTool } = props;
  const { t } = useTranslation();
  return (
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
  );
};

export default Zones;
