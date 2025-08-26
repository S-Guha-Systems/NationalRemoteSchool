"use client";

import Link from "next/link";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Home,
  MenuBook,
  Assignment,
  Person,
  Laptop,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getUserById, signOutUser } from "@/lib/Backend";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: <Laptop />, href: "/dashboard" },
  { label: "Books", icon: <MenuBook />, href: "#" },
  { label: "Exam", icon: <Assignment />, href: "#" },
  { label: "Profile", icon: <Person />, href: "#" },
  { label: "Home", icon: <Home />, href: "/" },
];

const DashboardNavbar = () => {
  const router = useRouter();
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
          console.log("User data:", data);
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", data.name);
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("userPic", data.photoURL);
          localStorage.setItem("userRole", data.role || "student");
          localStorage.setItem("userClass", data.class || "");
          localStorage.setItem("userFatherName", data.fatherName || "");
          localStorage.setItem("userMotherName", data.motherName || "");
          localStorage.setItem("userGuardianName", data.guardianName || "");
          localStorage.setItem("userAddress", data.address || "");
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
    <Box>
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
                  minWidth: "80px",
                  flex: "0 0 auto",
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
