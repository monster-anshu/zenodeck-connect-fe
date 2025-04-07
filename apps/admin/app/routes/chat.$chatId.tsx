import ChatHeader from "@admin-components/chat/ChatHeader";
import ChatInput from "@admin-components/chat/ChatInput";
import MessageItem from "@admin-components/chat/MessageItem";
import { agentInfoQuery } from "@admin-queries/agent.query";
import { messagesQuery } from "@admin-queries/chat.query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router";

type IMessagePageProps = {};

const MessagePage: FC<IMessagePageProps> = () => {
  const agentQuery = useQuery({ ...agentInfoQuery, refetchOnMount: false });
  const params = useParams();
  const chatId = params.chatId!;

  const query = messagesQuery(chatId, agentQuery.data?.agentInfo?.userId!);
  const { data, isSuccess } = useInfiniteQuery(query);

  if (!isSuccess) {
    return "Loading";
  }

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto] overflow-hidden">
      <ChatHeader chat={data.chat} />
      <div className="flex flex-col-reverse gap-1 overflow-auto py-2">
        {data.activities.map((message) => {
          return <MessageItem message={message} key={message._id} />;
        })}
      </div>
      <ChatInput chatId={chatId} userId={agentQuery.data?.agentInfo?.userId!} />
    </div>
  );
};

export default MessagePage;
