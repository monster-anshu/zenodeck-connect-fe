import General from "@admin-components/channel/web/General";
import WebChannelSidebar from "@admin-components/channel/web/WebChannelSidebar";
import { queryClient } from "@admin-provider/react-query";
import { channelIdByQuery } from "@admin-queries/channel.query";
import Chats from "@repo/chat/chats";
import { config } from "@repo/chat/configration";
import {
  ThemeContextProvider,
  useTheme,
} from "@repo/chat/context/theme-context";
import { sampleData } from "@repo/chat/data/messages";
import Faqs from "@repo/chat/faqs";
import Home from "@repo/chat/home";
import Messages from "@repo/chat/messages";
import PreChat from "@repo/chat/pre-chat";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { ClientLoaderFunction, useParams, useSearchParams } from "react-router";

type IChennelPageProps = {};

export const clientLoader: ClientLoaderFunction = ({ params }) => {
  const { channelId } = params;
  queryClient.prefetchQuery(channelIdByQuery(channelId!));
};

const ChatWindow = ({ children }: { children: ReactNode }) => {
  const { cssVariables } = useTheme();
  return (
    <div
      style={cssVariables}
      className="h-full w-96 overflow-auto rounded-3xl border bg-white shadow-lg"
    >
      {children}
    </div>
  );
};

const ChennelPage: FC<IChennelPageProps> = () => {
  const { channelId } = useParams();
  const { data: channel } = useSuspenseQuery(channelIdByQuery(channelId!));

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
    componentToUse = (
      <Chats
        chats={Array.from({ length: 100 }).map((_, i) => ({
          ...sampleData.chat,
          _id: i + "",
        }))}
      />
    );
  }
  if (tab === "faq") {
    componentToUse = <Faqs />;
  }
  if (tab === "general") {
    componentToUse = (
      <Messages
        assignee={sampleData.assignee}
        chat={sampleData.chat}
        messages={sampleData.messages}
      />
    );
  }

  console.log(channel);
  return (
    <div className="grid h-full grid-cols-[auto_1fr_auto]">
      <WebChannelSidebar />
      <div className="border-r p-6 text-sm">
        <General />
      </div>
      <div className="h-full overflow-hidden p-4">
        <ThemeContextProvider theme={{ config }}>
          <ChatWindow>{componentToUse || <Home />}</ChatWindow>
        </ThemeContextProvider>
      </div>
    </div>
  );
};

export default ChennelPage;
