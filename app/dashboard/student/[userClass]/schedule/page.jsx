"use client";

import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

// ---- Demo events (replace with your data source) ----
const EVENTS = [
  {
    title: "Live Math Class",
    date: "2025-10-06",
    time: "10:00 AM",
    color: "success.main",
    where: "Room A / Meet",
  },
  {
    title: "Science Quiz - Chapter 3",
    date: "2025-10-07",
    time: "All Day",
    color: "info.main",
  },
  {
    title: "Virtual Lab: Plant Growth",
    date: "2025-10-10",
    time: "2:00 PM",
    color: "secondary.main",
    where: "Lab 2",
  },
  {
    title: "English Grammar Review",
    date: "2025-10-15",
    time: "11:00 AM",
    color: "success.main",
  },
  {
    title: "Diwali Holiday",
    date: "2025-10-21",
    time: "All Day",
    color: "warning.main",
  },
  {
    title: "History Project Due",
    date: "2025-10-28",
    time: "4:00 PM",
    color: "info.main",
  },
];

// helpers
const yyyymmdd = (y, m, d) =>
  `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export default function Schedule() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // 0..599
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const year = 2025;
  const month = 10; // October
  const monthLabel = "October 2025";

  // Month grid calc
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = Array.from({ length: firstWeekday + daysInMonth }, (_, i) =>
    i < firstWeekday ? null : i - firstWeekday + 1
  );

  // Modal state
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedEvents, setSelectedEvents] = React.useState([]);

  const openDayModal = (day) => {
    const key = yyyymmdd(year, month, day);
    const items = EVENTS.filter((e) => e.date === key);
    if (!items.length) return;
    setSelectedDate(key);
    setSelectedEvents(items);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setSelectedDate("");
    setSelectedEvents([]);
  };

  // lookup map for dots
  const eventsByDay = React.useMemo(() => {
    const map = new Map();
    EVENTS.forEach((e) => {
      const d = Number(e.date.split("-")[2]);
      if (!map.has(d)) map.set(d, []);
      map.get(d).push(e);
    });
    return map;
  }, []);

  // responsive cell size (no aspectRatio so it fits tiny screens)
  const cellSize = isXs ? 36 : isMdDown ? 44 : 80;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant={isXs ? "h5" : "h4"} fontWeight={700} gutterBottom>
        Schedule
      </Typography>

      <Grid container spacing={3}>
        {/* Calendar */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant={isXs ? "subtitle1" : "h6"} fontWeight={600}>
                {monthLabel}
              </Typography>
              <Tooltip title="Static demo month (wire to your data)">
                <IconButton size="small">
                  <InfoOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>

            {/* Week header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                mb: 1,
                color: "text.secondary",
                fontWeight: 600,
                textAlign: "center",
                fontSize: { xs: 12, sm: 13 },
              }}
            >
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <Box key={d}>{d}</Box>
              ))}
            </Box>

            {/* Days */}
            <Box
              sx={{
                "--cell": `${cellSize}px`,
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                gridAutoRows: "var(--cell)",
                gap: 1,
              }}
            >
              {cells.map((day, i) => {
                const has = day && eventsByDay.has(day);
                const items = has ? eventsByDay.get(day) : [];
                const isToday =
                  day === new Date().getDate() &&
                  month === new Date().getMonth() + 1 &&
                  year === new Date().getFullYear();

                return (
                  <Paper
                    key={i}
                    sx={{
                      height: "var(--cell)",
                      p: 1,
                      borderRadius: 2,
                      position: "relative",
                      bgcolor: isToday
                        ? "action.selected"
                        : "background.default",
                      opacity: day ? 1 : 0.35,
                      overflow: "hidden",
                    }}
                  >
                    {day && (
                      <>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          sx={{ fontSize: { xs: 12, sm: 13 } }}
                        >
                          {day}
                        </Typography>

                        {/* Clickable dots (bigger touch target) */}
                        {has && (
                          <Box
                            onClick={() => openDayModal(day)}
                            role="button"
                            tabIndex={0}
                            sx={{
                              position: "absolute",
                              left: "50%",
                              bottom: 6,
                              transform: "translateX(-50%)",
                              display: "flex",
                              gap: 0.5,
                              cursor: "pointer",
                              px: 1,
                              py: 0.5,
                              borderRadius: 999,
                              "&:focus-visible": {
                                outline: `2px solid ${theme.palette.primary.main}`,
                              },
                            }}
                          >
                            {items.slice(0, 3).map((e, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  width: isXs ? 7 : 8,
                                  height: isXs ? 7 : 8,
                                  borderRadius: "50%",
                                  bgcolor: e.color,
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </>
                    )}
                  </Paper>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        {/* Upcoming Events */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={3}
            sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, height: "100%" }}
          >
            <Typography
              variant={isXs ? "subtitle1" : "h6"}
              fontWeight={600}
              gutterBottom
            >
              Upcoming Events
            </Typography>
            <Divider sx={{ mb: 1 }} />

            <List dense>
              {EVENTS.map((e, i) => (
                <ListItem
                  key={i}
                  disableGutters
                  sx={{ py: 0.5 }}
                  onClick={() => openDayModal(Number(e.date.split("-")[2]))}
                  button
                >
                  <Avatar
                    sx={{ width: 25, height: 25, bgcolor: e.color, mr: 2 }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        fontWeight={600}
                        sx={{ fontSize: { xs: 14, sm: 15 } }}
                      >
                        {e.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {new Date(e.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                        {e.time ? `, ${e.time}` : ""}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Modal (fullScreen on phones) */}
      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        // fullScreen={isXs}
      >
        <DialogTitle>
          Events on{" "}
          {selectedDate &&
            new Date(selectedDate).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </DialogTitle>
        <DialogContent dividers>
          {selectedEvents.length === 0 ? (
            <Typography color="text.secondary">No events.</Typography>
          ) : (
            <List dense>
              {selectedEvents.map((e, idx) => (
                <React.Fragment key={idx}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: e.color,
                        mr: 2,
                        mt: 1,
                      }}
                    />
                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography fontWeight={700}>{e.title}</Typography>
                          {e.time?.toLowerCase().includes("all day") && (
                            <Chip size="small" label="All Day" />
                          )}
                          <Box sx={{display:"flex" ,marginLeft:"auto" }}>
                            <Link href="#">
                              <Button size="small" variant="contained" color="success">Join</Button>
                            </Link>
                          </Box>
                        </Stack>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {e.time || "—"}
                          {e.where ? ` • ${e.where}` : ""}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {idx < selectedEvents.length - 1 && (
                    <Divider sx={{ my: 1 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="success" variant="outlined" onClick={closeModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
