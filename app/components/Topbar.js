import { ArrowLeft } from "lucide-react";
import { Button, Chip } from "@mui/material";

const Topbar = () => {
  return (
    <header>
      <div className="flex justify-between items-center mb-4 p-4">
        <div className="flex items-center">
          <Button sx={{ margin: "8px", color: "black" }}>
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-3xl font-bold mr-2 min-w-96 border-b border-black">
            Rules Creation
          </h1>
          <Chip
            label="Primary Feed"
            color="primary"
            variant="outlined"
            sx={{ height: "24px", backgroundColor: "#eff6ff" }}
          />
        </div>

        <Button
          variant="contained"
          color="success"
          sx={{ textTransform: "none" }}
        >
          Publish Feed
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
