import Home from "@repo/chat/home";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const router = useRouter();

  return (
    <Home
      onSendMessage={() =>
        router.navigate({
          to: "/pre-chat",
          viewTransition: true,
        })
      }
    />
  );
}
