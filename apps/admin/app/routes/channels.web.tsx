import { WIDGET_URL } from "@admin-env";
import { channelQuery } from "@admin-queries/channel.query";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Link } from "react-router";

type IChannelWebPageProps = {};

const ChannelWebPage: FC<IChannelWebPageProps> = () => {
  const { data, isLoading } = useQuery(channelQuery);

  const handleCopy = (clientId: string) => {
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
    window.navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-4">
      {isLoading && <Spinner />}
      {data?.channels.map((channel) => {
        return (
          <div
            key={channel._id}
            className="flex items-center gap-2 rounded-lg border p-4"
          >
            <p className="flex-1">{channel.name}</p>
            <Link to={`/channels/web/${channel._id}`}>Edit</Link>
            <Button onClick={() => handleCopy(channel.clientId)}>
              Code code
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default ChannelWebPage;
