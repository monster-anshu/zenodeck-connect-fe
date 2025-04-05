import Messages from "@repo/chat/messages";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useWidget } from "@widget-context/widget-context";
import { queryClient } from "@widget-provider/react-query";
import { chatListQuery, messagesQuery } from "@widget-quries/chat.query";
import { ChatService, SendRequest } from "@widget-service/chat.service";

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
  const query = messagesQuery(chatId);
  const { data } = useQuery(query);

  const { mutate } = useMutation({
    mutationFn: (body: SendRequest) => ChatService.send(chatId, body),
    onSuccess: (data) => {
      queryClient.setQueryData(query.queryKey, (curr) => {
        if (!curr) return;
        return { ...curr, activities: [data.activity, ...curr.activities] };
      });
    },
  });

  const sorted = data?.activities
    .sort((a, b) => {
      return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
    })
    .map((message) => {
      message.isRight = chatList.data?.customer._id === message.from.customerId;
      return message;
    });

  return (
    <Messages
      assignee={data?.chat.assignee || undefined}
      chat={data?.chat || undefined}
      messages={sorted || []}
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
