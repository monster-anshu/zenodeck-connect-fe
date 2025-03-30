import React, { FC } from "react";
import FaqBlock from "./blocks/faq-block";
import HeaderBlock from "./blocks/header-block";
import LastMessageBlock from "./blocks/last-message-block";
import SendMessageBlock from "./blocks/send-message-block";
import TicketBlock from "./blocks/ticket-block";
import { useTheme } from "./context/theme-context";

type IHomeProps = {};

const Home: FC<IHomeProps> = () => {
  const { config } = useTheme();

  const components: Record<string, React.ReactNode> = {
    HEADER: <HeaderBlock />,
    LAST_MESSAGE: <LastMessageBlock />,
    SEND_MESSAGE: <SendMessageBlock />,
    FAQ: <FaqBlock />,
    TICKETS: <TicketBlock />,
  };

  return (
    <main className="h-full rounded-2xl border">
      <HeaderBlock />
      <div
        style={{
          background: config.backgroundColor,
          color: config.textColor,
        }}
        className="-mt-6 rounded-t-3xl px-4 py-4 text-sm"
      >
        {config.homeContent.map((block) => {
          const component = components[block.key];
          if (!block.enable || !component) return null;
          return <React.Fragment key={block.key}>{component}</React.Fragment>;
        })}
      </div>
    </main>
  );
};

export default Home;
