import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";
import { FC } from "react";
import Header from "./components/header";
import { useTheme } from "./context/theme-context";

type IPreChatProps = {
  onSubmit?: () => void;
  loading?: boolean;
};

const PreChat: FC<IPreChatProps> = ({ onSubmit, loading }) => {
  const { i18n, config } = useTheme();
  return (
    <main className="h-full rounded-2xl">
      <Header>
        <p className="mb-2 line-clamp-2 text-center font-medium">
          {i18n("preChatTitle")}
        </p>
        <p className="line-clamp-2 text-center text-xs font-light">
          {i18n("preChatSubTitle")}
        </p>
      </Header>
      <div className="space-y-3 px-4">
        {config.preChat.fields.map((field) => {
          if (!field.enable) return null;
          if (field.fieldType === "TEXT" || field.fieldType === "EMAIL") {
            return (
              <div key={field.name}>
                <Label>{field.placeholder}</Label>
                <Input
                  type={field.fieldType === "EMAIL" ? "email" : "text"}
                  placeholder={"Enter " + field.placeholder}
                  name={field.name}
                  required={field.required}
                />
              </div>
            );
          }
          if (field.fieldType === "TEXT_AREA") {
            return (
              <div key={field.name}>
                <Label>{field.placeholder}</Label>

                <Textarea
                  placeholder={"Enter " + field.placeholder}
                  name={field.name}
                  required={field.required}
                />
              </div>
            );
          }
          return null;
        })}
        <Button
          className="w-full rounded-lg py-5"
          style={{
            color: config.preChat.submitButton.textColor,
            background: config.preChat.submitButton.backgroundColor,
          }}
          loading={loading}
          onClick={() => onSubmit?.()}
        >
          {i18n("preChatSubmitButton")}
        </Button>
      </div>
      <div></div>
    </main>
  );
};

export default PreChat;
