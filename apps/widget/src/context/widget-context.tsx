import { ReactNode } from "@tanstack/react-router";
import { ChildrenEvent, sendToParent } from "@widget-utils/parent";
import { createContext, useContext, useEffect, useState } from "react";

type WidgetContextValues = ChildrenEvent;

type WidgetContext = WidgetContextValues & {
  setValue: (value: Partial<WidgetContextValues>) => void;
};

const WidgetContext = createContext<null | WidgetContext>(null);

export const WidgetContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [value, setValue] = useState<WidgetContextValues | null>(null);

  useEffect(() => {
    const listner = (e: MessageEvent<ChildrenEvent>) => {
      setValue(e.data);
    };
    sendToParent({ style: { display: "block", visibility: "visible" } });
    window.addEventListener("message", listner);
    return () => {
      window.removeEventListener("message", listner);
    };
  }, []);

  if (!value) {
    return;
  }

  return (
    <WidgetContext.Provider
      value={{
        ...value,
        setValue: (value) =>
          setValue((curr) => {
            if (!curr) return null;
            return { ...curr, ...value };
          }),
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidget = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidget should be used under WidgetContext");
  }

  return context;
};
