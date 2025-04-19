import EmptyChatIcon from "@admin-assets/svg/chat.svg";
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
        {chatId ? (
          <Outlet key={chatId} />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <img
              src={EmptyChatIcon}
              alt="Chats"
              width={200}
              height={200}
              className="mx-auto p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
