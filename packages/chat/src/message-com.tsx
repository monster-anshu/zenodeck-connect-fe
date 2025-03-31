import React, { FC } from "react";
import { Message } from "./schema";

type IMessageComProps = {
  message: Message;
  viewerType: "AGENT" | "CUSTOMER";
};

const MessageCom: FC<IMessageComProps> = ({ message, viewerType }) => {
  const isRight =
    viewerType === "CUSTOMER"
      ? message.from.type === "AGENT" || message.from.type === "BOT"
      : message.from.type === "CUSTOMER";

  return (
    <div className="px-2">
      <div
        style={{
          marginRight: isRight ? "0px" : "auto",
          marginLeft: isRight ? "auto" : "0px",
        }}
        className="bg-secondary w-fit max-w-[70%] rounded-xl px-3 py-4"
      >
        {message.messageData?.message}
      </div>
    </div>
  );
};

export default MessageCom;
