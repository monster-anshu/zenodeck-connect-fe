import { AgentService } from "@admin-services/agent.service";
import { queryOptions } from "@tanstack/react-query";

export const agentInfoQuery = queryOptions({
  queryKey: ["agent-info"],
  queryFn: AgentService.info,
  refetchOnMount: false,
});
