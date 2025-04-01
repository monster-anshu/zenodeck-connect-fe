import { useWidget } from "@widget-context/widget-context";
import { sendToParent } from "@widget-utils/parent";
import React, { useEffect } from "react";

export const useSyncParent = () => {
  const { open } = useWidget();

  useEffect(() => {
    const style: React.CSSProperties = open
      ? {
          width: "384px",
          height: "530px",
        }
      : {
          width: "56px",
          height: "56px",
        };

    sendToParent({ style });
  }, [open]);
};
