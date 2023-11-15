import React from "react";
import { useTranslation } from "react-i18next";
import UIInput from "./baseComponents/input";
import Game from "../game/game";
import UIButton from "./baseComponents/button";
import { getDefaultKeyBinds } from "../utils/keyBindUtils";
import { KeyBindings } from "../types/KeyBindings";
import { save, saveKeys } from "../utils/save";

export interface CreditsProps {
  onClose: () => void;
}

const Credits: React.FC<CreditsProps> = (props) => {
  const [keyBinds, setKeyBinds] = React.useState(Game.keyBinds);
  const { t } = useTranslation();

  const handleKeyBindChange = (keyBind: keyof KeyBindings, value: string) => {
    Game.keyBinds[keyBind] = value;
    setKeyBinds({ ...Game.keyBinds });
    save(Game.keyBinds, saveKeys.keyBindings);
  };

  const resetKeyBinds = () => {
    Game.keyBinds = getDefaultKeyBinds();
    setKeyBinds({ ...Game.keyBinds });
    save(Game.keyBinds, saveKeys.keyBindings);
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
