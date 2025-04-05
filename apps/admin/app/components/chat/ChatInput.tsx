import { queryClient } from "@admin-provider/react-query";
import { messagesQuery } from "@admin-queries/chat.query";
import { ChatService, SendRequest } from "@admin-services/chat.service";
import { Button } from "@repo/ui/components/button";
import { Textarea } from "@repo/ui/components/textarea";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";

type IChatInputProps = {
  chatId: string;
};

const ChatInput: FC<IChatInputProps> = ({ chatId }) => {
  const query = messagesQuery(chatId);

  const [text, setText] = useState("");

  const { mutate } = useMutation({
    mutationFn: (body: SendRequest) => ChatService.send(chatId, body),
    onSuccess: (data) => {
      queryClient.setQueryData(query.queryKey, (curr) => {
        if (!curr) return;
        return { ...curr, activities: [data.activity, ...curr.activities] };
      });
    },
  });

  const handleSend = () => {
    if (!text) return;
    mutate({ message: text, type: "TEXT" });
    setText("");
  };

  return (
    <div className="bg-background mx-2 my-2 rounded-lg py-2 shadow">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message"
        className="mb-4 max-h-40 border-none shadow-none focus-visible:ring-0"
      />
      <div className="px-2">
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default ChatInput;
