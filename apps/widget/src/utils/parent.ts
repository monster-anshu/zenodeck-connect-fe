import React from "react";

export type ChildrenEvent = {
  clientId: string;
  domain: string;
  height: number;
  open: boolean;
  token: string | null;
  width: number;
  url: string;
  to: "ZENODECK_CONNECT";
};

export type ParentEvent = {
  style?: React.CSSProperties;
  token?: string;
  open?: boolean;
  type?: "init";
};

export const sendToParent = (event: ParentEvent) => {
  if (window.parent !== window)
    window.parent.postMessage({ connect: event }, "*");
};
