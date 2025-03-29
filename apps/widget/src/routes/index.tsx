import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="text-center">
      <h1>hello</h1>
      <Button>Click me</Button>
    </div>
  );
}
