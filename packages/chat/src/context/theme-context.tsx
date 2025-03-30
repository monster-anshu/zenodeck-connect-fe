import { createContext, ReactNode, useContext } from "react";
import { Configration, deafultLanguage } from "../configration";

type Theme = {
  config: Configration;
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
  return {
    i18n: (key: keyof typeof language.messages) =>
      language.messages[key] || deafultLanguage.messages[key],
    config: config,
  };
};
