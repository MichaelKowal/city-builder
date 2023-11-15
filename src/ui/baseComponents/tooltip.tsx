import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/tooltip.css";

export interface TooltipProps {
  text?: string;
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = (props) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { t } = useTranslation();

  const handleMouseEnter = () => {
    if (!props.text) {
      return;
    }
    setShowTooltip(true);
  };

  const handleMouseExit = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="tooltip-anchor"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
    >
      {showTooltip && (
        <div className="tooltip">
          <p>{t(props.text!)}</p>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default Tooltip;
