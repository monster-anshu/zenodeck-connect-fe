import { config } from "@repo/chat/configration";
import { ThemeContextProvider } from "@repo/chat/context/theme-context";
import Home from "@repo/chat/home";
import { FC } from "react";
import { createPortal } from "react-dom";

type IChennelPageProps = {};

const ChennelPage: FC<IChennelPageProps> = () => {
  const component = (
    <div className="fixed right-0 top-0 h-[550px] max-h-[100dvh] w-96 overflow-auto rounded-xl bg-white">
      <ThemeContextProvider theme={{ config }}>
        <Home />
      </ThemeContextProvider>
    </div>
  );

  return (
    <div>
      ChennelPage
      {createPortal(component, document.body)}
    </div>
  );
};

export default ChennelPage;
