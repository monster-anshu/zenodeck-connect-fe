import { queryOptions } from "@tanstack/react-query";
import { ChatService } from "@widget-service/chat.service";

export const chatListQuery = queryOptions({
  queryKey: ["chats"],
  queryFn: ChatService.list,
});

export const messagesQuery = (chatId: string) =>
  queryOptions({
    queryKey: ["messages", chatId],
    queryFn: () => ChatService.messages(chatId),
  });
