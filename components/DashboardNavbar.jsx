"use client";

import Link from "next/link";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Home, MenuBook, Assignment, Person } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUserById, signOutUser } from "@/lib/Backend";
import ScrollTop from "./ScrollToTop";
import SignOutButton from "./SignOutButton";
import ThemeTogglerBtn from "./ThemeTogglerBtn";

const navItems = [
  { label: "Home", icon: <Home />, href: "/" },
  { label: "Books", icon: <MenuBook />, href: "/books" },
  { label: "Exam", icon: <Assignment />, href: "/exam" },
  { label: "Profile", icon: <Person />, href: "/profile" },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [dbUrl, setDbUrl] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Track active tab
  const activeIndex = navItems.findIndex((item) =>
    pathname.startsWith(item.href)
  );

  useEffect(() => {
    const verifyUser = async () => {
      let userId = localStorage.getItem("userId");
      if (!navigator.onLine) {
        if (userId) {
          setSnackbar({
            open: true,
            message: "You are offline. Using saved data ⚡",
            severity: "warning",
          });
          return;
        } else {
          setSnackbar({
            open: true,
            message: "No account found. Please sign in again 🥺",
            severity: "error",
          });
          setTimeout(() => window.location.replace("/"), 2000);
          return;
        }
      }

      if (userId) {
        const { data } = await getUserById(userId);
        if (data) {
          setSnackbar({
            open: true,
            message: `Welcome back, ${data.name || "User"}! 🎉`,
            severity: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: "We couldn’t verify your account. Please sign in again 🥺",
            severity: "error",
          });
          await signOutUser();
          setTimeout(() => window.location.replace("/"), 2000);
        }
      } else {
        setSnackbar({
          open: true,
          message: "We couldn’t verify your account. Please sign in again 🥺",
          severity: "error",
        });
        await signOutUser();
        setTimeout(() => window.location.replace("/"), 2000);
      }
    };
    verifyUser();
    setDbUrl(localStorage.getItem("userDbUrl") || "");
  }, []);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box position="static" sx={{ mb: "1rem" }}>
      {/* Snackbar with Alert */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Bottom Nav */}
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
          value={activeIndex === -1 ? 0 : activeIndex} // fallback to Home
          sx={{ flex: "1 0 auto", display: "flex" }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              component={Link}
              href={`${dbUrl}${item.href}`}
              sx={{
                minWidth: "80px",
                flex: "0 0 auto",
                "&.Mui-selected": {
                  color: "primary.main", // highlight color
                  fontWeight: "bold",
                },
              }}
            />
          ))}
          <BottomNavigationAction
            label="Theme"
            icon={<ThemeTogglerBtn />}
            sx={{ minWidth: "80px", flex: "0 0 auto" }}
          />
          <BottomNavigationAction
            label="Sign Out"
            icon={<SignOutButton />}
            sx={{ minWidth: "80px", flex: "0 0 auto" }}
          />
        </BottomNavigation>
      </Box>
      <ScrollTop />
    </Box>
  );
};

export default DashboardNavbar;
