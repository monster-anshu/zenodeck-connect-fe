import { FC } from "react";
import { useParams } from "react-router";

type IMessagePageProps = {};

const MessagePage: FC<IMessagePageProps> = () => {
  const { chatId } = useParams();

  return <div>Chat Id : {chatId}</div>;
};

export default MessagePage;
