import { config } from "@repo/chat/configration";
import { ThemeContextProvider } from "@repo/chat/context/theme-context";
import React, { FC } from "react";
import { useWidget } from "./widget-context";

type IWidgetThemeLoaderProps = {
  children?: React.ReactNode;
};

const WidgetThemeLoader: FC<IWidgetThemeLoaderProps> = ({ children }) => {
  const { setValue } = useWidget();
  return (
    <ThemeContextProvider
      theme={{
        config,
        actions: {
          onClose: () => setValue({ open: false }),
        },
      }}
    >
      {children}
    </ThemeContextProvider>
  );
};

export default WidgetThemeLoader;
