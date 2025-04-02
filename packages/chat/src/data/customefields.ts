import { CustomField } from "../schema";

export const defaultCustomFields: CustomField[] = [
  {
    name: "name",
    enable: true,
    label: "Full name",
    placeholder: "John doe",
    required: true,
    type: "TEXT",
  },
  {
    name: "emailId",
    enable: true,
    label: "Email address",
    placeholder: "john@gmail.com",
    required: true,
    type: "EMAIL",
  },
  {
    name: "message",
    enable: true,
    label: "Message",
    placeholder: "I need help regarding...",
    required: true,
    type: "TEXTAREA",
  },
];
