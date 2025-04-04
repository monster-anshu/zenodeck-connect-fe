import { Avatar } from "@repo/ui/components/avatar";
import { Textarea } from "@repo/ui/components/textarea";
import { FC, useState } from "react";
import { LuSend } from "react-icons/lu";
import Header from "./components/header";
import { useTheme } from "./context/theme-context";
import { defaultData } from "./data/messages";
import MessageCom from "./message-com";
import { Assignee, Chat, Message } from "./schema";

type onSubmitParams = {
  type: "TEXT";
  message: string;
};

type IMessagesProps = {
  messages: Message[];
  assignee: Assignee;
  chatInfo: Pick<Chat, "conversationStatus">;
  onBack?: () => void;
  onSubmit?: (value: onSubmitParams) => void;
};

const Messages: FC<IMessagesProps> = ({
  assignee = defaultData.assignee,
  messages = defaultData.messages,
  onBack,
  onSubmit,
}) => {
  const { config } = useTheme();
  const [text, setText] = useState("");

  const handleSend = () => {
    onSubmit?.({ type: "TEXT", message: text });
  };

  return (
    <main
      className="grid h-full grid-rows-[auto_1fr_auto] rounded-3xl"
      style={{
        background: config.chatWindow.backgroundColor,
      }}
    >
      <Header size="sm" onBack={onBack}>
        <p className="mb-2 text-center font-medium">{assignee.name}</p>
        {false && (
          <Avatar
            imageClassName="mx-auto"
            className="mx-auto"
            profilePic={assignee.profilePic}
          >
            {assignee.name}
          </Avatar>
        )}
      </Header>
      <div
        className="-mt-6 space-y-2 overflow-auto rounded-t-3xl py-2"
        style={{
          background: config.chatWindow.backgroundColor,
        }}
      >
        {messages.map((message) => {
          return (
            <MessageCom
              viewerType="CUSTOMER"
              message={message}
              key={message._id}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-[1fr_auto] items-start gap-2 px-4 py-2">
        <Textarea
          rows={2}
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="max-h-40 rounded-xl text-sm"
        />
        <button
          style={{
            color: config.chatWindow.sendButton.textColor,
            background: config.chatWindow.sendButton.backgorundColor,
          }}
          onClick={handleSend}
          className="min-h-[60px] rounded-xl border px-4 py-2"
        >
          <LuSend size={20} />
        </button>
      </div>
    </main>
  );
};

export default Messages;
