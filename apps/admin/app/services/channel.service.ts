import { client } from "./client";

export class ChannelService {
  static async list() {
    const { data } = await client.get<ListResponse>("/channel");
    return data;
  }

  static async get(id: string) {
    const { data } = await client.get<GetResponse>(`/channel/${id}`);
    return data.channel;
  }
}

export type ListResponse = {
  isSuccess: true;
  channels: Channel[];
};

type GetResponse = {
  channel: Channel;
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
