import { chatListQuery } from "@admin-queries/chat.query";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import ChatItem from "./ChatItem";

type IChatSidebarProps = {};

const Loader = Array.from({ length: 8 }).map((_, i) => {
  return <Skeleton className="h-[72px]" key={i} />;
});

const ChatSidebar: FC<IChatSidebarProps> = () => {
  const { data, isLoading } = useQuery(chatListQuery);
  return (
    <div className="space-y-0.5 overflow-auto border-r px-1 py-1">
      {isLoading && Loader}
      {data?.chats.map((chat) => {
        return <ChatItem chat={chat} key={chat._id} />;
      })}
    </div>
  );
};

export default ChatSidebar;
