import { FC } from "react";
import Header from "./components/header";
import { useTheme } from "./context/theme-context";
import Navigation from "./navigation";

type ITicketsProps = {};

const Tickets: FC<ITicketsProps> = () => {
  const { i18n, config } = useTheme();
  return (
    <main
      style={{
        background: config.backgroundColor,
      }}
      className="grid h-full grid-rows-[auto_1fr_auto] rounded-3xl"
    >
      <Header>
        <p className="text-center text-xl font-medium">{i18n("ticketTitle")}</p>
      </Header>
      <div
        className="-mt-6 space-y-2 overflow-auto rounded-t-3xl px-4 py-4"
        style={{
          background: config.backgroundColor,
        }}
      >
        <p>Tickets Page</p>
      </div>
      <Navigation />
    </main>
  );
};

export default Tickets;
