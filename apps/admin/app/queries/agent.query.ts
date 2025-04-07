import { AgentService } from "@admin-services/agent.service";
import { queryOptions } from "@tanstack/react-query";
import ReconnectingWebSocket from "reconnecting-websocket";

let socket: ReconnectingWebSocket;

export const agentInfoQuery = queryOptions({
  queryKey: ["agent-info"],
  queryFn: async () => {
    const res = await AgentService.info();

    socket =
      socket ||
      new ReconnectingWebSocket(res.socketUrl + "?token=" + res.authToken, [], {
        connectionTimeout: 1000 * 60,
        maxRetries: 3,
      });

    return {
      appInfo: res.appInfo!,
      agentInfo: res.agentInfo!,
      socket: socket,
    };
  },
  refetchOnMount: false,
});
