import { queryClient } from "@admin-provider/react-query";
import { channelQuery } from "@admin-queries/channel.query";
import { ChannelService } from "@admin-services/channel.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Form } from "@repo/ui/components/form";
import { FormComponent, FormElement } from "@repo/ui/molecules/form-component";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ICreateWebChannelDialogProps = {
  onClose: () => void;
};

const schema = z.object({
  name: z.string().trim().nonempty(),
  primaryColor: z.string().nonempty(),
});

const CreateWebChannelDialog: FC<ICreateWebChannelDialogProps> = ({
  onClose,
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      primaryColor: "#675dc0",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ChannelService.create,
    onSuccess(data) {
      queryClient.setQueryData(channelQuery.queryKey, (curr) => {
        if (!curr) return;
        return {
          ...curr,
          channels: curr.channels.concat(data),
        };
      });
      onClose();
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    mutate(values);
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new web channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            {formElements.map((item) => {
              return <FormComponent {...item} />;
            })}
            <DialogFooter>
              <Button loading={isPending} type="submit" className="mt-2">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const formElements: FormElement<typeof schema>[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    name: "primaryColor",
    type: "color",
    label: "Primary Color",
  },
];

export default CreateWebChannelDialog;
