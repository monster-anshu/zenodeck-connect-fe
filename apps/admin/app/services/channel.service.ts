import { ConfigrationZod } from "@repo/chat/cofing-zod";
import { DeepPartial } from "react-hook-form";
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

  static async create(body: CreateRequest) {
    const { data } = await client.post<CreateResponse>("/channel", body);
    return data.channel;
  }
}

export type ListResponse = {
  isSuccess: true;
  channels: Omit<Channel, "customization">[];
};

type CreateRequest = {
  name: string;
  primaryColor: string;
};

type CreateResponse = {
  isSuccess: true;
  channel: Channel;
};

type GetResponse = {
  isSuccess: true;
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
  customization: DeepPartial<ConfigrationZod>;
};
