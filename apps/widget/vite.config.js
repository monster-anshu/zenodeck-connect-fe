import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import esbuild from "esbuild";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const env = loadEnv("", process.cwd(), "");

const buildExternalTs = async () => {
  console.log("♻️ ", "External TS build start");
  await esbuild.build({
    entryPoints: ["private/main.ts"],
    outfile: "public/external/main.js",
    minify: true,
    bundle: true,
    define: {
      "process.env.VITE_WIDGET_DOMAIN": `'${env.VITE_WIDGET_DOMAIN}'`,
    },
  });
  console.log("✅", "External TS build successfuly");
};

const config = defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    TanStackRouterVite(),
    {
      name: "build-external-ts",
      buildStart: async (s) => {
        await buildExternalTs();
      },
      configureServer(server) {
        server.watcher.on("change", async (filePath) => {
          if (
            filePath.endsWith(".ts") &&
            filePath.startsWith(path.resolve("private"))
          ) {
            console.log("🔄", `Rebuilding: ${filePath}`);
            await buildExternalTs();
            // server.ws.send({ type: "full-reload" }); // Hot reload
          }
        });
      },
    },
  ],
  server: {
    proxy: {
      "/api/v1": {
        changeOrigin: true,
        target: env.API_SERVER_URL,
      },
    },
  },
});

export default config;
