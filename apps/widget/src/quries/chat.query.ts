import { Chat } from "@repo/chat/schema";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { ChatService } from "@widget-service/chat.service";
import ReconnectingWebSocket from "reconnecting-websocket";

let socket: ReconnectingWebSocket;

export const chatListQuery = queryOptions({
  queryKey: ["chats"],
  queryFn: async () => {
    const res = await ChatService.list();
    socket =
      socket ||
      new ReconnectingWebSocket(res.socketUrl + "?token=" + res.authToken, [], {
        connectionTimeout: 1000 * 60,
        maxRetries: 3,
      });

    return {
      customer: res.customer,
      chats: res.chats,
      socket: socket,
    };
  },
  refetchOnMount: false,
});

export const messagesQuery = (chatId: string, customerId: string) =>
  infiniteQueryOptions({
    queryKey: ["messages", chatId],
    queryFn: () => ChatService.messages(chatId),
    getNextPageParam: () => "" as string | undefined,
    initialPageParam: undefined,
    select(data) {
      let chat: Chat | undefined;

      const activities = data.pages
        .map((page) => {
          if (page.chat) {
            chat = page.chat;
          }
          return Object.values(page.activities);
        })
        .flat()
        .sort((a, b) => {
          return (
            new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
          );
        })
        .map((message) => {
          return {
            ...message,
            isRight: customerId === message.from.customerId,
          };
        });

      return { activities, chat: chat! };
    },
  });
