import { Chat } from "@repo/chat/schema";
import { getFormattedTimeDifference } from "@repo/chat/utils/time";
import { Avatar } from "@repo/ui/components/avatar";
import { cn } from "@repo/ui/lib/utils";
import { FC } from "react";
import { Link, useParams } from "react-router";

type IChatItemProps = {
  chat: Chat;
};

const ChatItem: FC<IChatItemProps> = ({ chat }) => {
  const { chatId: selectedChatId } = useParams();

  const { lastMessageInfo, customer, unreadCount } = chat;
  const message = lastMessageInfo?.message;
  const formattedTime = lastMessageInfo?.activityTimestamp
    ? getFormattedTimeDifference(new Date(lastMessageInfo?.activityTimestamp))
    : "Unknow";

  return (
    <Link
      to={`/chat/${chat._id}`}
      className={cn(
        "grid w-full grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-2 rounded-lg px-3 py-4 text-start",
        selectedChatId === chat._id ? "bg-primary/10" : "hover:bg-secondary/60"
      )}
    >
      <div className="row-span-2">
        <Avatar>{customer?.name}</Avatar>
      </div>
      <p
        className={cn(
          "line-clamp-1 text-sm",
          unreadCount ? "font-medium" : "font-light"
        )}
      >
        {customer?.name}
      </p>
      <span className="text-foreground/60 text-[10px]">{formattedTime}</span>
      <div className="col-span-2 flex gap-0.5">
        <p
          className={cn(
            "line-clamp-1 flex-1 text-xs",
            unreadCount ? "text-foreground/80" : "text-foreground/50"
          )}
        >
          {message}
        </p>
        {(unreadCount || 0) > 0 && (
          <p className="bg-primary text-primary-foreground grid h-4 w-4 place-items-center rounded-full text-[10px] leading-none">
            {unreadCount}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ChatItem;
