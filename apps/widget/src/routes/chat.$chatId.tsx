import Messages from "@repo/chat/messages";
import { Message } from "@repo/chat/schema";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useWidget } from "@widget-context/widget-context";
import { queryClient } from "@widget-provider/react-query";
import { chatListQuery, messagesQuery } from "@widget-quries/chat.query";
import { ChatService, SendRequest } from "@widget-service/chat.service";
import { produce } from "immer";

export const Route = createFileRoute("/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { token } = useWidget();
  const { data: chatList } = useQuery({
    ...chatListQuery,
    enabled: Boolean(token),
  });
  const customer = chatList?.customer;

  const { chatId } = Route.useParams();
  const query = messagesQuery(chatId, customer?._id!);
  const { data } = useInfiniteQuery(query);

  const { mutate } = useMutation({
    onMutate(variables) {
      if (!customer) return null;
      const key = Math.random() + "";
      const activity: Message = {
        _id: key,
        chatId: chatId,
        customer: {
          emailId: customer.emailId,
          name: customer.name,
        },
        from: {
          customerId: customer._id,
          type: "CUSTOMER",
        },
        messageData: variables,
        status: "PENDING",
        timestamp: new Date().toString(),
        type: "MESSAGE",
      };
      queryClient.setQueryData(query.queryKey, (curr) => {
        if (!curr) return;
        const update = produce(curr, (draft) => {
          const firstPage = draft.pages[0];
          if (!firstPage) {
            return;
          }
          firstPage.activities[activity._id] = activity;
        });
        return update;
      });
      return activity;
    },
    mutationFn: (body: SendRequest) => ChatService.send(chatId, body),
    onSuccess: (data, _, old) => {
      queryClient.setQueryData(query.queryKey, (curr) => {
        if (!curr) return;
        const update = produce(curr, (draft) => {
          const firstPage = draft.pages[0];
          if (!firstPage) {
            return;
          }
          if (old) {
            delete firstPage.activities[old._id];
          }
          firstPage.activities[data.activity._id] = data.activity;
        });
        return update;
      });
    },
  });

  return (
    <Messages
      assignee={data?.chat.assignee || undefined}
      chat={data?.chat || undefined}
      messages={data?.activities || []}
      onSubmit={mutate}
      onBack={() => {
        router.navigate({
          to: "/chats",
          viewTransition: true,
        });
      }}
    />
  );
}
