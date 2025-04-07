import ChatItem from "@admin-components/chat/ChatItem";
import ChatSocketProvider from "@admin-components/chat/ChatSocketProvider";
import { chatListQuery } from "@admin-queries/chat.query";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Outlet, useParams } from "react-router";

type IChatPageProps = {};

const ChatPage: FC<IChatPageProps> = () => {
  const { data } = useQuery(chatListQuery);
  const { chatId } = useParams();

  return (
    <div className="grid h-full grid-cols-[300px_1fr]">
      <ChatSocketProvider />
      <div className="space-y-0.5 overflow-auto border-r px-1 py-1">
        {data?.chats.map((chat) => {
          return <ChatItem chat={chat} key={chat._id} />;
        })}
      </div>
      <div className="bg-secondary">
        <Outlet key={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;
