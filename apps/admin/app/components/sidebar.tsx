import React, { FC } from "react";
import { Link } from "react-router";
import Logo from "./logo";
import { items } from "./sidebar-data";

type ISidebarProps = {};

const Sidebar: FC<ISidebarProps> = () => {
  return (
    <aside className="bg-primary row-span-full flex-col overflow-auto px-2">
      <Logo />
      <div className="grid grid-cols-1 gap-6 py-6">
        {items.map((item) => {
          return (
            <Link
              key={item.link}
              to={item.link}
              className="text-primary-foreground"
            >
              <span className="text-2xl [&>svg]:mx-auto">{item.icon}</span>
              <p className="mt-2 text-center text-xs">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
