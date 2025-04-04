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
}

type ListResponse = {
  isSuccess: boolean;
  customer: Customer;
  chats: Chat[];
};

type Chat = {
  _id: string;
  appId: string;
  assignee: Assignee;
  status: string;
  customerId: string;
  totalMsgCount: number;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Assignee = {
  assignedAt: Date;
  type: string;
  userId: string;
};

type Customer = {
  name: string;
  emailId: string;
  message: string;
  _id: string;
};
