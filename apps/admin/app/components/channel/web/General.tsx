import { ChannelFormType } from "@admin-routes/channels.web_.$channelId";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { FormComponent } from "@repo/ui/molecules/form-component";
import { FC } from "react";

type IGeneralProps = {};

const General: FC<IGeneralProps> = () => {
  return (
    <div>
      <p className="font-medium">General Settings</p>
      <p className="text-xs">Customize your initial settings for your widget</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Widget Details</AccordionTrigger>
          <AccordionContent className="px-2">
            <FormComponent name={"name"} type="text" label="Name" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default General;
