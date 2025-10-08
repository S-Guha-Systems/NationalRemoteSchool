// NOTE: Keep comments; user prefers not to delete them
"use client";

import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";
import UploadOutlined from "@mui/icons-material/UploadOutlined";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import ClassRounded from "@mui/icons-material/ClassRounded";
import BadgeRounded from "@mui/icons-material/BadgeRounded";
import { PersonRounded } from "@mui/icons-material";

// ---- helpers: safe localStorage get/set ----
const getLS = (k, d = "") => {
  if (typeof window === "undefined") return d;
  try {
    const v = window.localStorage.getItem(k);
    return v ?? d;
  } catch {
    return d;
  }
};
const setLS = (k, v) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(k, v);
  } catch {}
};

// ---- small util for initials from email/name ----
const initialsFromEmail = (email) => {
  if (!email) return "U";
  const name = email.split("@")[0] || "U";
  const parts = name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/);
  const first = parts[0]?.[0] ?? "U";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
};

export default function Profile() {
  // ---- state from localStorage (with fallbacks for first load) ----
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userClass, setUserClass] = React.useState("");
  const [userId, setUserId] = React.useState(""); // Roll No.
  const [userImage, setUserImage] = React.useState("");
  const [saved, setSaved] = React.useState(false);

  // preload data from localStorage on mount
  React.useEffect(() => {
    setUserName(getLS("userName", ""));
    setUserEmail(getLS("userEmail", ""));
    setUserClass(getLS("userClass", ""));
    setUserId(getLS("userId", "")); // roll no
    setUserImage(getLS("userImage", ""));
  }, []);

  // ---- photo upload (store as data URL in localStorage) ----
  const fileInputRef = React.useRef(null);
  const onPickPhoto = () => fileInputRef.current?.click();
  const onFileChange = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setUserImage(dataUrl);
      setLS("userImage", dataUrl);
      setSaved(true);
    };
    reader.readAsDataURL(f);
    // reset input so same file can be chosen again later
    e.target.value = "";
  };

  // ---- class change (persist immediately) ----
  const onClassChange = (e) => {
    const v = e.target.value;
    setUserClass(v);
    setLS("userClass", v);
    setSaved(true);
  };

  // ---- fake save (email/roll are read-only here; pulled from auth/LS) ----
  const onSave = () => {
    // If you add more editable fields later, persist them here
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3} alignItems="stretch">
        {/* Left: Profile card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Profile" subheader="Your basic information" />
            <Divider />
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <Avatar
                  src={userImage || undefined}
                  alt="Profile photo"
                  sx={{ width: 112, height: 112, fontSize: 36 }}
                >
                  {initialsFromEmail(userEmail)}
                </Avatar>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    icon={<CheckCircleRounded />}
                    label="Active"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                </Stack>

                <List dense sx={{ width: "100%", maxWidth: 420 }}>
                  <ListItem>
                    <PersonRounded sx={{ mr: 1, opacity: 0.7 }} />
                    <ListItemText
                      primary="Name"
                      secondary={userName || "Not set"}
                    />
                  </ListItem>
                  <ListItem>
                    <EmailRounded sx={{ mr: 1, opacity: 0.7 }} />
                    <ListItemText
                      primary="Email"
                      secondary={userEmail || "Not set"}
                    />
                  </ListItem>

                  <ListItem>
                    <BadgeRounded sx={{ mr: 1, opacity: 0.7 }} />
                    <ListItemText
                      primary="Roll No."
                      secondary={userId || "Not set"}
                    />
                  </ListItem>

                  <ListItem>
                    <ClassRounded sx={{ mr: 1, opacity: 0.7 }} />
                    <ListItemText
                      primary="Class"
                      secondary={"Not set"}
                    />
                  </ListItem>
                </List>

                {saved && (
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Changes saved to local device.
                  </Typography>
                )}

                {/* hidden file input for photo upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  style={{ display: "none" }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
