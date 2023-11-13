import React from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "./tooltip";

export interface UIButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  hideLabel?: boolean;
  tooltipAltText?: string;
  hideTooltip?: boolean;
  icon?: React.ReactNode;
  fillColor?: string;
  toggle?: boolean;
  isActive?: boolean;
}

const UIButton: React.FC<UIButtonProps> = (props) => {
  const { t } = useTranslation();

  const handleClick = () => {
    props.onClick();
  };

  return (
    <div className="button-root">
      <Tooltip
        text={
          !props.hideTooltip
            ? t(props.tooltipAltText ?? props.label)
            : undefined
        }
      >
        <button
          className={"ui-button" + (props.isActive ? " active" : "")}
          onClick={handleClick}
          id={`button-${props.label}`}
          disabled={props.disabled}
          style={{ backgroundColor: props.fillColor }}
        >
          {!!props.icon && <div className="ui-button-icon">{props.icon}</div>}
          {!props.hideLabel && (
            <div className="ui-button-label">{t(props.label)}</div>
          )}
        </button>
      </Tooltip>
    </div>
  );
};

export default UIButton;
