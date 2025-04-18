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
      <Accordion
        type="multiple"
        className="[&_[role=region][data-state=open]]:overflow-hidden"
        defaultValue={["details", "navigation"]}
      >
        <AccordionItem value="details">
          <AccordionTrigger>Widget Details</AccordionTrigger>
          <AccordionContent className="px-1">
            <FormComponent name={"name"} type="text" label="Name" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="navigation">
          <AccordionTrigger>Manage navigation menu</AccordionTrigger>
          <AccordionContent className="px-1">Navigation dnd</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default General;
