import Chats from "@repo/chat/chats";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/chats")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <Chats
      onSend={() => {
        router.navigate({
          to: "/pre-chat",
          viewTransition: true,
        });
      }}
      onSelect={(chatId) => {
        router.navigate({
          to: "/chat/$chatId",
          params: { chatId: chatId },
          viewTransition: true,
        });
      }}
    />
  );
}
