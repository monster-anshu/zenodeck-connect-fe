import { LoaderCircle } from "lucide-react";
import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

export type ISpinnerProps = React.ComponentProps<typeof LoaderCircle>;

const Spinner: FC<ISpinnerProps> = ({ className, ...props }) => (
  <LoaderCircle
    {...props}
    className={twMerge("text-primary mx-auto animate-spin text-2xl", className)}
  />
);

export { Spinner };
