import { channelQuery } from "@admin-queries/channel.query";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { Switch } from "@repo/ui/components/switch";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { LuEllipsisVertical } from "react-icons/lu";
import { Link } from "react-router";

type IChannelWebPageProps = {};

const ChannelWebPage: FC<IChannelWebPageProps> = () => {
  const { data, isLoading } = useQuery(channelQuery);

  return (
    <div className="p-4">
      {isLoading && <Spinner />}
      <div className="container grid md:grid-cols-2 xl:grid-cols-3">
        {data?.channels.map((channel) => {
          return (
            <div className="rounded-lg border p-4 text-sm" key={channel._id}>
              <div className="mb-10 flex items-center gap-2">
                <p className="flex-1">{channel.name}</p>
                <Switch />
              </div>
              <div className="flex items-end gap-2">
                <p className="text-foreground/60 flex-1 text-xs">
                  Created by : System
                </p>
                <Link to={`/channels/web/${channel._id}?tab=embed`}>
                  <Button variant={"outline"}>Embed code</Button>
                </Link>
                <Link
                  className="block rounded border px-0.5 py-2"
                  to={`/channels/web/${channel._id}?tab=general`}
                >
                  <LuEllipsisVertical />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChannelWebPage;
