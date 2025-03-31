import { FC } from "react";
import { LuSend } from "react-icons/lu";
import { useTheme } from "../context/theme-context";

type ISendMessageBlockProps = {
  onClick?: () => void;
};

const SendMessageBlock: FC<ISendMessageBlockProps> = ({ onClick }) => {
  const { config, i18n } = useTheme();
  return (
    <button
      aria-label={i18n("blocks.sendMessage")}
      className="flex w-full items-center justify-between rounded-2xl border px-4 py-4"
      onClick={onClick}
    >
      <div className="text-left">
        <p className="font-semibold">{i18n("blocks.sendMessage")}</p>
        <p className="text-foreground/60 text-xs">{i18n("replyExpectation")}</p>
      </div>
      <div>
        <LuSend size={20} color={config.primaryColor} />
      </div>
    </button>
  );
};

export default SendMessageBlock;
