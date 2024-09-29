import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

const Toast = ({ open, message, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={onClose}
      autoHideDuration={1200}
      TransitionComponent={Slide}
    >
      <Alert
        variant="outlined"
        severity="success"
        sx={{ backgroundColor: "white" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
