import sharedConfig from "@repo/config-tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/", "../../packages/ui/src/**/*.{tsx,ts,jsx,js,html,mjs}"],
  presets: [sharedConfig],
};

export default config;
