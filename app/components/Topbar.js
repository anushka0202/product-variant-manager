import { ArrowLeft } from "lucide-react";
import { Button, Chip } from "@mui/material";

const Topbar = () => {
  return (
    <header>
      <div className="flex justify-between items-center mb-4 p-4">
        <div className="flex items-center">
          <Button className="mr-2 text-black">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-3xl font-bold mr-2 min-w-96 border-b border-black">
            Rules Creation
          </h1>
          <Chip
            label="Primary Feed"
            color="primary"
            variant="outlined"
            className="h-6 bg-blue-50"
          />
        </div>

        <Button variant="contained" color="success" className="capitalize">
          Publish Feed
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
