import { WIDGET_URL } from "@admin-env";
import { Button } from "@repo/ui/components/button";
import { FC } from "react";
import { toast } from "sonner";

type IEmbeddCodeProps = {
  clientId: string;
};

const EmbeddCode: FC<IEmbeddCodeProps> = ({ clientId }) => {
  const text = `<script>
;(function (_, m) {
    const ConnectSettings = {
        appId: '${clientId}',
    };
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = '${WIDGET_URL}/external/main.js';
    const head = document.getElementsByTagName("head")[0];
    head?.appendChild(s);
    window.zenodeck_connect = m;
    m._globals = ConnectSettings;
})(document, window.zenodeck_connect || {})
</script>`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.success("Cloud not copy code");
      });
  };

  return (
    <div>
      <p className="font-medium">Embed Code</p>
      <p className="text-xs">
        Copy and paste this code inside the {"<head>"} tag of the web pages you
        want to integrate.
      </p>
      <div className="mb-3 mt-5 w-full whitespace-pre rounded-xl border p-4 font-mono text-xs">
        {text}
      </div>
      <Button onClick={handleCopy} className="ml-auto block">
        Copy
      </Button>
    </div>
  );
};

export default EmbeddCode;
