import { Chat } from "@repo/chat/schema";
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
    const { data } = await client.post<ListResponse>(
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
}

type ListResponse = {
  isSuccess: boolean;
  customer: Customer;
  chats: Chat[];
};

type Customer = {
  name: string;
  emailId: string;
  message: string;
  _id: string;
};

export type SendRequest = {
  type: "TEXT";
  message: string;
};
