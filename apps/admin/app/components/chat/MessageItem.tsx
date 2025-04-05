import { Message } from "@repo/chat/schema";
import React, { FC } from "react";

type IMessageItemProps = {
  message: Message;
};

const MessageItem: FC<IMessageItemProps> = ({ message }) => {
  const isRight = message.isRight;

  return (
    <div className="px-2">
      <div
        style={{
          marginRight: isRight ? "0px" : "auto",
          marginLeft: isRight ? "auto" : "0px",
        }}
        className="w-fit max-w-[70%] rounded-sm bg-white px-3 py-2 text-sm"
      >
        <p className="whitespace-break-spaces break-all">
          {message.messageData?.message}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
