import { Message } from "@repo/chat/schema";
import { getFormattedTimeDifference } from "@repo/chat/utils/time";
import { FC } from "react";
import { LuCheckCheck, LuClock } from "react-icons/lu";

type IMessageItemProps = {
  message: Message;
};

const MessageItem: FC<IMessageItemProps> = ({ message }) => {
  const isRight = message.isRight;
  const diff = getFormattedTimeDifference(new Date(message.timestamp));

  return (
    <div className="px-2">
      <div
        style={{
          marginRight: isRight ? "0px" : "auto",
          marginLeft: isRight ? "auto" : "0px",
        }}
        className="w-fit max-w-[70%] rounded-sm bg-white px-3 pb-0.5 pt-1.5 text-sm"
      >
        <div className="flex items-end">
          <p className="mb-4 whitespace-break-spaces break-all text-xs">
            {message.messageData?.message}
          </p>
          <p className="text-foreground/60 float-right flex items-center gap-[2px]">
            <span className="text-[8px]">{diff}</span>
            {isRight && (
              <div className="ml-auto w-4">
                {message.status === "PENDING" && <LuClock size={10} />}
                {message.status === "DELIVERED" && <LuCheckCheck size={12} />}
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
