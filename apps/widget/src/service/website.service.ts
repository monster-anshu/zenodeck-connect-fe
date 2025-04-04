import { client } from "./client";

export class WebsiteService {
  static token = "";

  static async initiate(clientId: string, body: Record<string, unknown>) {
    const { data } = await client.post<InitiateResponse>(
      `/website/${clientId}/chat/initiate`,
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

type InitiateResponse = {
  isSuccess: boolean;
  authToken: string;
  chat: Chat;
  customer: Customer;
};

type Chat = {
  appId: string;
  assignee: Assignee;
  status: string;
  customerId: string;
  totalMsgCount: number;
  channelId: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

type Assignee = {
  assignedAt: Date;
  type: string;
  userId: string;
};

type Customer = {
  _id: string;
  name: string;
  emailId: string;
};
