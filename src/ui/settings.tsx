import React from "react";
import Dialog from "./baseComponents/dialog";
import UIButton from "./baseComponents/button";
import Credits from "./credits";
import "../styles/settings.css";
import Controls from "./controls";

interface SettingsProps {
  show: boolean;
  onClose: () => void;
}

enum SettingsPanel {
  SETTINGS = "settings",
  CONTROLS = "controls",
  CREDITS = "credits",
}

const Settings: React.FC<SettingsProps> = (props) => {
  const [settingsPanel, setSettingsPanel] = React.useState<SettingsPanel>(
    SettingsPanel.SETTINGS
  );

  const handleClose = () => {
    setSettingsPanel(SettingsPanel.SETTINGS);
    props.onClose();
  };

  const renderPanel = () => {
    switch (settingsPanel) {
      case SettingsPanel.CONTROLS:
        return (
          <Controls onClose={() => setSettingsPanel(SettingsPanel.SETTINGS)} />
        );
      case SettingsPanel.CREDITS:
        return (
          <Credits onClose={() => setSettingsPanel(SettingsPanel.SETTINGS)} />
        );
    }
    return renderSettings();
  };

  const renderSettings = () => {
    return (
      <div className="settings">
        <div className="settings-row centered">
          <UIButton
            label="show-controls"
            onClick={() => setSettingsPanel(SettingsPanel.CONTROLS)}
            hideTooltip
          />
        </div>
        <div className="settings-row centered">
          <UIButton
            label="show-credits"
            onClick={() => setSettingsPanel(SettingsPanel.CREDITS)}
            hideTooltip
          />
        </div>
      </div>
    );
  };

  return (
    <Dialog show={props.show} onClose={handleClose} title={settingsPanel}>
      {renderPanel()}
    </Dialog>
  );
};

export default Settings;
