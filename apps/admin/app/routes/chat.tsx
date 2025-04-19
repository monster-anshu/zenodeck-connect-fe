import EmptyChatIcon from "@admin-assets/svg/chat.svg";
import ChatSidebar from "@admin-components/chat/ChatSidebar";
import ChatSocketProvider from "@admin-components/chat/ChatSocketProvider";
import { FC } from "react";
import { Outlet, useParams } from "react-router";

type IChatPageProps = {};

const ChatPage: FC<IChatPageProps> = () => {
  const { chatId } = useParams();

  return (
    <div className="grid h-full grid-cols-[300px_1fr]">
      <ChatSocketProvider />
      <ChatSidebar />
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
