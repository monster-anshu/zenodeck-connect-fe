import { AgentService } from "@admin-services/agent.service";
import { queryOptions } from "@tanstack/react-query";
import ReconnectingWebSocket from "reconnecting-websocket";

export const agentInfoQuery = queryOptions({
  queryKey: ["agent-info"],
  queryFn: async () => {
    const res = await AgentService.info();
    const rws = new ReconnectingWebSocket(
      res.socketUrl + "?token=" + res.authToken
    );
    return {
      appInfo: res.appInfo!,
      agentInfo: res.agentInfo!,
      socket: rws,
    };
  },
  refetchOnMount: false,
});
