"use client";

// NOTE: Keep comments; user prefers not to delete them

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
} from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";

// ---- Demo data (wire up to your API/store later) ----
const METRICS = [
  { label: "Total Students", value: "125" },
  { label: "Avg. Attendance", value: "92%" },
  { label: "Avg. Score", value: "85%" },
];

const SCHEDULE = [
  { subject: "Physics", topic: "Newton's Laws", time: "10:00 AM" },
  { subject: "Maths", topic: "Trigonometry", time: "11:30 AM" },
  { subject: "English", topic: "Poetry Analysis", time: "2:00 PM" },
];

const NEEDS_ATTENTION = [
  { name: "Rohan Sharma", note: "Missed 2+ assignments", initials: "RS" },
  { name: "Priya Singh", note: "Score dropped by 15%", initials: "PS" },
  { name: "Amit Kumar", note: "Low attendance (70%)", initials: "AK" },
];

const Dot = () => (
  <Box
    component="span"
    sx={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      bgcolor: "action.disabled",
      display: "inline-block",
      mr: 2,
      flex: "0 0 auto",
    }}
  />
);

const Overview = () => {
  const handleStart = (subject) => {
    // TODO: navigate to your class room path or trigger live session
    // Example: router.push(`/classroom/${subject.toLowerCase()}`)
    console.log("Start Class:", subject);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Overview
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {METRICS.map((m) => (
          <Grid size={{ xs: 12, sm: 4 }} key={m.label}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">{m.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {m.value}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Body: Schedule (left) + Needs Attention (right) */}
      <Grid container spacing={3}>
        {/* Today's Schedule */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                Today&apos;s Schedule
              </Typography>
              <Divider sx={{ mb: 1 }} />

              <List disablePadding>
                {SCHEDULE.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem
                      disableGutters
                      secondaryAction={
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<PlayArrowRounded />}
                          onClick={() => handleStart(item.subject)}
                        >
                          Start Class
                        </Button>
                      }
                      sx={{ py: 1.5 }}
                    >
                      <Dot />
                      <ListItemText
                        primary={
                          <Box>
                            <Typography component="span" fontWeight={700}>
                              {item.subject}
                            </Typography>
                            <Typography component="span">
                              : {item.topic}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {item.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {idx !== SCHEDULE.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Needs Attention */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                Needs Attention
              </Typography>
              <Divider sx={{ mb: 1 }} />

              <Stack spacing={2}>
                {NEEDS_ATTENTION.map((s) => (
                  <Stack
                    key={s.name}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <Avatar bgcolor="success">{s.initials}</Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={700} noWrap>
                        {s.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {s.note}
                      </Typography>
                    </Box>
                    {/* Optional tag at end (kept simple) */}
                    {/* <Chip size="small" label="View" variant="outlined" /> */}
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
