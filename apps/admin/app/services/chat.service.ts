import { Chat, Message } from "@repo/chat/schema";
import { normalize } from "@repo/ui/lib/normalize";
import { client } from "./client";

export class ChatService {
  static async list() {
    const { data } = await client.get<ListResponse>(`/chat`);

    return data;
  }

  static async send(chatId: string, body: SendRequest) {
    const { data } = await client.post<SendResponse>(`/chat/${chatId}`, body);

    return data;
  }

  static async messages(chatId: string) {
    const { data } = await client.get<MessageResponse>(`/chat/${chatId}`);

    return { ...data, activities: normalize(data.activities, "_id") };
  }
}

type ListResponse = {
  isSuccess: boolean;
  chats: Chat[];
};

type MessageResponse = {
  isSuccess: true;
  chat: Chat;
  activities: Message[];
};

export type SendRequest = {
  type: "TEXT";
  message: string;
};

type SendResponse = {
  isSuccess: boolean;
  activity: Message;
};
