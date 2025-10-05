"use client";

// NOTE: Keep comments; user prefers not to delete them

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ---- Backend helpers ----
import { getUserById, signOutUser } from "@/lib/Backend";

// ---- Your custom UI bits ----
import ScrollTop from "./ScrollToTop";
import SignOutButton from "./SignOutButton";
import ThemeTogglerBtn from "./ThemeTogglerBtn";

// ---- MUI ----
import { styled, useTheme } from "@mui/material/styles";
import {
  Alert,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// ---- Icons for nav items ----
import { Home, MenuBook, Assignment, Person } from "@mui/icons-material";

const studentNavItems = [
  { label: "Home", icon: <Home />, href: "/" },
  { label: "Books", icon: <MenuBook />, href: "/books" },
  { label: "Exam", icon: <Assignment />, href: "/exam" },
  { label: "Profile", icon: <Person />, href: "/profile" },
];
const teacherNavItems = [
  { label: "Home", icon: <Home />, href: "/" },
  { label: "Books", icon: <MenuBook />, href: "/books" },
  { label: "Exam", icon: <Assignment />, href: "/exam" },
  { label: "Profile", icon: <Person />, href: "/profile" },
];
const adminNavItems = [
  { label: "Home", icon: <Home />, href: "/" },
  { label: "Books", icon: <MenuBook />, href: "/books" },
  { label: "Exam", icon: <Assignment />, href: "/exam" },
  { label: "Profile", icon: <Person />, href: "/profile" },
];

// ---------------- Mini Drawer styles (MUI v6 variants) ----------------
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar, // ensures content below the AppBar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function DashboardNavbar() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();

  // ---- Drawer open state ----
  const [open, setOpen] = React.useState(isMdUp); // start open on md+ screens
  React.useEffect(() => {
    setOpen(isMdUp);
  }, [isMdUp]);

  // ---- DB url + role nav + snackbar ----
  const [dbUrl, setDbUrl] = React.useState("");
  const [navItems, setNavItems] = React.useState(studentNavItems); // default
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  // ---- Verify user (online/offline), choose role nav, greet ----
  React.useEffect(() => {
    const verifyUser = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!navigator.onLine) {
          if (userId) {
            setSnackbar({
              open: true,
              message: "You are offline. Using saved data ⚡",
              severity: "warning",
            });
            // Keep last-known role nav if you like. Falling back to studentNavItems otherwise.
          } else {
            setSnackbar({
              open: true,
              message: "No account found. Please sign in again 🥺",
              severity: "error",
            });
            setTimeout(() => window.location.replace("/"), 2000);
          }
          return;
        }

        if (!userId) {
          setSnackbar({
            open: true,
            message: "We couldn’t verify your account. Please sign in again 🥺",
            severity: "error",
          });
          await signOutUser();
          setTimeout(() => window.location.replace("/"), 2000);
          return;
        }

        const { data } = await getUserById(userId);
        if (!data) {
          setSnackbar({
            open: true,
            message: "We couldn’t verify your account. Please sign in again 🥺",
            severity: "error",
          });
          await signOutUser();
          setTimeout(() => window.location.replace("/"), 2000);
          return;
        }

        // Role-based nav (adjust role names as per your backend)
        const role = (data.role || "").toLowerCase();
        if (role.includes("admin")) setNavItems(adminNavItems);
        else if (role.includes("teacher")) setNavItems(teacherNavItems);
        else setNavItems(studentNavItems);

        // Optional: verify path contains role segment
        if (pathname && data.role && pathname.toLowerCase().includes(role)) {
          setSnackbar({
            open: true,
            message: `Welcome back, ${data.name || "User"}! 🎉`,
            severity: "success",
          });
        } else {
          // Still allow access but warn if mismatch
          setSnackbar({
            open: true,
            message: `Welcome back, ${data.name || "User"}!`,
            severity: "success",
          });
        }
      } catch {
        setSnackbar({
          open: true,
          message: "We couldn’t verify your account. Please sign in again 🥺",
          severity: "error",
        });
      }
    };

    setDbUrl(localStorage.getItem("userDbUrl") || "");
    verifyUser();
  }, [pathname]);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // Active matcher for highlighting
  const isActive = (to) => {
    // Remove dbUrl prefix for pathname compare; pathname is framework-relative
    // When dbUrl is non-empty, href uses `${dbUrl}${to}` for Link.
    // We'll check only the path part.
    try {
      const target = new URL(`${dbUrl || ""}${to}`, "http://dummy").pathname;
      return pathname === target || pathname?.startsWith(`${target}/`);
    } catch {
      return pathname === to || pathname?.startsWith(`${to}/`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

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

      {/* AppBar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* Open button only visible when drawer is closed */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ mr: 2 }, open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            National Remote School
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Primary nav */}
        <List sx={{ pb: 0 }}>
          {navItems.map((item) => {
            const selected = isActive(item.href);
            return (
              <ListItem
                key={item.label}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  component={Link}
                  href={`${dbUrl}${item.href}`}
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                    selected && {
                      bgcolor: (t) =>
                        t.palette.mode === "light"
                          ? "action.selected"
                          : "action.selected",
                    },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: "center" },
                      open ? { mr: 3 } : { mr: "auto" },
                    ]}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ mt: "auto" }} />

        {/* Bottom actions (Theme / Sign Out) */}
        <List sx={{ pt: 0 }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={[
                { minHeight: 48, px: 2.5 },
                open
                  ? { justifyContent: "initial" }
                  : { justifyContent: "center" },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  open ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                <ThemeTogglerBtn />
              </ListItemIcon>
              <ListItemText
                primary="Theme"
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={async () => {
                await signOutUser();
                window.location.replace("/");
              }}
              sx={[
                { minHeight: 48, px: 2.5 },
                open
                  ? { justifyContent: "initial" }
                  : { justifyContent: "center" },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  open ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                {/* Reuse your existing SignOutButton so visuals remain consistent */}
                <SignOutButton />
              </ListItemIcon>
              <ListItemText
                primary="Sign Out"
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Spacer only (no content here). Your pages render after this component. */}
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar /> {/* creates top offset for the fixed AppBar */}
      </Box>

      <ScrollTop />
    </Box>
  );
}
