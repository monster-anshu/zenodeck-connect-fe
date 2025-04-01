import { useTheme } from "@repo/chat/context/theme-context";
import { cn } from "@repo/ui/lib/utils";
import { Outlet } from "@tanstack/react-router";
import ChatIconCom from "@widget-components/chat-icon";
import { useSyncParent } from "@widget-hook/sync";
import { FC } from "react";
import styles from "./combined.module.scss";
import { useWidget } from "./widget-context";

type ICombindedContextProps = {};

const CombindedContext: FC<ICombindedContextProps> = () => {
  useSyncParent();

  const { open } = useWidget();
  const { config } = useTheme();

  const openClass = styles["open"];
  const closeClass = styles["close"];

  return (
    <>
      <div className="h-full overflow-hidden pl-2 pt-2">
        <div
          className={cn(
            "h-full overflow-auto rounded-3xl",
            styles["container"],
            open ? openClass : closeClass,
            open ? "border" : ""
          )}
          style={{
            display: open ? "block" : "none",
          }}
        >
          <Outlet />
        </div>
      </div>
      <ChatIconCom />
    </>
  );
};

export default CombindedContext;
