import React from "react";
import { Menu, MenuItem } from "@mui/material";

const VariantDropdownMenu = ({
  anchorEl,
  handleCloseMenu,
  selectedVariant,
  removeVariant,
  makePrimaryVariant,
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
      <MenuItem
        onClick={() =>
          selectedVariant && makePrimaryVariant(selectedVariant.id)
        }
      >
        Make Variant as Primary
      </MenuItem>
    </Menu>
  );
};

export default VariantDropdownMenu;
