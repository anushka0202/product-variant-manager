import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { X, Image } from "lucide-react";

const DesignSelectionDialog = ({
  open,
  closeDialog,
  designs,
  handleDesignSelection,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering designs based on the search query
  const filteredDesigns = designs.filter((design) =>
    design.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="md" fullWidth>
      <Image className="text-green-500 ml-4 mt-4" size={44} />
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="text-xl font-bold mr-2">Select a design to link</h1>
        <TextField
          autoFocus
          margin="dense"
          id="search"
          label="Search"
          type="text"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeDialog}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <X size={16} />
      </IconButton>
      <DialogContent>
        <div className="grid grid-cols-4 gap-4">
          {filteredDesigns.length > 0 ? (
            filteredDesigns.map((design) => (
              <div
                className="flex-1 flex flex-col items-center justify-center border-2 bg-white hover:border-blue-500 border-gray-300 rounded-lg p-2 relative group"
                key={design.id}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="text-sm">{design.name}</div>
                </div>
                <Button
                  title="Insert Design"
                  onClick={() => handleDesignSelection(design)}
                  variant="outlined"
                  sx={{
                    opacity: 0,
                    ".group:hover &": { opacity: 1 },
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    color: "black",
                    height: "40px",
                    minWidth: "40px",
                    padding: "8px",
                    margin: "16px",
                    backgroundColor: "white",
                    textAlign: "center",
                    textTransform: "none",
                    borderColor: "#d1d5db",
                    ":hover": { backgroundColor: "#f1f5f9" },
                  }}
                >
                  Insert
                </Button>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500 mb-10">
              No designs found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesignSelectionDialog;
