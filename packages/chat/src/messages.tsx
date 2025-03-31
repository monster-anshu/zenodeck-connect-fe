import { Avatar } from "@repo/ui/components/avatar";
import { Textarea } from "@repo/ui/components/textarea";
import React, { FC } from "react";
import { LuSend } from "react-icons/lu";
import Header from "./components/header";
import { useTheme } from "./context/theme-context";
import MessageCom from "./message-com";
import { Assignee, Chat, Message } from "./schema";

import { defaultData } from "./data/messages";

type IMessagesProps = {
  messages: Message[];
  assignee: Assignee;
  chatInfo: Pick<Chat, "conversationStatus">;
  onBack: () => void;
};

const Messages: FC<IMessagesProps> = ({
  assignee = defaultData.assignee,
  chatInfo = defaultData.chatInfo,
  messages = defaultData.messages,
  onBack,
}) => {
  const { config } = useTheme();
  return (
    <main className="grid h-full grid-rows-[auto_1fr_auto] rounded-2xl border pb-4">
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
      <div className="space-y-2 overflow-auto">
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
      <div className="grid grid-cols-[1fr_auto] items-start gap-2 px-4 pt-2">
        <Textarea rows={2} className="max-h-40 rounded-xl" />
        <button
          style={{
            color: config.chatWindow.sendButton.textColor,
            background: config.chatWindow.sendButton.backgorundColor,
          }}
          className="min-h-[60px] rounded-xl border px-4 py-2"
        >
          <LuSend size={20} />
        </button>
      </div>
    </main>
  );
};

export default Messages;
