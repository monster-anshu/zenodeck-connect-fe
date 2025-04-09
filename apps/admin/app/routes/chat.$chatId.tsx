import ChatHeader from "@admin-components/chat/ChatHeader";
import ChatInput from "@admin-components/chat/ChatInput";
import MessageItem from "@admin-components/chat/MessageItem";
import { agentInfoQuery } from "@admin-queries/agent.query";
import { messagesQuery } from "@admin-queries/chat.query";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router";

type IMessagePageProps = {};

const array = Array.from({ length: 10 });

const MessagePage: FC<IMessagePageProps> = () => {
  const agentQuery = useQuery({ ...agentInfoQuery, refetchOnMount: false });
  const params = useParams();
  const chatId = params.chatId!;

  const query = messagesQuery(chatId, agentQuery.data?.agentInfo?.userId!);
  const { data, isSuccess } = useInfiniteQuery(query);

  if (!isSuccess) {
    return (
      <div className="grid h-dvh grid-rows-[auto_1fr_auto] overflow-hidden">
        <div className="bg-background grid h-14 grid-cols-[auto_1fr] items-center gap-2 border-b px-4 text-sm">
          <Skeleton className="h-[34px] w-[34px] rounded-full" />
          <div className="space-y-0.5">
            <Skeleton className="h-4 w-40 rounded-sm" />
            <Skeleton className="h-[10px] w-20 rounded-sm" />
          </div>
        </div>
        <div className="flex flex-col-reverse gap-1 overflow-auto px-2 py-2">
          {array.map((_, i) => {
            return (
              <Skeleton
                className={cn(
                  "w-full max-w-[50%]",
                  !(i % 4) ? "mr-auto" : "ml-auto"
                )}
                key={i}
                style={{
                  minHeight: 60,
                  "--blink-color": "white",
                }}
              />
            );
          })}
        </div>
        <Skeleton
          className="mx-2 my-2 h-32 rounded-lg py-2 shadow"
          style={{
            "--blink-color": "white",
          }}
        />
      </div>
    );
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
