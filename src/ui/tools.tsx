import React from "react";
import { useTranslation } from "react-i18next";
import { FaRoad } from "react-icons/fa";
import { TbBulldozer } from "react-icons/tb";
import { Tool } from "../utils/tools";
import UIButton from "./baseComponents/button";

export interface ToolsProps {
  isButtonActive: (tool: Tool) => boolean;
  handleActivateTool: (tool: Tool) => void;
}

const Tools: React.FC<ToolsProps> = (props) => {
  const { isButtonActive, handleActivateTool } = props;
  const { t } = useTranslation();
  return (
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
  );
};

export default Tools;
