import React from "react";
import { Menu, MenuItem } from "@mui/material";

const VariantDropdownMenu = ({
  anchorEl,
  handleCloseMenu,
  selectedVariant,
  removeVariant,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem
        onClick={() => selectedVariant && removeVariant(selectedVariant.id)}
      >
        Delete Variant
      </MenuItem>
    </Menu>
  );
};

export default VariantDropdownMenu;
