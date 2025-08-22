"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

const AppThemeContext = createContext(null);

const AppThemeProvider = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    return responsiveFontSizes(
      createTheme({
        cssVariables: {
          colorSchemeSelector: "class",
          disableCssColorScheme: true,
        },
        typography: {
          fontFamily: "var(--font-roboto)",
        },
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: `#F1F8F5`,
            contrastText: "#000",
          },
          secondary: {
            main: `#F1F8F5`,
            contrastText: "#000",
          },
          background: {
            default: prefersDarkMode ? "#15202b" : "#F1F8F5",
            paper: prefersDarkMode ? "#15202b" : "#F1F8F5",
          },
        },
        colorSchemes: {
          light: {
            palette: {
              primary: { main: `#F1F8F5` },
              secondary: { main: `#F1F8F5` },
              background: {
                default: "#F1F8F5",
                paper: "#F1F8F5",
              },
            },
          },
          dark: {
            palette: {
              primary: { main: `#15202b` },
              secondary: { main: `#15202b` },
              background: {
                default: "#15202b",
                paper: "#15202b",
              },
            },
          },
        },
      })
    );
  }, [prefersDarkMode]);

  return (
    <AppThemeContext.Provider value={null}>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppThemeContext = () => useContext(AppThemeContext);

export default AppThemeProvider;
