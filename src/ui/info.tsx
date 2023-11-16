import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Info } from "../types/Info";
import { InfoEventArgs, subscribe } from "../events/Event";

const InfoPanel: React.FC = () => {
  const [info, setInfo] = useState<Info>();
  const { t } = useTranslation();

  useEffect(() => {
    const infoEventHandler = (event: InfoEventArgs) => {
      setInfo(event.args);
    };
    const unsubscribe = subscribe("info", infoEventHandler);

    return () => {
      unsubscribe();
    };
  });

  return (
    <div className="ui-section start">
      <div className="ui-section-title">
        <p>{t("info")}</p>
      </div>
      <div className="ui-section-content">
        <p>{t(JSON.stringify(info))}</p>
      </div>
    </div>
  );
};

export default InfoPanel;
