import { Message } from "@repo/chat/schema";
import { useQuery } from "@tanstack/react-query";
import { chatListQuery } from "@widget-quries/chat.query";
import { useEffect } from "react";

export type SocketListners = {
  ACTIVITY?: (activity: Message) => void;
};

export const useSocket = (listeners?: SocketListners) => {
  const { data } = useQuery(chatListQuery);
  const socket = data?.socket;

  useEffect(() => {
    if (!socket) return;
    const listener = (event: MessageEvent<any>) => {
      const parsed = JSON.parse(event.data);
      const activity = parsed.activity;
      if (activity) {
        listeners?.ACTIVITY?.(activity);
      }
    };
    socket.addEventListener("message", listener);
    return () => {
      socket.removeEventListener("message", listener);
    };
  }, [socket, listeners]);

  return socket;
};
