import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import Header from "./components/header";
import { useTheme } from "./context/theme-context";
import { defaultCustomFields } from "./data/customefields";
import { CustomField } from "./schema";

type IPreChatProps = {
  onSubmit?: (values: Record<string, unknown>) => void;
  loading?: boolean;
  fields?: CustomField[];
};

const getSchema = ({ enable, type, required }: CustomField) => {
  let schema: ZodSchema = z.unknown().transform(() => void 0);

  if (!enable) {
    return schema;
  }

  if (type === "TEXT" || type === "TEXTAREA") {
    schema = required
      ? z.string().nonempty("Required")
      : z.string().transform((value) => value || void 0);
  }

  if (type === "EMAIL") {
    schema = z.string().email();
  }

  if (!required) {
    schema = schema.optional();
  }

  return schema;
};

const PreChat: FC<IPreChatProps> = ({
  loading,
  fields = defaultCustomFields,
  ...props
}) => {
  const { i18n, config } = useTheme();
  const formSchema = z.object(
    fields.reduce(
      (acc, field) => {
        const schema = getSchema(field);
        acc[field.name] = schema;
        return acc;
      },
      {} as Record<string, ZodSchema<unknown>>
    )
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    props.onSubmit?.(values);
  }

  return (
    <main className="grid h-full grid-rows-[auto_1fr] rounded-3xl">
      <Header>
        <p className="mb-2 line-clamp-2 text-center font-medium">
          {i18n("preChatTitle")}
        </p>
        <p className="line-clamp-2 text-center text-xs font-light">
          {i18n("preChatSubTitle")}
        </p>
      </Header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="-mt-6 space-y-2 overflow-auto rounded-t-3xl px-4 py-4"
          style={{
            background: config.backgroundColor,
          }}
        >
          {fields.map((customFiled) => {
            return (
              <FormField
                control={form.control}
                name={customFiled.name}
                render={({ field }) => {
                  if (["TEXT", "EMAIL"].includes(customFiled.type)) {
                    return (
                      <FormItem key={field.name}>
                        <FormLabel>{customFiled.label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={customFiled.placeholder}
                            {...field}
                            type={
                              customFiled.type === "EMAIL" ? "email" : "text"
                            }
                            required={customFiled.required}
                            value={(field.value || "") as string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }

                  if (customFiled.type === "TEXTAREA") {
                    return (
                      <FormItem key={field.name}>
                        <FormLabel>{customFiled.label}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={customFiled.placeholder}
                            {...field}
                            value={(field.value || "") as string}
                            required={customFiled.required}
                            className="max-h-24"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }

                  return <React.Fragment key={field.name}></React.Fragment>;
                }}
              />
            );
          })}

          <Button
            className="w-full rounded-lg py-5"
            style={{
              color: config.preChat.submitButton.textColor,
              background: config.preChat.submitButton.backgroundColor,
            }}
            loading={loading}
            type="submit"
          >
            {i18n("preChatSubmitButton")}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default PreChat;
