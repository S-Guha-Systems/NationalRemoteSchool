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
import { getUserById, signOutUser } from "@/lib/Backend";
import ScrollTop from "./ScrollToTop";

const navItems = [
  // { label: "Dashboard", icon: <Laptop />, href: "/dashboard" },
  { label: "Home", icon: <Home />, href: "/" },
  { label: "Books", icon: <MenuBook />, href: "/books" },
  { label: "Exam", icon: <Assignment />, href: "/exam" },
  { label: "Profile", icon: <Person />, href: "/profile" },
];

const DashboardNavbar = () => {
  const [dbUrl, setDbUrl] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const verifyUser = async () => {
      let userId = localStorage.getItem("userId");
      if (userId) {
        const { data } = await getUserById(userId);
        if (data) {
          // console.log("User data:", data);
          localStorage.setItem("userId", userId);
          localStorage.setItem("userClass", data.class || "");
          localStorage.setItem("userRole", data.role || "student");
          localStorage.setItem(
            "userDbUrl",
            `/dashboard/${data.role}/CLASS-${data.class}`
          );
          setDbUrl(`/dashboard/${data.role}/CLASS-${data.class}`);
          setSnackbar({
            open: true,
            message: `Welcome back, ${data.name || "User"}! 🎉`,
            severity: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message:
              "We couldn’t verify your account.Please try to sign in again 🥺",
            severity: "error",
          });
          await signOutUser();
          setTimeout(() => window.location.replace("/"), 2000);
        }
      } else {
        setSnackbar({
          open: true,
          message:
            "We couldn’t verify your account.Please try to sign in again 🥺",
          severity: "error",
        });
        await signOutUser();
        setTimeout(() => window.location.replace("/"), 2000);
      }
    };

    verifyUser();
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
              href={`${dbUrl}${item.href}`}
              sx={{
                minWidth: "80px",
                flex: "0 0 auto",
              }}
            />
          ))}
        </BottomNavigation>
      </Box>
      <ScrollTop />
    </Box>
  );
};

export default DashboardNavbar;
