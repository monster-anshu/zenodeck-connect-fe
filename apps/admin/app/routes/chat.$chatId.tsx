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
  const { data } = useQuery(query);

  const sorted = data?.activities
    .sort((a, b) => {
      return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
    })
    .map((message) => {
      message.isRight =
        agentQuery.data?.agentInfo?._id === message.from.customerId;
      return message;
    });

  return (
    <div className="grid h-dvh grid-rows-[1fr_auto] overflow-hidden">
      <div className="flex flex-col-reverse gap-1 overflow-auto py-2">
        {sorted?.map((message) => {
          return <MessageItem message={message} key={message._id} />;
        })}
      </div>
      <div></div>
    </div>
  );
};

export default MessagePage;
