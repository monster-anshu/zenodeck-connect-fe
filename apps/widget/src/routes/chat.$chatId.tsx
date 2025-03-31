import Messages from "@repo/chat/messages";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <div className="h-dvh">
      <Messages
        onBack={() => {
          router.navigate({
            to: "/chats",
            viewTransition: true,
          });
        }}
      />
    </div>
  );
}
