import Messages from "@repo/chat/messages";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useWidget } from "@widget-context/widget-context";
import { queryClient } from "@widget-provider/react-query";
import { chatListQuery, messagesQuery } from "@widget-quries/chat.query";
import { ChatService, SendRequest } from "@widget-service/chat.service";
import { produce } from "immer";

export const Route = createFileRoute("/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { token } = useWidget();
  const chatList = useQuery({
    ...chatListQuery,
    enabled: Boolean(token),
    refetchOnMount: false,
  });

  const { chatId } = Route.useParams();
  const query = messagesQuery(chatId, chatList.data?.customer._id!);
  const { data } = useInfiniteQuery(query);

  const { mutate } = useMutation({
    mutationFn: (body: SendRequest) => ChatService.send(chatId, body),
    onSuccess: (data) => {
      queryClient.setQueryData(query.queryKey, (curr) => {
        if (!curr) return;
        const update = produce(curr, (draft) => {
          const firstPage = draft.pages[0];
          if (!firstPage) {
            return;
          }
          firstPage.activities[data.activity._id] = data.activity;
        });
        return update;
      });
    },
  });

  return (
    <Messages
      assignee={data?.chat.assignee || undefined}
      chat={data?.chat || undefined}
      messages={data?.activities || []}
      onSubmit={mutate}
      onBack={() => {
        router.navigate({
          to: "/chats",
          viewTransition: true,
        });
      }}
    />
  );
}
