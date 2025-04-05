import Chats from "@repo/chat/chats";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useWidget } from "@widget-context/widget-context";
import { chatListQuery } from "@widget-quries/chat.query";
import { WebsiteService } from "@widget-service/website.service";

export const Route = createFileRoute("/chats")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { token, setValue, clientId } = useWidget();
  const { data } = useQuery({ ...chatListQuery, enabled: Boolean(token) });

  const { mutate, isPending } = useMutation({
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

  return (
    <Chats
      chats={data?.chats || []}
      onSend={() => {
        if (data?.customer) {
          mutate({});
          return;
        }
        router.navigate({
          to: "/pre-chat",
          viewTransition: true,
        });
      }}
      onBack={() => {
        router.navigate({
          to: "/",
          viewTransition: true,
        });
      }}
      isLoading={isPending}
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
