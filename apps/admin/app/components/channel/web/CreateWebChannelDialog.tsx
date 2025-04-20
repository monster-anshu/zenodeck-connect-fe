import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Form } from "@repo/ui/components/form";
import { FormComponent, FormElement } from "@repo/ui/molecules/form-component";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ICreateWebChannelDialogProps = {
  onClose: () => void;
};

const schema = z.object({
  name: z.string().trim().nonempty(),
  primaryColor: z.string(),
});

const CreateWebChannelDialog: FC<ICreateWebChannelDialogProps> = ({
  onClose,
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      primaryColor: "#f31b1b",
    },
  });
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new web channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          {formElements.map((item) => {
            return <FormComponent {...item} />;
          })}
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
