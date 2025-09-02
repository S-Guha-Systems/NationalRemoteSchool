"use client";

import { useState } from "react";
import { signOutUser } from "@/lib/Backend";
import { Logout } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { usePathname } from "next/navigation";

const SignOutButton = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar(false);
  };

  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      console.error("Sign out error:", error);
    } else {
      setOpen(false);
      setSnackbar(true);
      setTimeout(() => window.location.replace("/"), 1500);
    }
  };

  return (
    <>
      {pathname.startsWith("/dashboard") ? (
        <div onClick={handleOpenDialog}>
          <Logout />
        </div>
      ) : (
        <Button
          color="error"
          size="small"
          variant="outlined"
          onClick={handleOpenDialog}
          sx={{ textAlign: "center" }}
        >
          Sign Out
        </Button>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="warning">
            Cancel
          </Button>
          <Button
            onClick={handleSignOut}
            color="error"
            variant="contained"
            autoFocus
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Signed Out Successfully 🎉
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignOutButton;
