import WebChannelSidebar from "@admin-components/channel/web/WebChannelSidebar";
import { config } from "@repo/chat/configration";
import { ThemeContextProvider } from "@repo/chat/context/theme-context";
import { FC } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router";

import Chats from "@repo/chat/chats";
import Faqs from "@repo/chat/faqs";
import Home from "@repo/chat/home";
import PreChat from "@repo/chat/pre-chat";

type IChennelPageProps = {};

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

  const component = (
    <div className="fixed right-0 top-0 h-[550px] max-h-[100dvh] w-96 overflow-auto rounded-2xl bg-white shadow-lg">
      <ThemeContextProvider theme={{ config }}>
        {componentToUse || <Home />}
      </ThemeContextProvider>
    </div>
  );

  return (
    <div className="h-full">
      <WebChannelSidebar />
      {createPortal(component, document.body)}
    </div>
  );
};

export default ChennelPage;
