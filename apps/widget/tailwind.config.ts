import sharedConfig from "@repo/config-tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "../../packages/ui/src/**/*.{tsx,ts,jsx,js,html,mjs}",
    "../../packages/chat/src/**/*.{tsx,ts,jsx,js,html,mjs}",
  ],
  presets: [sharedConfig],
};

export default config;
