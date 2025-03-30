import Icon from "@admin-assets/svg/logo.svg";
import { FC } from "react";
import { Link } from "react-router";

type ILogoProps = {
  width?: number;
};

const Logo: FC<ILogoProps> = ({ width = 50 }) => {
  const height = width;

  return (
    <Link to="/" aria-label="Zenodeck Connect">
      <img
        src={Icon}
        alt="Logo"
        width={width}
        height={height}
        className="mx-auto p-2"
      />
    </Link>
  );
};

export default Logo;
