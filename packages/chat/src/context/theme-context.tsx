import React, { createContext, ReactNode, useContext } from "react";
import { Configration, deafultLanguage } from "../configration";
import {
  convertToVariable,
  getContrastingTextColorFromHSL,
  hexToHsl,
} from "../utils/color";

type Theme = {
  config: Configration;
  actions?: {
    onClose?: () => void;
    onNavigation?: (name: string) => void;
  };
};

const ThemeContext = createContext<Theme | null>(null);

type IThemeContextProviderProps = {
  children: ReactNode;
  theme: Theme;
};

export const ThemeContextProvider = ({
  children,
  theme,
}: IThemeContextProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme should be used under ThemeContext");
  }
  const { i18n, ...config } = theme.config;
  const language = i18n.find((lang) => lang.default) || deafultLanguage;

  const hslColors = {
    primary: hexToHsl(config.primaryColor),
    text: hexToHsl(config.textColor),
    background: hexToHsl(config.backgroundColor),
  };

  const cssVariables = {
    "--primary": convertToVariable(hslColors.primary),
    "--foreground": convertToVariable(hslColors.text),
    "--background": convertToVariable(hslColors.background),
  } as React.CSSProperties;

  return {
    actions: theme.actions,
    i18n: (key: keyof typeof language.messages) =>
      language.messages[key] || deafultLanguage.messages[key],
    config: {
      ...config,
      primaryTextColor: getContrastingTextColorFromHSL(hslColors.primary),
    },
    cssVariables,
  };
};
