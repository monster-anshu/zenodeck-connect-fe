import React, { FC } from "react";
import { useTheme } from "../context/theme-context";

type IHeaderBlockProps = {};

const HeaderBlock: FC<IHeaderBlockProps> = () => {
  const { config, i18n } = useTheme();

  return (
    <div
      className="rounded-t-xl p-6 pb-12"
      style={{
        background: config.header.backgroundColor,
        color: config.header.textColor,
      }}
    >
      <p className="line-clamp-2 text-3xl font-medium leading-10">
        {i18n("greeting")}
      </p>
      <p className="line-clamp-2 text-3xl font-medium leading-10">
        {i18n("introduction")}
      </p>
    </div>
  );
};

export default HeaderBlock;
