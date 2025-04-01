import WebChannelSidebar from "@admin-components/channel/web/WebChannelSidebar";
import { config } from "@repo/chat/configration";
import {
  ThemeContextProvider,
  useTheme,
} from "@repo/chat/context/theme-context";
import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router";

import Chats from "@repo/chat/chats";
import { defaultData } from "@repo/chat/data/messages";
import Faqs from "@repo/chat/faqs";
import Home from "@repo/chat/home";
import Messages from "@repo/chat/messages";
import PreChat from "@repo/chat/pre-chat";

type IChennelPageProps = {};

const ChatWindow = ({ children }: { children: ReactNode }) => {
  const { cssVariables } = useTheme();
  return (
    <div
      style={cssVariables}
      className="fixed right-5 top-5 h-[550px] max-h-[100dvh] w-96 overflow-auto rounded-3xl border bg-white shadow-lg"
    >
      {children}
    </div>
  );
};

const ChennelPage: FC<IChennelPageProps> = () => {
  const [searchParams] = useSearchParams();

  const tab = searchParams.get("tab");
  let componentToUse;

  if (tab === "home") {
    componentToUse = <Home />;
  }
  if (tab === "pre-chat") {
    componentToUse = <PreChat />;
  }
  if (tab === "chats") {
    componentToUse = <Chats />;
  }
  if (tab === "faq") {
    componentToUse = <Faqs />;
  }
  if (tab === "general") {
    componentToUse = (
      <Messages
        assignee={defaultData.assignee}
        chatInfo={defaultData.chatInfo}
        messages={defaultData.messages}
      />
    );
  }

  const component = (
    <ThemeContextProvider theme={{ config }}>
      <ChatWindow>{componentToUse || <Home />}</ChatWindow>
    </ThemeContextProvider>
  );

  return (
    <div className="h-full">
      <WebChannelSidebar />
      {createPortal(component, document.body)}
    </div>
  );
};

export default ChennelPage;
