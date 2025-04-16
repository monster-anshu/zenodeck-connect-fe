import Faqs from "@repo/chat/faqs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Faqs />;
}
