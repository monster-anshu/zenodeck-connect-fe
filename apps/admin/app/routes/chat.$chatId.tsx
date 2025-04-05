import ChatHeader from "@admin-components/chat/ChatHeader";
import ChatInput from "@admin-components/chat/ChatInput";
import MessageItem from "@admin-components/chat/MessageItem";
import { agentInfoQuery } from "@admin-queries/agent.query";
import { messagesQuery } from "@admin-queries/chat.query";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router";

type IMessagePageProps = {};

const MessagePage: FC<IMessagePageProps> = () => {
  const agentQuery = useQuery({ ...agentInfoQuery, refetchOnMount: false });

  const { chatId } = useParams();
  const query = messagesQuery(chatId!);
  const { data, isSuccess } = useQuery(query);

  if (!isSuccess) {
    return "Loading";
  }

  const sorted = data.activities
    .sort((a, b) => {
      return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
    })
    .map((message) => {
      message.isRight =
        agentQuery.data?.agentInfo?._id === message.from.customerId;
      return message;
    });

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto] overflow-hidden">
      <ChatHeader chat={data.chat} />
      <div className="flex flex-col-reverse gap-1 overflow-auto py-2">
        {sorted?.map((message) => {
          return <MessageItem message={message} key={message._id} />;
        })}
      </div>
      <ChatInput />
    </div>
  );
};

export default MessagePage;
