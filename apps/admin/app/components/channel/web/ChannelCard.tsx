import { Channel } from "@admin-services/channel.service";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Switch } from "@repo/ui/components/switch";
import { FC } from "react";
import { LuEllipsisVertical } from "react-icons/lu";
import { Link, useNavigate } from "react-router";

type IChannelCardProps = {
  channel: Omit<Channel, "customization">;
  onDelete: () => void;
};

const ChannelCard: FC<IChannelCardProps> = ({ channel, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg border p-4 text-sm" key={channel._id}>
      <div className="mb-10 flex items-center gap-2">
        <p className="flex-1">{channel.name}</p>
        <Switch />
      </div>
      <div className="flex items-center gap-1">
        <p className="text-foreground/60 flex-1 self-end text-xs">
          Created by : System
        </p>
        <Link
          to={{ pathname: `/channels/web/${channel._id}`, search: "tab=embed" }}
        >
          <Button variant={"outline"} className="h-auto py-1.5 text-xs">
            Embed code
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <LuEllipsisVertical size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  pathname: `/channels/web/${channel._id}`,
                  search: "tab=general",
                })
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem
              className="focus:text-destructive"
              onClick={onDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChannelCard;
