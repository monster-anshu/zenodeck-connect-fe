import ChannelCard from "@admin-components/channel/web/ChannelCard";
import CreateWebChannel from "@admin-components/channel/web/CreateWebChannel";
import { channelQuery } from "@admin-queries/channel.query";
import { Spinner } from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { createPortal } from "react-dom";

type IChannelWebPageProps = {};

const ChannelWebPage: FC<IChannelWebPageProps> = () => {
  const { data, isLoading } = useQuery(channelQuery);
  const headerPortal = document.getElementById("header-portal");

  const createButton = headerPortal
    ? createPortal(<CreateWebChannel />, headerPortal)
    : null;

  return (
    <div className="p-4">
      {createButton}
      {isLoading && <Spinner />}
      <div className="container grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {data?.channels.map((channel) => {
          return <ChannelCard key={channel._id} channel={channel} />;
        })}
      </div>
    </div>
  );
};

export default ChannelWebPage;
