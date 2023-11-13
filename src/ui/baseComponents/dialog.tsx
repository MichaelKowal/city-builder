import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { FaWindowClose } from "react-icons/fa";
import "../../styles/dialog.css";
import UIButton from "./button";

interface DialogProps {
  title: string;
  show: boolean;
  onClose: () => void;
}

const Dialog: React.FC<PropsWithChildren<DialogProps>> = (props) => {
  const { t } = useTranslation();

  /** Prevent events from bubbling up from the UI. and causing click events to happen to the game. */
  const handleUIPanelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  if (!props.show) {
    return null;
  }
  return (
    <div className="dialog" onMouseDown={handleUIPanelClick}>
      <div className="dialog-overlay" />
      <div className="dialog-panel">
        <div className="dialog-header">
          <div className="dialog-title">{t(props.title)}</div>
          <UIButton
            label="close-dialog"
            onClick={props.onClose}
            hideLabel
            icon={<FaWindowClose size={"2rem"} />}
          />
        </div>
        <div className="dialog-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Dialog;
