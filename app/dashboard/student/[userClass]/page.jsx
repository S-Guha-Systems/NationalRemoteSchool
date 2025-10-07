"use client";

// NOTE: Keep comments; user prefers not to delete them

import * as React from "react";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Tabs,
  Tab,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// ---- Demo data (replace with your real data source) ----
const SUBJECTS = {
  Maths: [
    { name: "Algebra", pct: 75 },
    { name: "Geometry", pct: 40 },
    { name: "Calculus", pct: 0 },
  ],
  Science: [
    { name: "Physics", pct: 20 },
    { name: "Chemistry", pct: 10 },
    { name: "Biology", pct: 0 },
  ],
};

const UPCOMING = [
  { title: "Live Math Class", when: "Today, 10:00 AM", cta: "Join" },
  { title: "Science Quiz - Chapter 3", when: "Tomorrow" },
  { title: "Virtual Lab: Plant Growth", when: "Next Week" },
];

// ---- Small helper: progress with label on the right ----
function ProgressRow({ label, value }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="body2" sx={{ mb: 0.75 }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LinearProgress
          variant="determinate"
          color="info"
          value={value}
          sx={{ flex: 1, height: 8, borderRadius: 4 }}
        />
        <Typography variant="caption" sx={{ minWidth: 32, textAlign: "right" }}>
          {value}%
        </Typography>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = React.useState("Maths");
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setUserName(storedName || "Student");
  }, []);
  const subjectList = SUBJECTS[tab] || [];

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Welcome {userName}!
      </Typography>
      <Grid container spacing={2}>
        {/* ---------- Left: Subjects & Progress ---------- */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardHeader
              title="Subjects & Progress"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                textColor="warning"
                variant={isSm ? "fullWidth" : "standard"}
                sx={{ mb: 2 }}
              >
                <Tab label="Maths" value="Maths" />
                <Tab label="Science" value="Science" />
              </Tabs>

              {subjectList.map((s) => (
                <ProgressRow key={s.name} label={s.name} value={s.pct} />
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* ---------- Right: Upcoming Schedule ---------- */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardHeader
              title="Upcoming Schedule"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <List disablePadding>
                {UPCOMING.map((ev, i) => (
                  <React.Fragment key={ev.title + i}>
                    {i > 0 && <Divider sx={{ my: 1 }} />}
                    <ListItem
                      disableGutters
                      secondaryAction={
                        ev.cta ? (
                          <Chip
                            label={ev.cta}
                            color="success"
                            size="small"
                            clickable
                          />
                        ) : null
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body1">{ev.title}</Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {ev.when}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* ---------- Virtual Lab / Exploratorium ---------- */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardHeader
              title="Virtual Lab / Exploratorium"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 4 }}>
                  <Typography align="center" variant="body2">
                    Solar
                    <br />
                    System
                  </Typography>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Typography align="center" variant="body2">
                    Build a
                    <br />
                    Circuit
                  </Typography>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Typography align="center" variant="body2">
                    Dissect a
                    <br />
                    Frog
                  </Typography>
                </Grid>
              </Grid>
              <Button fullWidth variant="contained" color="success">
                Launch Lab
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* ---------- Attendance ---------- */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardHeader
              title="Attendance"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: "success.light",
                  color: "success.contrastText",
                  opacity: 0.2, // keep styling light; actual colors come from your theme
                }}
              />
              <Stack spacing={0.5} sx={{ mt: 2 }}>
                <Typography variant="subtitle2">This Week: 5/5 Days</Typography>
                <Typography variant="body2" color="text.secondary">
                  Overall: 92% Present
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ---------- Badges & Achievements ---------- */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardHeader
              title="Badges & Achievements"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Your earned badges will appear here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
