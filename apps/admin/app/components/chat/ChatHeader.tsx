import { Chat } from "@repo/chat/schema";
import { Avatar } from "@repo/ui/components/avatar";
import React, { FC } from "react";

type IChatHeaderProps = {
  chat: Chat;
};

const ChatHeader: FC<IChatHeaderProps> = ({ chat }) => {
  return (
    <div className="bg-background grid h-14 grid-cols-[auto_1fr] items-center gap-2 border-b px-4 text-sm">
      <Avatar profilePic={chat.assignee?.profilePic}>
        {chat.customer?.name}
      </Avatar>
      <div>
        <p className="leading-none"> {chat.customer?.name}</p>
        <p className="text-[10px] capitalize">
          {chat.customer?.onlineStatus?.toLowerCase()}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
