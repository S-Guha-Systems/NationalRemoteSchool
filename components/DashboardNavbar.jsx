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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// ---- Icons for nav items ----
import {
  Home,
  MenuBook,
  Assignment,
  Person,
  CalendarMonth,
  FreeCancellation,
  Science,
  EmojiEvents,
  HourglassBottom,
  Group,
  Summarize,
} from "@mui/icons-material";

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

// ---- Small helpers (keep comments) ----

// Save last known user in localStorage so we can work offline
const saveLastKnownUser = (user) => {
  try {
    localStorage.setItem("lastKnownUser", JSON.stringify(user || null));
  } catch {}
};

const readLastKnownUser = () => {
  try {
    const raw = localStorage.getItem("lastKnownUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Decide nav items by role string
const navByRole = (role = "") => {
  const r = String(role || "").toLowerCase();
  if (r.includes("admin")) return "admin";
  if (r.includes("teacher")) return "teacher";
  return "student";
};

// Role-based nav definitions (same items you had)
const studentNavItems = [
  { label: "Home", icon: <Home />, href: "/" },
  { label: "My Subjects", icon: <MenuBook />, href: "/subjects" },
  // { label: "Live Classes", icon: <Laptop />, href: "/live-classes" },
  { label: "Schedule", icon: <CalendarMonth />, href: "/schedule" },
  { label: "Virtual Labs", icon: <Science />, href: "/virtual-labs" },
  { label: "Exam Portal", icon: <HourglassBottom />, href: "/exam-portal" },
  { label: "Achievements", icon: <EmojiEvents />, href: "/achievements" },
  // { label: "Attendance", icon: <FreeCancellation />, href: "/attendance" },
  { label: "Profile", icon: <Person />, href: "/profile" },
];
const teacherNavItems = [
  { label: "Home", icon: <Home />, href: "/" },
  { label: "Overview", icon: <Summarize />, href: "/overview" },
  { label: "Students", icon: <Group />, href: "/students" },
  { label: "Schedule", icon: <CalendarMonth />, href: "/schedule" },
  { label: "Exams", icon: <HourglassBottom />, href: "/exams" },
  { label: "Profile", icon: <Person />, href: "/profile" },
];
const adminNavItems = [
  { label: "Home", icon: <Home />, href: "/" },
  { label: "Notes", icon: <MenuBook />, href: "/notes" },
  { label: "Exam", icon: <Assignment />, href: "/exam" },
  { label: "Profile", icon: <Person />, href: "/profile" },
];

// Map roleKey -> items
const roleNavMap = {
  admin: adminNavItems,
  teacher: teacherNavItems,
  student: studentNavItems,
};

// Try to fetch user; return { ok, data, status } without throwing
const safeGetUser = async (userId) => {
  try {
    const { data } = await getUserById(userId);
    return { ok: !!data, data: data || null, status: 200 };
  } catch (err) {
    // Try to derive an HTTP-ish status; adapt based on your fetch layer
    const status =
      err?.status ||
      err?.response?.status ||
      (typeof err?.message === "string" && /401|403|404/.test(err.message)
        ? Number(RegExp.$1)
        : 0);

    return { ok: false, data: null, status: Number(status) || 0 };
  }
};

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

  // ---- Confirmation dialog ----
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // ---- Verify user (online/offline), choose role nav, greet ----
  React.useEffect(() => {
    const verifyUser = async () => {
      const userId = localStorage.getItem("userId");
      setDbUrl(localStorage.getItem("userDbUrl") || "");

      // If truly no userId, we must sign out.
      if (!userId) {
        setSnackbar({
          open: true,
          message: "We couldn’t verify your account. Please sign in again 🥺",
          severity: "error",
        });
        await signOutUser();
        setTimeout(() => window.location.replace("/"), 1200);
        return;
      }

      // Attempt to use cached user immediately for UX (works offline)
      const cached = readLastKnownUser();
      if (cached?.role) {
        const roleKey = navByRole(cached.role);
        setNavItems(roleNavMap[roleKey] || roleNavMap.student);
      }

      // If browser reports offline, just show offline message and stop here.
      if (!navigator.onLine) {
        setSnackbar({
          open: true,
          message: "You’re offline. Using saved data ⚡",
          severity: "warning",
        });
        return;
      }

      // We appear online — try to verify from server
      const res = await safeGetUser(userId);

      // Positive invalidation (online + 401/403/404) -> sign out
      if (!res.ok && [401, 403, 404].includes(res.status)) {
        setSnackbar({
          open: true,
          message:
            "Session expired or account not found. Please sign in again.",
          severity: "error",
        });
        await signOutUser();
        setTimeout(() => window.location.replace("/"), 1200);
        return;
      }

      // Network failure / server unreachable -> keep cached user, no signout
      if (!res.ok && ![401, 403, 404].includes(res.status)) {
        setSnackbar({
          open: true,
          message: "Server unreachable. Working with saved data for now ⚡",
          severity: "warning",
        });
        return;
      }

      // Verified user online
      const data = res.data; // guaranteed by res.ok
      saveLastKnownUser({ id: data.id, name: data.name, role: data.role });

      const roleKey = navByRole(data.role);
      setNavItems(roleNavMap[roleKey] || roleNavMap.student);

      // setSnackbar({
      //   open: true,
      //   message: `Welcome back, ${data.name || "User"}! 🎉`,
      //   severity: "success",
      // });
    };

    verifyUser();
  }, [pathname]);

  // Keep UI in sync with connectivity and inform user
  React.useEffect(() => {
    const onOffline = () =>
      setSnackbar({
        open: true,
        message: "You went offline. Using saved data ⚡",
        severity: "warning",
      });
    const onOnline = () =>
      setSnackbar({
        open: true,
        message: "Back online. Syncing…",
        severity: "info",
      });

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // Active matcher for highlighting
  const isActive = (to) => {
    try {
      const target = new URL(`${dbUrl || ""}${to}`, "http://dummy").pathname;
      return pathname === target || pathname?.startsWith(`${target}/`);
    } catch {
      return pathname === to || pathname?.startsWith(`${to}/`);
    }
  };

  // ---- Handle sign out confirm ----
  const handleSignOut = async () => {
    setConfirmOpen(false);
    await signOutUser();
    window.location.replace("/");
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

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="signout-confirm-title"
      >
        <DialogTitle id="signout-confirm-title">Confirm Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out? You’ll need to sign in again to
            access your dashboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={handleSignOut}>
            Yes, Sign Out
          </Button>
        </DialogActions>
      </Dialog>

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
          <center>
            <ListItem sx={{ alignItems: "center" }}>
              <ThemeTogglerBtn />
            </ListItem>
          </center>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => setConfirmOpen(true)} // open confirmation dialog
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

      {/* Spacer only */}
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
      </Box>

      <ScrollTop />
    </Box>
  );
}
