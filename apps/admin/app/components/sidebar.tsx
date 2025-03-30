import { cn } from "@repo/ui/lib/utils";
import React, { FC } from "react";
import { Link, useLocation } from "react-router";
import Logo from "./logo";
import { items } from "./sidebar-data";

type ISidebarProps = {};

const Sidebar: FC<ISidebarProps> = () => {
  const { pathname } = useLocation();

  return (
    <aside className="bg-primary row-span-full flex-col overflow-auto px-2">
      <Logo />
      <div className="grid grid-cols-1 gap-3 py-6">
        {items.map((item) => {
          let isActive = false;
          if (pathname === "/") {
            isActive = item.link === pathname;
          } else {
            isActive = item.link.startsWith(pathname);
          }
          return (
            <Link
              key={item.link}
              to={item.link}
              className="text-primary-foreground"
            >
              <div
                className={cn(
                  "mx-auto w-fit rounded-full p-3 text-xl [&>svg]:mx-auto",
                  isActive
                    ? "bg-primary-foreground text-primary"
                    : "hover:bg-primary-foreground/20"
                )}
              >
                {item.icon}
              </div>
              <p className="mt-[1px] text-center text-xs">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
