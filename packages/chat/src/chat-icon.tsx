import { cn } from "@repo/ui/lib/utils";
import { FC } from "react";
import { useTheme } from "./context/theme-context";

type IChatIconProps = { isOpen: boolean; onClick?: () => void };

const ChatIcon: FC<IChatIconProps> = ({ isOpen, onClick }) => {
  const { config } = useTheme();

  const curr = isOpen ? config.chatIcon.minimized : config.chatIcon.minimized;

  return (
    <button
      className={cn(
        "bg-primary grid h-14 w-14 place-items-center rounded-full",
        config.chatIcon.position === "LEFT" ? "mr-auto" : "ml-auto"
      )}
      onClick={onClick}
      // style={{
      //   background: config.primaryColor,
      //   color: config.textColor,
      // }}
    >
      <img src={curr.icon} height={36} width={36} />
    </button>
  );
};

export default ChatIcon;
