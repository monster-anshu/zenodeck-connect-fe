import React, { FC } from "react";
import { Link, useLocation } from "react-router";
import { items } from "./sidebar-data";

type IGlobalHeaderProps = {};

const GlobalHeader: FC<IGlobalHeaderProps> = () => {
  const { pathname } = useLocation();

  const active = items.find((item) => {
    if (pathname === "/") {
      return item.link === pathname;
    }
    return item.link.startsWith(pathname);
  });

  if (active?.hideHeader || !active) {
    return <div className="col-span-2"></div>;
  }

  if (active.localtionHeader) {
    const items = [{ label: active.label, link: active.link }];
    return (
      <div className="col-span-2 flex gap-2 border-b px-5 py-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <React.Fragment key={i}>
              <Link to={item.link}>{item.label}</Link>
              {!isLast && <p>{">"}</p>}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div className="col-span-2 border-b px-5 py-2">
      <p className="font-medium">{active?.title}</p>
      <p className="text-sm">{active?.subTitle}</p>
    </div>
  );
};

export default GlobalHeader;
