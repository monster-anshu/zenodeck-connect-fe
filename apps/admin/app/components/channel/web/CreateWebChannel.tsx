import { Button } from "@repo/ui/components/button";
import { FC, useState } from "react";
import CreateWebChannelDialog from "./CreateWebChannelDialog";

type ICreateWebChannelProps = {};

const CreateWebChannel: FC<ICreateWebChannelProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <CreateWebChannelDialog onClose={() => setOpen(false)} />}
      <Button onClick={() => setOpen((curr) => !curr)}>Create</Button>
    </>
  );
};

export default CreateWebChannel;
