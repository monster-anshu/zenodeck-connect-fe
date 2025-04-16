import React, { FC } from "react";
import FaqBlock from "./blocks/faq-block";
import LastMessageBlock from "./blocks/last-message-block";
import SendMessageBlock from "./blocks/send-message-block";
import TicketBlock from "./blocks/ticket-block";
import Header from "./components/header";
import { useTheme } from "./context/theme-context";
import Navigation from "./navigation";

type IHomeProps = {
  onSendMessage?: () => void;
};

const Home: FC<IHomeProps> = ({ onSendMessage }) => {
  const { config, i18n } = useTheme();

  const components: Record<string, React.ReactNode> = {
    LAST_MESSAGE: <LastMessageBlock />,
    SEND_MESSAGE: <SendMessageBlock onClick={onSendMessage} />,
    FAQ: <FaqBlock />,
    TICKETS: <TicketBlock />,
  };

  return (
    <main className="grid h-full grid-rows-[auto_1fr_auto] rounded-3xl">
      <Header>
        <p className="line-clamp-2 text-3xl font-medium leading-10">
          {i18n("greeting")}
        </p>
        <p className="line-clamp-2 text-3xl font-medium leading-10">
          {i18n("introduction")}
        </p>
      </Header>
      <div
        className="-mt-6 space-y-2 overflow-auto rounded-t-3xl px-4 py-4 text-sm"
        style={{
          background: config.backgroundColor,
        }}
      >
        {config.homeContent.map((block) => {
          const component = components[block.key];
          if (!block.enable || !component) return null;
          return <React.Fragment key={block.key}>{component}</React.Fragment>;
        })}
      </div>
      <Navigation />
    </main>
  );
};

export default Home;
