import { cn } from "@repo/ui/lib/utils";
import { FC } from "react";
import { Link, useSearchParams } from "react-router";

type IWebChannelSidebarProps = {};

const items = [
  {
    label: "General",
    key: "general",
  },
  {
    label: "Appearance",
    key: "appearance",
  },
  {
    label: "Pre chat",
    key: "pre-chat",
  },
];

const navigationItem = [
  {
    label: "Home",
    key: "home",
  },
  {
    label: "Chats",
    key: "chats",
  },
  {
    label: "Faq",
    key: "faq",
  },
  {
    label: "Ticket",
    key: "ticket",
  },
];

const bottomNavItems = [
  {
    label: "Embed Code",
    key: "embed",
  },
];

const WebChannelSidebar: FC<IWebChannelSidebarProps> = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <div className="grid h-full w-56 grid-rows-[auto_1fr_auto] border-r px-2 py-5">
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive = item.key === tab;
          return (
            <Link
              key={item.key}
              className={cn(
                "rounded px-2 py-2 text-sm",
                isActive ? "bg-secondary" : ""
              )}
              to={{
                search: `tab=${item.key}`,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="my-4 flex flex-col gap-2">
        <p className="px-2 font-medium">Navigation</p>
        {navigationItem.map((item) => {
          const isActive = item.key === tab;
          return (
            <Link
              key={item.key}
              className={cn(
                "rounded px-2 py-2 text-sm",
                isActive ? "bg-secondary" : ""
              )}
              to={{
                search: `tab=${item.key}`,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        {bottomNavItems.map((item) => {
          const isActive = item.key === tab;
          return (
            <Link
              key={item.key}
              className={cn(
                "rounded px-2 py-2 text-sm",
                isActive ? "bg-secondary" : ""
              )}
              to={{
                search: `tab=${item.key}`,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WebChannelSidebar;
