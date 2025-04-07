import { ChatService } from "@admin-services/chat.service";
import { Chat } from "@repo/chat/schema";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const chatListQuery = queryOptions({
  queryKey: ["chats"],
  queryFn: ChatService.list,
});

export const messagesQuery = (chatId: string, userId: string) =>
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
          return { ...message, isRight: userId === message.from.userId };
        });

      return { activities, chat: chat! };
    },
  });
