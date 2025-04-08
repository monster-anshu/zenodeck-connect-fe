import { cn } from "@repo/ui/lib/utils";
import { Outlet } from "@tanstack/react-router";
import ChatIconCom from "@widget-components/chat-icon";
import ChatSocketProvider from "@widget-components/ChatSocketProvider";
import { useSyncParent } from "@widget-hooks/sync";
import { FC } from "react";
import styles from "./combined.module.scss";
import { useWidget } from "./widget-context";

type ICombindedContextProps = {};

const CombindedContext: FC<ICombindedContextProps> = () => {
  useSyncParent();

  const { open } = useWidget();

  const openClass = styles["open"];
  const closeClass = styles["close"];

  return (
    <>
      <div className="h-full overflow-hidden">
        <ChatSocketProvider />
        <div
          className="h-full pl-2 pt-2"
          style={{
            display: open ? "block" : "none",
          }}
        >
          <div
            className={cn(
              "h-full overflow-auto rounded-3xl",
              styles["container"],
              open ? openClass : closeClass,
              open ? "border" : ""
            )}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <ChatIconCom />
    </>
  );
};

export default CombindedContext;
