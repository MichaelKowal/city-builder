import React from "react";
import Dialog from "./baseComponents/dialog";
import UIButton from "./baseComponents/button";
import Credits from "./credits";
import "../styles/settings.css";

interface SettingsProps {
  show: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = (props) => {
  const [showCredits, setShowCredits] = React.useState(false);

  const getTitle = () => {
    if (showCredits) {
      return "credits";
    }
    return "settings";
  };

  const handleClose = () => {
    setShowCredits(false);
    props.onClose();
  };

  const renderSettings = () => {
    return (
      <div className="settings">
        <div className="settings-row">
          <UIButton
            label="show-credits"
            onClick={() => setShowCredits(true)}
            hideTooltip
          />
        </div>
      </div>
    );
  };

  return (
    <Dialog show={props.show} onClose={handleClose} title={getTitle()}>
      {showCredits ? (
        <Credits show={showCredits} onClose={() => setShowCredits(false)} />
      ) : (
        renderSettings()
      )}
    </Dialog>
  );
};

export default Settings;
