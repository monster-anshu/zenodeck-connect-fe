import { agentInfoQuery } from "@admin-queries/agent.query";
import { useQuery } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

type IAuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const { data, isLoading } = useQuery(agentInfoQuery);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!data?.agentInfo) {
    return <code>Can not authenticate</code>;
  }

  return children;
};

export default AuthProvider;
