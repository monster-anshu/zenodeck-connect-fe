import PreChat from "@repo/chat/pre-chat";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useWidget } from "@widget-context/widget-context";
import { WebsiteService } from "@widget-service/website.service";

export const Route = createFileRoute("/pre-chat")({
  component: RouteComponent,
});

function RouteComponent() {
  const { clientId, setValue } = useWidget();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      WebsiteService.initiate(clientId, body),
    onSuccess(res) {
      setValue({ token: res.authToken });

      router.navigate({
        to: "/chat/$chatId",
        params: { chatId: res.chat._id },
        viewTransition: true,
      });
    },
  });

  return <PreChat onSubmit={(values) => mutate(values)} />;
}
