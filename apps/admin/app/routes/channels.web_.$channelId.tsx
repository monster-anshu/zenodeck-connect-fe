import EmbeddCode from "@admin-components/channel/web/EmbeddCode";
import General from "@admin-components/channel/web/General";
import WebChannelSidebar from "@admin-components/channel/web/WebChannelSidebar";
import { queryClient } from "@admin-provider/react-query";
import { channelIdByQuery } from "@admin-queries/channel.query";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Tickets from "@repo/chat/tickets";
import { Form } from "@repo/ui/components/form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC, ReactNode, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ClientLoaderFunction, useParams, useSearchParams } from "react-router";
import { z } from "zod";

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
      className="h-[560px] w-96 overflow-auto rounded-3xl border bg-white shadow-lg"
    >
      {children}
    </div>
  );
};

const schema = z.object({
  name: z.string().nonempty(),
});

const validTabs = [
  "general",
  "appearance",
  "pre-chat",
  "embed",
  "home",
  "chats",
  "faq",
  "ticket",
] as const;

type ChannelFormValues = z.infer<typeof schema>;
export type ChannelFormType = UseFormReturn<
  ChannelFormValues,
  unknown,
  ChannelFormValues
>;

const ChennelPage: FC<IChennelPageProps> = () => {
  const { channelId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: channel } = useSuspenseQuery(channelIdByQuery(channelId!));
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: channel.name,
    },
  });

  const tab = searchParams.get("tab");

  useEffect(() => {
    if (!validTabs.includes(tab as never)) {
      setSearchParams(
        (curr) => {
          curr.set("tab", validTabs[0]!);
          return curr;
        },
        { replace: true }
      );
    }
  }, [tab]);

  const getTabContent = (): [ReactNode, ReactNode] => {
    if (tab === "general") {
      return [
        <General />,
        <Messages
          assignee={sampleData.assignee}
          chat={sampleData.chat}
          messages={sampleData.messages}
        />,
      ];
    }
    if (tab === "appearance") {
      return [null, <Home />];
    }
    if (tab === "pre-chat") {
      return [null, <PreChat />];
    }
    if (tab === "embed") {
      return [<EmbeddCode clientId={channel.clientId} />, null];
    }
    if (tab === "home") {
      return [null, <Home />];
    }
    if (tab === "chats") {
      return [
        null,
        <Chats
          chats={Array.from({ length: 100 }).map((_, i) => ({
            ...sampleData.chat,
            _id: i + "",
          }))}
        />,
      ];
    }
    if (tab === "faq") {
      return [null, <Faqs />];
    }
    if (tab === "ticket") {
      return [null, <Tickets />];
    }
    return [null, null];
  };

  const [mainContent, componentToUse] = getTabContent();

  return (
    <div className="grid h-full grid-cols-[auto_1fr_auto]">
      <WebChannelSidebar />
      <Form {...form}>
        <div className="border-r p-6 text-sm">{mainContent}</div>
      </Form>
      {componentToUse ? (
        <div className="overflow-hidden p-4">
          <ThemeContextProvider theme={{ config }}>
            <ChatWindow>{componentToUse}</ChatWindow>
          </ThemeContextProvider>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ChennelPage;
