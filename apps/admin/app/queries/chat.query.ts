import { ChatService } from "@admin-services/chat.service";
import { queryOptions } from "@tanstack/react-query";

export const chatListQuery = queryOptions({
  queryKey: ["chats"],
  queryFn: ChatService.list,
});

export const messagesQuery = (chatId: string) =>
  queryOptions({
    queryKey: ["messages", chatId],
    queryFn: () => ChatService.messages(chatId),
  });
