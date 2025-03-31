import ChatIcon from "@repo/chat/chat-icon";
import { useTheme } from "@repo/chat/context/theme-context";
import { cn } from "@repo/ui/lib/utils";
import { useWidget } from "@widget-context/widget-context";
import { FC } from "react";
import styles from "./chat-icon.module.css";

type IChatIconComProps = {};

const ChatIconCom: FC<IChatIconComProps> = () => {
  const { open, setValue } = useWidget();
  const { config } = useTheme();

  return (
    <div
      className={cn(
        "fixed h-fit w-fit",
        config.chatIcon.position === "LEFT"
          ? "bottom-0 right-0 mr-auto"
          : "bottom-0 right-0 ml-auto",
        styles["chat-icon"],
        open ? "hidden" : styles["open"]
      )}
    >
      <ChatIcon isOpen={open} onClick={() => setValue({ open: !open })} />
    </div>
  );
};

export default ChatIconCom;
