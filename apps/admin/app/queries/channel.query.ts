import { ChannelService } from "@admin-services/channel.service";
import { queryOptions } from "@tanstack/react-query";

export const channelQuery = queryOptions({
  queryKey: ["channel"],
  queryFn: ChannelService.list,
});
