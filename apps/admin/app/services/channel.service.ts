import { client } from "./client";

export class ChannelService {
  static async list() {
    const { data } = await client.get<ListResponse>("/channel");
    return data;
  }
}

export type ListResponse = {
  isSuccess: true;
  channels: Channel[];
};

export type Channel = {
  _id: string;
  clientId: string;
  description: string;
  enableFeedback: boolean;
  enablePreview: boolean;
  isConnected: boolean;
  isDefault: boolean;
  name: string;
  type: string;
  welcomeMessage: string;
  createdAt: Date;
  updatedAt: Date;
};
