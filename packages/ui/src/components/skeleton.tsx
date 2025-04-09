import React, { FC } from "react";
import styles from "./skeleton.module.css";

import { cn } from "@repo/ui/lib/utils";

type Color = " --skeleton-l1-bg" | "--skeleton-l2-bg" | "--blink-color";

export type ISkeletonProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: "shine" | "blink";
  style?: React.CSSProperties & Partial<Record<Color, string>>;
};

const Skeleton: FC<ISkeletonProps> = ({
  className,
  variant = "blink",
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "h-10 rounded-lg",
        className,
        variant === "shine" && styles.skeletonShine,
        variant === "blink" && styles.skeletonBlink
      )}
    ></div>
  );
};

export { Skeleton };
