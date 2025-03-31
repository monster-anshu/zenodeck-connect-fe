import React, { FC } from "react";
import { cn } from "../lib/utils";

type IAvatarProps = React.ComponentPropsWithoutRef<"div"> & {
  children?: string | null;
  profilePic?: string | null;
  imageClassName?: string;
};

const Avatar: FC<IAvatarProps> = ({
  imageClassName,
  profilePic,
  children,
  className,
  ...props
}) => {
  if (profilePic)
    return (
      <img
        width={34}
        height={34}
        src={profilePic}
        className={cn("h-8 w-8 rounded-full object-cover", imageClassName)}
        alt={"Profile Pic"}
      />
    );

  return (
    <div
      {...props}
      className={cn(
        "bg-primary/20 text-primary grid h-[34px] w-[34px] place-items-center rounded-full text-xl font-medium",
        className
      )}
    >
      {children?.[0]?.toUpperCase()}
    </div>
  );
};

export { Avatar };
