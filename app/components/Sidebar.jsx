import {
  Fan,
  Zap,
  Image,
  Shirt,
  Settings,
  CreditCard,
  Infinity,
} from "lucide-react";
import { IconButton } from "@mui/material";

const Sidebar = () => {
  return (
    <aside className="w-16 bg-black border-r border-gray-200 flex flex-col items-center justify-between p-4">
      {/* Top Navigation Icons */}
      <div className="space-y-4">
        <IconButton size="medium">
          <Fan className="text-green-600" size={24} />
        </IconButton>

        <IconButton size="medium">
          <Zap className="text-gray-500" size={24} />
        </IconButton>

        <IconButton size="medium">
          <Image className="text-gray-500" size={24} />
        </IconButton>

        <IconButton size="medium">
          <Infinity className="text-gray-500" size={24} />
        </IconButton>

        <IconButton size="medium">
          <Shirt className="text-gray-500" size={24} />
        </IconButton>
      </div>

      {/* Bottom Settings Icon */}
      <div className="space-y-4">
        <IconButton size="medium">
          <CreditCard className="text-gray-500" size={24} />
        </IconButton>

        <IconButton size="medium">
          <Settings className="text-gray-500" size={24} />
        </IconButton>
      </div>
    </aside>
  );
};

export default Sidebar;
