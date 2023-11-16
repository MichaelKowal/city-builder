import React from "react";
import { useTranslation } from "react-i18next";
import UIInput from "./baseComponents/input";
import GameManager from "../game/gameManager";
import UIButton from "./baseComponents/button";
import { getDefaultKeyBinds } from "../utils/keyBindUtils";
import { KeyBindings } from "../types/KeyBindings";
import { save, saveKeys } from "../utils/save";

export interface CreditsProps {
  onClose: () => void;
}

const Credits: React.FC<CreditsProps> = (props) => {
  const [keyBinds, setKeyBinds] = React.useState(GameManager.keyBinds);
  const { t } = useTranslation();

  const handleKeyBindChange = (keyBind: keyof KeyBindings, value: string) => {
    GameManager.keyBinds[keyBind] = value;
    setKeyBinds({ ...GameManager.keyBinds });
    save(GameManager.keyBinds, saveKeys.keyBindings);
  };

  const resetKeyBinds = () => {
    GameManager.keyBinds = getDefaultKeyBinds();
    setKeyBinds({ ...GameManager.keyBinds });
    save(GameManager.keyBinds, saveKeys.keyBindings);
  };

  return (
    <div id="controls" className="settings">
      {(Object.keys(keyBinds) as unknown as (keyof KeyBindings)[]).map(
        (keyBind) => (
          <div className="settings-row" key={keyBind}>
            <div>
              <p>{t(keyBind)}</p>
            </div>
            <UIInput
              value={keyBinds[keyBind]}
              onChange={(value) => handleKeyBindChange(keyBind, value)}
              label={keyBind}
              maxLength={1}
              size="sm"
            />
          </div>
        )
      )}
      <div className={"settings-row"}>
        <UIButton label="reset" onClick={() => resetKeyBinds()} hideTooltip />
        <UIButton label="back" onClick={props.onClose} hideTooltip />
      </div>
    </div>
  );
};

export default Credits;
