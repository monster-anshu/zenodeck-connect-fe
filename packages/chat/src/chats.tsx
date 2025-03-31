import { Avatar } from "@repo/ui/components/avatar";
import React, { FC } from "react";
import Header from "./components/header";
import { useTheme } from "./context/theme-context";

import data from "./data/chats";
import { getFormattedTimeDifference } from "./utils/time";

type IChatsProps = {};

const Chats: FC<IChatsProps> = () => {
  const { i18n } = useTheme();
  return (
    <main className="grid h-full grid-rows-[auto_1fr] rounded-2xl border">
      <Header>
        <p className="text-center text-xl font-medium">{i18n("chatsTitle")}</p>
      </Header>
      <div className="flex flex-col gap-3 overflow-auto px-4 pb-4">
        {data.map(({ assignee, _id, messages, lastMessageInfo }) => {
          const message = messages[0]?.messageData;
          const formattedTime = lastMessageInfo?.msgTimestamp
            ? getFormattedTimeDifference(new Date(lastMessageInfo.msgTimestamp))
            : "Unknow";

          return (
            <button
              key={_id}
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
    </main>
  );
};

export default Chats;
