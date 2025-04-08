import Home from "@repo/chat/home";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useWidget } from "@widget-context/widget-context";
import { chatListQuery } from "@widget-quries/chat.query";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const router = useRouter();
  const { token } = useWidget();
  const { data } = useQuery({
    ...chatListQuery,
    enabled: Boolean(token),
  });

  return (
    <Home
      onSendMessage={() => {
        if (data?.customer) {
          router.navigate({
            to: "/chats",
            viewTransition: true,
          });
          return;
        }
        router.navigate({
          to: "/pre-chat",
          viewTransition: true,
        });
      }}
    />
  );
}
