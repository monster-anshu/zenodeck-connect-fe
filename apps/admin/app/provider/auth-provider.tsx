import { useSocket } from "@admin-hooks/useSocket";
import { agentInfoQuery } from "@admin-queries/agent.query";
import { Spinner } from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, type FC, type ReactNode } from "react";

type IAuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const { data, isLoading } = useQuery(agentInfoQuery);
  const { send, socket } = useSocket();

  useEffect(() => {
    if (socket) return;
    const handle = () => {
      send({ action: "ping" });
    };
    const id = setInterval(handle, 60 * 1000 * 6);
    handle();
    return () => {
      clearInterval(id);
    };
  }, [send, socket]);

  if (isLoading) {
    return <Spinner className="col-span-full my-4" />;
  }

  if (!data?.agentInfo) {
    return <code>Can not authenticate</code>;
  }

  return children;
};

export default AuthProvider;
