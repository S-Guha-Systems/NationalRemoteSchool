"use client";

import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";

export default function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" className="scroll-to-top">
        <Fab size="medium" aria-label="scroll back to top" color="warning">
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Fade>
  );
}
