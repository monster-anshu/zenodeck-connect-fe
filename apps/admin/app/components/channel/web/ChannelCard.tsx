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
};

const ChannelCard: FC<IChannelCardProps> = ({ channel }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg border p-4 text-sm" key={channel._id}>
      <div className="mb-10 flex items-center gap-2">
        <p className="flex-1">{channel.name}</p>
        <Switch />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-foreground/60 flex-1 self-end text-xs">
          Created by : System
        </p>
        <Link
          to={{ pathname: `/channels/web/${channel._id}`, search: "tab=embed" }}
        >
          <Button variant={"outline"}>Embed code</Button>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChannelCard;
