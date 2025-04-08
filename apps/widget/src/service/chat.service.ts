import { Chat, Message } from "@repo/chat/schema";
import { normalize } from "@repo/ui/lib/normalize";
import { client } from "./client";
import { WebsiteService } from "./website.service";

export class ChatService {
  static async list() {
    const { data } = await client.get<ListResponse>(`/website/list`, {
      headers: {
        Authorization: WebsiteService.token,
      },
    });

    return data;
  }

  static async send(chatId: string, body: SendRequest) {
    const { data } = await client.post<SendResponse>(
      `/website/${chatId}/message`,
      body,
      {
        headers: {
          Authorization: WebsiteService.token,
        },
      }
    );

    return data;
  }

  static async messages(chatId: string) {
    const { data } = await client.get<MessageResponse>(
      `/website/${chatId}/message`,
      {
        headers: {
          Authorization: WebsiteService.token,
        },
      }
    );

    return { ...data, activities: normalize(data.activities, "_id") };
  }
}

type ListResponse = {
  isSuccess: boolean;
  socketUrl: string;
  authToken: string;
  customer: {
    name: string;
    emailId: string;
    message: string;
    _id: string;
  };
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
