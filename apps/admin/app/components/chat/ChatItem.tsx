import { Chat } from "@repo/chat/schema";
import { getFormattedTimeDifference } from "@repo/chat/utils/time";
import { Avatar } from "@repo/ui/components/avatar";
import React, { FC } from "react";
import { Link } from "react-router";

type IChatItemProps = {
  chat: Chat;
};

const ChatItem: FC<IChatItemProps> = ({ chat }) => {
  const { assignee, lastMessageInfo } = chat;
  const message = lastMessageInfo?.message;
  const formattedTime = lastMessageInfo?.activityTimestamp
    ? getFormattedTimeDifference(new Date(lastMessageInfo?.activityTimestamp))
    : "Unknow";
  return (
    <Link
      to={`/chat/${chat._id}`}
      className="hover:bg-secondary/90 grid w-full grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-2 rounded-lg px-3 py-4 text-start"
    >
      <div className="row-span-2">
        <Avatar>{assignee?.name}</Avatar>
      </div>
      <p className="line-clamp-1 text-sm font-medium">{message}</p>
      <div className="row-span-2"></div>
      <p className="text-foreground/60 line-clamp-1 flex gap-0.5 text-xs">
        <span>{assignee?.name}</span>
        <span>|</span>
        <span>{formattedTime}</span>
      </p>
    </Link>
  );
};

export default ChatItem;
