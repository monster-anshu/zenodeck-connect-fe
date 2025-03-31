import React, { FC } from "react";
import { LuX } from "react-icons/lu";
import { useTheme } from "../context/theme-context";
type IHeaderProps = {
  children: React.ReactNode;
};

const Header: FC<IHeaderProps> = ({ children }) => {
  const { config } = useTheme();

  return (
    <div>
      <div
        className="rounded-t-xl p-6 pb-12"
        style={{
          background: config.header.backgroundColor,
          color: config.header.textColor,
        }}
      >
        <div>
          <button className="float-right ml-auto block">
            <LuX size={18} />
          </button>
        </div>
        {children}
      </div>
      <div
        className="-mt-6 h-6 w-full rounded-t-3xl"
        style={{
          background: config.backgroundColor,
        }}
      ></div>
    </div>
  );
};

export default Header;
