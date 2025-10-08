"use client";

// NOTE: Keep comments; user prefers not to delete them

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import SchoolRounded from "@mui/icons-material/SchoolRounded";

const classesList = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    label: `CLASS-${n}`,
    path: `/dashboard/teacher/CLASS-${n}`,
  };
});

const TeacherHome = () => {
  const [userName, setUserName] = useState("Teacher");
  const [snack, setSnack] = useState({ open: false, msg: "" });
  const [currentClass, setCurrentClass] = useState(null);

  // ---- Handle click: set localStorage and give feedback ----
  const handleChoose = (cls) => {
    try {
      localStorage.setItem("userDbUrl", cls.path);
      setSnack({
        open: true,
        msg: `Saved your teaching class as ${cls.label}`,
      });
      window.location.href = `${cls.path}/overview`;
    } catch (e) {
      setSnack({
        open: true,
        msg: "Could not save your teaching class.",
      });
    }
  };

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "Teacher");
  }, []);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Welcome to the Teacher Dashboard, {userName ? ` ${userName}` : ""}
      </Typography>

      {/* Cards grid */}
      <Grid container spacing={2}>
        {classesList.map((cls) => (
          <Grid key={cls.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Tooltip title={`Set your teaching class to ${cls.label}`} arrow>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  transition: "transform 120ms ease, box-shadow 120ms ease",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 6 },
                }}
              >
                <CardActionArea onClick={() => handleChoose(cls)} sx={{ p: 1 }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 56, height: 56 }}>
                        <SchoolRounded />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {cls.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click To Set This As&nbsp;
                          <strong>Your Teaching Class</strong>
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2200}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeacherHome;
