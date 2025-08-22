"use client";
import Button from "@mui/material/Button";

const GoBackButton = () => {
  return (
    <Button
      variant="outlined"
      color="error"
      onClick={() => window.history.back()}
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;
