import sharedConfig from "@repo/config-tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
