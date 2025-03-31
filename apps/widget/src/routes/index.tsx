import Home from "@repo/chat/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="h-dvh text-center">
      <Home />
    </div>
  );
}
