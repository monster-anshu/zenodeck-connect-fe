import ChannelCard from "@admin-components/channel/web/ChannelCard";
import { channelQuery } from "@admin-queries/channel.query";
import { Spinner } from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

type IChannelWebPageProps = {};

const ChannelWebPage: FC<IChannelWebPageProps> = () => {
  const { data, isLoading } = useQuery(channelQuery);

  return (
    <div className="p-4">
      {isLoading && <Spinner />}
      <div className="container grid md:grid-cols-2 xl:grid-cols-3">
        {data?.channels.map((channel) => {
          return <ChannelCard key={channel._id} channel={channel} />;
        })}
      </div>
    </div>
  );
};

export default ChannelWebPage;
