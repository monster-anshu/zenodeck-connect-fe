import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import React, { FC } from "react";

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
            <Label className="mb-2 block">Name</Label>
            <Input />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default General;
