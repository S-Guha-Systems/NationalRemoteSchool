"use client";
import * as React from "react";

import { Box, Tooltip } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";

const ThemeTogglerBtn = () => {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = React.useCallback(() => {
    if (mode === "light") {
      setMode("dark");
    } else if (mode === "dark") {
      setMode("system");
    } else {
      setMode("light");
    }
  }, [mode, setMode]);

  const renderIcon = () => {
    if (mode === "light") return <LightModeOutlinedIcon />;
    if (mode === "dark") return <DarkModeOutlinedIcon />;
    return <LaptopMacOutlinedIcon />;
  };

  return (
    <Box sx={{ flexGrow: 0, cursor: "pointer" }}>
      <Tooltip title="Toggle Theme">
        <div size="large" color="inherit" onClick={toggleTheme} sx={{ p: 0 }}>
          {renderIcon()}
        </div>
      </Tooltip>
    </Box>
  );
};

export default ThemeTogglerBtn;
