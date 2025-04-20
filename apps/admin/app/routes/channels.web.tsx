import ChannelCard from "@admin-components/channel/web/ChannelCard";
import CreateWebChannel from "@admin-components/channel/web/CreateWebChannel";
import { queryClient } from "@admin-provider/react-query";
import { channelQuery } from "@admin-queries/channel.query";
import { Channel } from "@admin-services/channel.service";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Spinner } from "@repo/ui/components/spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { utimes } from "fs";
import { FC, useState } from "react";
import { createPortal } from "react-dom";

type IChannelWebPageProps = {};

const ChannelWebPage: FC<IChannelWebPageProps> = () => {
  const { data, isLoading } = useQuery(channelQuery);
  const [selectedForDelete, setSelectedForDelete] = useState(
    null as null | Pick<Channel, "_id" | "name">
  );

  const headerPortal = document.getElementById("header-portal");
  const createButton = headerPortal
    ? createPortal(<CreateWebChannel />, headerPortal)
    : null;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => null,
    onSuccess(_, id) {
      queryClient.setQueryData(channelQuery.queryKey, (curr) => {
        if (!curr) return;
        return {
          ...curr,
          channels: curr.channels.filter((item) => item._id !== id),
        };
      });
      setSelectedForDelete(null);
    },
  });

  return (
    <div className="p-4">
      {createButton}
      {isLoading && <Spinner />}
      <div className="container grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {data?.channels.map((channel) => {
          return (
            <ChannelCard
              onDelete={() => setSelectedForDelete(channel)}
              key={channel._id}
              channel={channel}
            />
          );
        })}
      </div>

      <Dialog
        open={!!selectedForDelete}
        onOpenChange={(open) => !open && setSelectedForDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete confirmation</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure to delete{" "}
            <span className="font-semibold">{selectedForDelete?.name} </span>
            web channel ?
          </p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setSelectedForDelete(null)}
            >
              No
            </Button>
            <Button
              variant="destructive"
              loading={deleteMutation.isPending}
              onClick={() =>
                selectedForDelete
                  ? deleteMutation.mutate(selectedForDelete._id)
                  : null
              }
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChannelWebPage;
