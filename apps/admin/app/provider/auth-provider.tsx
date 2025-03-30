import { agentInfoQuery } from "@admin-queries/agent.query";
import { Spinner } from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

type IAuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const { data, isLoading } = useQuery(agentInfoQuery);

  if (isLoading) {
    return <Spinner className="col-span-full my-4" />;
  }

  if (!data?.agentInfo) {
    return <code>Can not authenticate</code>;
  }

  return children;
};

export default AuthProvider;
