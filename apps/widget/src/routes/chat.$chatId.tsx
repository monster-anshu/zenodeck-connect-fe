import { defaultData } from "@repo/chat/data/messages";
import Messages from "@repo/chat/messages";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ChatService, SendRequest } from "@widget-service/chat.service";

export const Route = createFileRoute("/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { chatId } = Route.useParams();

  const { mutate } = useMutation({
    mutationFn: (body: SendRequest) => ChatService.send(chatId, body),
  });

  return (
    <Messages
      assignee={defaultData.assignee}
      chatInfo={defaultData.chatInfo}
      messages={defaultData.messages}
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
