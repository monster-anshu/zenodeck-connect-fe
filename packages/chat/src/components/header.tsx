import { cn } from "@repo/ui/lib/utils";
import React, { FC } from "react";
import { LuMoveLeft, LuX } from "react-icons/lu";
import { useTheme } from "../context/theme-context";
type IHeaderProps = {
  children: React.ReactNode;
  onBack?: () => void;
  size?: "md" | "sm";
};

const Header: FC<IHeaderProps> = ({ children, onBack, size = "md" }) => {
  const { config, actions } = useTheme();

  return (
    <div>
      <div
        className={cn(
          "rounded-t-3xl p-6",
          size === "md" && "pb-12",
          size === "sm" && "pb-8 pt-4"
        )}
        style={{
          background: config.header.backgroundColor,
          color: config.header.textColor,
        }}
      >
        {onBack && (
          <button className="float-left ml-auto block" onClick={onBack}>
            <LuMoveLeft size={18} />
          </button>
        )}
        <button
          onClick={actions?.onClose}
          className="float-right ml-auto block"
        >
          <LuX size={18} />
        </button>
        <div>{children}</div>
      </div>
      {/* <div
        className="-mt-6 h-6 w-full rounded-t-3xl"
        style={{
          background: config.backgroundColor,
        }}
      ></div> */}
    </div>
  );
};

export default Header;
