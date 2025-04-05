import { FC } from "react";
import { Message } from "./schema";

type IMessageComProps = {
  message: Message;
};

const MessageCom: FC<IMessageComProps> = ({ message }) => {
  const isRight = message.isRight;

  return (
    <div className="px-2">
      <div
        style={{
          marginRight: isRight ? "0px" : "auto",
          marginLeft: isRight ? "auto" : "0px",
        }}
        className="bg-secondary w-fit max-w-[85%] rounded-sm px-3 py-2 text-sm"
      >
        <p className="whitespace-break-spaces break-all">
          {message.messageData?.message}
        </p>
      </div>
    </div>
  );
};

export default MessageCom;
