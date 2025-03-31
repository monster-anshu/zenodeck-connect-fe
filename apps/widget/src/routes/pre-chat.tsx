import PreChat from "@repo/chat/pre-chat";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/pre-chat")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  return (
    <div className="h-dvh">
      <PreChat
        onSubmit={() =>
          router.navigate({
            to: "/chat/$chatId",
            params: { chatId: "asda" },
            viewTransition: true,
          })
        }
      />
    </div>
  );
}
