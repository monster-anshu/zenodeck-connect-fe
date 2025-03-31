import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const innerRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = innerRef.current;
    if (!textarea) return;
    const offsetBorder = 2;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + offsetBorder + "px";
  };

  React.useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <textarea
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full resize-none rounded-md border bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      onInput={adjustTextareaHeight}
      ref={(element) => {
        innerRef.current = element;
        if (ref) {
          (ref as React.RefObject<HTMLTextAreaElement | null>).current =
            element;
        }
      }}
      {...props}
      onChange={(ev) => {
        if (typeof props.maxLength === "number") {
          const value = ev.target.value.slice(0, props.maxLength);
          ev.target.value = value;
        }
        props.onChange?.(ev);
      }}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
