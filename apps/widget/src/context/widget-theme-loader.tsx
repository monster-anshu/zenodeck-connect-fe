import { config } from "@repo/chat/configration";
import { ThemeContextProvider } from "@repo/chat/context/theme-context";
import { useNavigate } from "@tanstack/react-router";
import React, { FC } from "react";
import { useWidget } from "./widget-context";

type IWidgetThemeLoaderProps = {
  children?: React.ReactNode;
};

const navigationPath: Record<string, string> = {
  HOME: "/",
  CHATS: "/chats",
  FAQS: "/faq",
  TICKETS: "/ticket",
};

const WidgetThemeLoader: FC<IWidgetThemeLoaderProps> = ({ children }) => {
  const { setValue } = useWidget();
  const navigate = useNavigate();

  const handleNavigation = (name: string) => {
    const path = navigationPath[name];
    if (!path) return;
    navigate({
      to: path,
      viewTransition: true,
    });
  };

  return (
    <ThemeContextProvider
      theme={{
        config,
        actions: {
          onClose: () => setValue({ open: false }),
          onNavigation: handleNavigation,
        },
      }}
    >
      {children}
    </ThemeContextProvider>
  );
};

export default WidgetThemeLoader;
