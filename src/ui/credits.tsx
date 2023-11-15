import React from "react";
import UIButton from "./baseComponents/button";
import { useTranslation } from "react-i18next";

export interface CreditsProps {
  onClose: () => void;
}

const Credits: React.FC<CreditsProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div id="credits" className="settings">
      <div className="settings-row">
        <p>{t("game-credit", { name: "Michael Kowal" })}</p>
      </div>
      <div className="settings-row">
        <a
          rel="noreferrer"
          target="_blank"
          id="icon-credit"
          href="https://www.freepik.com/icon/buildings_2055483#fromView=search&term=cartoon+building&page=1&position=6&track=ais"
        >
          {t("icon-credit")}
        </a>
      </div>
      <div className="settings-row">
        <p>{t("tutorial-credit")}</p>
        <a
          rel="noreferrer"
          href="https://www.youtube.com/playlist?list=PLtzt35QOXmkJ9unmoeA5gXHcscQHJVQpW"
          target="_blank"
        >
          {t("open-in-youtube")}
        </a>
      </div>
      <div className="settings-row">
        <p>{t("special-thanks")}</p>
      </div>
      <div className={"settings-row"}>
        <UIButton label="back" onClick={props.onClose} hideTooltip />
      </div>
    </div>
  );
};

export default Credits;
