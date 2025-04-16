import { FC, ReactNode } from "react";
import {
  LuCircleHelp,
  LuHouse,
  LuMessageCircle,
  LuTicket,
} from "react-icons/lu";
import { useTheme } from "./context/theme-context";

type INavigationProps = {};

const navigationComponents: Record<
  string,
  {
    icon: ReactNode;
    label: string;
  }
> = {
  HOME: {
    icon: <LuHouse />,
    label: "Home",
  },
  CHATS: {
    icon: <LuMessageCircle />,
    label: "Chats",
  },
  FAQS: {
    icon: <LuCircleHelp />,
    label: "FAQs",
  },
  TICKETS: {
    icon: <LuTicket />,
    label: "Tickets",
  },
};

const Navigation: FC<INavigationProps> = () => {
  const { config, actions } = useTheme();
  const navigation = config.navigation;

  return (
    <div className="m-4 mb-4 mt-2 flex items-center justify-center gap-10 rounded-2xl border px-6 py-3">
      {navigation.map((n) => {
        const component = navigationComponents[n.name];
        if (!component || !n.enable) return null;
        return (
          <button
            className="text-center"
            onClick={() => actions?.onNavigation?.(n.name)}
          >
            <span className="mx-auto block w-fit text-lg">
              {component.icon}
            </span>
            <span className="text-sm">{component.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
