import { Avatar } from "@repo/ui/components/avatar";
import React, { FC } from "react";
import Header from "./components/header";
import { useTheme } from "./context/theme-context";

import { Button } from "@repo/ui/components/button";
import data from "./data/chats";
import { getFormattedTimeDifference } from "./utils/time";

type IChatsProps = {
  onSelect: (chatId: string) => void;
  onSend: () => void;
};

const Chats: FC<IChatsProps> = ({ onSelect, onSend }) => {
  const { i18n, config } = useTheme();
  return (
    <main className="grid h-full grid-rows-[auto_1fr_auto] rounded-2xl border pb-4">
      <Header>
        <p className="text-center text-xl font-medium">
          {i18n("multiChatTitle")}
        </p>
      </Header>
      <div className="mb-2 flex flex-col gap-3 overflow-auto px-4">
        {data.map(({ assignee, _id, messages, lastMessageInfo }) => {
          const message = messages[0]?.messageData;
          const formattedTime = lastMessageInfo?.msgTimestamp
            ? getFormattedTimeDifference(new Date(lastMessageInfo.msgTimestamp))
            : "Unknow";

          return (
            <button
              key={_id}
              onClick={() => onSelect(_id)}
              className="grid w-full grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-2 rounded-2xl border px-3 py-4 text-start"
            >
              <div className="row-span-2">
                <Avatar>{assignee?.name}</Avatar>
              </div>
              <p className="line-clamp-1 text-sm font-medium">
                {message?.message}
              </p>
              <div className="row-span-2"></div>
              <p className="text-foreground/60 line-clamp-1 flex gap-0.5 text-xs">
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
        className="mx-4 rounded-lg py-5"
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
