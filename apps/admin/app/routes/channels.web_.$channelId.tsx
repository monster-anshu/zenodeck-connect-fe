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
import { Form } from "@repo/ui/components/form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
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

type ChannelFormValues = z.infer<typeof schema>;
export type ChannelFormType = UseFormReturn<
  ChannelFormValues,
  unknown,
  ChannelFormValues
>;

const ChennelPage: FC<IChennelPageProps> = () => {
  const { channelId } = useParams();
  const [searchParams] = useSearchParams();

  const { data: channel } = useSuspenseQuery(channelIdByQuery(channelId!));
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: channel.name,
    },
  });

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

  return (
    <div className="grid h-full grid-cols-[auto_1fr_auto]">
      <WebChannelSidebar />
      <Form {...form}>
        <div className="border-r p-6 text-sm">
          <General control={form.control} />
        </div>
      </Form>
      <div className="overflow-hidden p-4">
        <ThemeContextProvider theme={{ config }}>
          <ChatWindow>{componentToUse || <Home />}</ChatWindow>
        </ThemeContextProvider>
      </div>
    </div>
  );
};

export default ChennelPage;
