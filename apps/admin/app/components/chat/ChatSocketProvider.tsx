import { SocketListners, useSocket } from "@admin-hooks/useSocket";
import { queryClient } from "@admin-provider/react-query";
import { chatListQuery, messagesQuery } from "@admin-queries/chat.query";
import { produce } from "immer";
import { FC, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router";

type IChatSocketProviderProps = {};

const ChatSocketProvider: FC<IChatSocketProviderProps> = () => {
  const params = useParams();
  const chatId = params.chatId!;

  const chatIdRef = useRef(chatId);
  chatIdRef.current = chatId;

  useEffect(() => {
    queryClient.setQueryData(chatListQuery.queryKey, (curr) => {
      if (!curr) return;
      return produce(curr, (draft) => {
        const chat = draft.chats.find((c) => c._id === chatId);
        if (!chat) {
          return;
        }
        chat.unreadCount = 0;
      });
    });
  }, [chatId]);

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

        queryClient.setQueryData(chatListQuery.queryKey, (curr) => {
          if (!curr) return;
          return produce(curr, (draft) => {
            const chat = draft.chats.find((c) => c._id === activity.chatId);
            if (!chat) {
              return;
            }
            const lastActivity = chat.lastMessageInfo?.activityTimestamp
              ? new Date(chat.lastMessageInfo.activityTimestamp)
              : null;
            const currTime = new Date(activity.timestamp);

            if (
              !lastActivity ||
              (lastActivity && lastActivity.valueOf() < currTime.valueOf())
            ) {
              chat.lastMessageInfo = {
                activityTimestamp: activity.timestamp,
                id: activity._id,
                message: activity.messageData?.message,
                type: activity.messageData?.type,
              };
              if (chatIdRef.current !== chat._id) {
                chat.unreadCount = chat.unreadCount ? chat.unreadCount + 1 : 1;
              }
            }
          });
        });
      },
    };
  }, []);

  useSocket(listners);

  return null;
};

export default ChatSocketProvider;
