import { SocketListners, useSocket } from "@admin-hooks/useSocket";
import { queryClient } from "@admin-provider/react-query";
import { messagesQuery } from "@admin-queries/chat.query";
import { produce } from "immer";
import { FC, useMemo } from "react";

type IChatSocketProviderProps = {};

const ChatSocketProvider: FC<IChatSocketProviderProps> = () => {
  const listners: SocketListners = useMemo(() => {
    return {
      ACTIVITY(activity) {
        const messageQuery = messagesQuery(activity.chatId, "");
        queryClient.setQueryData(messageQuery.queryKey, (curr) => {
          if (!curr) return;
          const update = produce(curr, (draft) => {
            const firstPage = draft.pages[0];
            if (!firstPage) {
              return;
            }
            firstPage.activities[activity._id] = activity;
          });
          return update;
        });
      },
    };
  }, []);

  useSocket(listners);

  return null;
};

export default ChatSocketProvider;
