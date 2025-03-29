import { Button } from "@repo/ui/components/button";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Zenodeck Connect" }];
}

export default function IndexPage() {
  return (
    <main>
      <h1>Hello world</h1>
      <Button>Press me</Button>
    </main>
  );
}
