import { Avatar } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { FC } from "react";
import Header from "./components/header";
import { useTheme } from "./context/theme-context";
import { Chat } from "./schema";
import { getFormattedTimeDifference } from "./utils/time";

type IChatsProps = {
  onSelect?: (chatId: string) => void;
  onSend?: () => void;
  onBack?: () => void;
  isLoading?: boolean;
  chats: Chat[];
};

const Chats: FC<IChatsProps> = ({
  onSelect,
  onSend,
  isLoading,
  chats,
  onBack,
}) => {
  const { i18n, config } = useTheme();
  return (
    <main
      className="grid h-full grid-rows-[auto_1fr_auto] rounded-3xl"
      style={{
        background: config.chatWindow.backgroundColor,
      }}
    >
      <Header onBack={onBack}>
        <p className="text-center text-xl font-medium">
          {i18n("multiChatTitle")}
        </p>
      </Header>
      <div
        className="-mt-6 flex flex-col gap-2 overflow-auto rounded-t-3xl px-4 py-4 text-sm"
        style={{
          background: config.backgroundColor,
        }}
      >
        {chats.map(({ assignee, _id, lastMessageInfo, unreadCount = 0 }) => {
          const message = lastMessageInfo?.message;
          const formattedTime = lastMessageInfo?.activityTimestamp
            ? getFormattedTimeDifference(
                new Date(lastMessageInfo?.activityTimestamp)
              )
            : "Unknow";

          return (
            <button
              key={_id}
              onClick={() => onSelect?.(_id)}
              className="grid w-full grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-2 rounded-2xl border px-3 py-4 text-start"
            >
              <div className="row-span-2">
                <Avatar>{assignee?.name}</Avatar>
              </div>
              <div className="flex">
                <p
                  className={cn(
                    "line-clamp-1 flex-1 text-sm",
                    unreadCount ? "font-medium" : "font-normal"
                  )}
                >
                  {message}
                </p>
                {(unreadCount || 0) > 0 && (
                  <p className="bg-primary text-primary-foreground grid h-4 w-4 place-items-center rounded-full text-[10px] leading-none">
                    {unreadCount}
                  </p>
                )}
              </div>
              <div className="row-span-2"></div>
              <p
                className={cn(
                  "line-clamp-1 flex gap-0.5 text-xs",
                  unreadCount ? "text-foreground/80" : "text-foreground/60"
                )}
              >
                <span>{assignee?.name}</span>
                <span>|</span>
                <span>{formattedTime}</span>
              </p>
            </button>
          );
        })}
      </div>
      <Button
        onClick={onSend}
        className="mx-4 my-2 rounded-lg py-5"
        loading={isLoading}
        style={{
          color: config.multiChat.submitButton.textColor,
          background: config.multiChat.submitButton.backgroundColor,
        }}
      >
        {i18n("multiChatButton")}
      </Button>
    </main>
  );
};

export default Chats;
