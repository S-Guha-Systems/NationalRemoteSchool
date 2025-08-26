"use client";

import Link from "next/link";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from "@mui/material";
import {
  Home,
  MenuBook,
  Assignment,
  Person,
  Laptop,
} from "@mui/icons-material";

const navItems = [
  { label: "Dashboard", icon: <Laptop />, href: "/dashboard" },
  { label: "Books", icon: <MenuBook />, href: "#" },
  { label: "Exam", icon: <Assignment />, href: "#" },
  { label: "Profile", icon: <Person />, href: "#" },
  { label: "Home", icon: <Home />, href: "/" },
];

const DashboardNavbar = () => {
  return (
    <Box>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        elevation={3}
      >
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <BottomNavigation
            showLabels
            sx={{
              flex: "1 0 auto",
              display: "flex",
            }}
          >
            {navItems.map((item) => (
              <BottomNavigationAction
                key={item.label}
                label={item.label}
                icon={item.icon}
                component={Link}
                href={item.href}
                sx={{
                  minWidth: "80px", // makes items evenly sized
                  flex: "0 0 auto", // prevent shrinking
                }}
              />
            ))}
          </BottomNavigation>
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardNavbar;
