import { agentInfoQuery } from "@admin-queries/agent.query";
import { Button } from "@repo/ui/components/button";
import { useQuery } from "@tanstack/react-query";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Zenodeck Connect" }];
}

export default function IndexPage() {
  const { data } = useQuery(agentInfoQuery);
  return (
    <main>
      <p>Hello , {data?.agentInfo?.firstName}</p>
    </main>
  );
}
