// NOTE: Keep comments; user prefers not to delete them
"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Stack,
  Grid,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Avatar,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Divider,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchRounded from "@mui/icons-material/SearchRounded";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import MessageRounded from "@mui/icons-material/MessageRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";

// ---- Demo data (replace with your API) ----
const STUDENTS = [
  {
    id: 1,
    name: "Rohan Sharma",
    classLabel: "12th",
    stream: "Science (PCM)",
    attendance: 95,
    avgScore: 88,
    performance: "Excellent",
  },
  {
    id: 2,
    name: "Priya Singh",
    classLabel: "12th",
    stream: "Science (PCM)",
    attendance: 82,
    avgScore: 76,
    performance: "Average",
  },
  {
    id: 3,
    name: "Amit Kumar",
    classLabel: "12th",
    stream: "Science (PCM)",
    attendance: 70,
    avgScore: 65,
    performance: "At Risk",
  },
  {
    id: 4,
    name: "Sneha Patel",
    classLabel: "12th",
    stream: "Science (PCM)",
    attendance: 98,
    avgScore: 94,
    performance: "Excellent",
  },
  {
    id: 5,
    name: "Vikram Rathore",
    classLabel: "11th",
    stream: "Commerce",
    attendance: 89,
    avgScore: 81,
    performance: "Average",
  },
];

// ---- Helper to get initials for Avatar ----
const initials = (fullName = "") =>
  fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// ---- Map performance -> chip color ----
const perfChip = (p) => {
  if (p === "Excellent") return { color: "success", label: "Excellent" };
  if (p === "Average") return { color: "info", label: "Average" };
  return { color: "error", label: "At Risk" };
};

const classOptions = ["ALL", "11th", "12th"];
const perfOptions = ["ALL", "Excellent", "Average", "At Risk"];

const Students = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ---- UI state ----
  const [classFilter, setClassFilter] = useState("ALL");
  const [perfFilter, setPerfFilter] = useState("ALL");
  const [q, setQ] = useState("");
  const [snack, setSnack] = useState({ open: false, msg: "" });

  // ---- Derived rows with search + filters ----
  const rows = useMemo(() => {
    return STUDENTS.filter((s) => {
      const matchesClass =
        classFilter === "ALL" || s.classLabel === classFilter;
      const matchesPerf = perfFilter === "ALL" || s.performance === perfFilter;
      const matchesQ =
        !q ||
        s.name.toLowerCase().includes(q.toLowerCase()) ||
        s.stream.toLowerCase().includes(q.toLowerCase()) ||
        s.classLabel.toLowerCase().includes(q.toLowerCase());
      return matchesClass && matchesPerf && matchesQ;
    });
  }, [classFilter, perfFilter, q]);

  // ---- Actions ----
  const handleView = (s) =>
    setSnack({ open: true, msg: `Open profile • ${s.name}` });
  const handleMessage = (s) =>
    setSnack({ open: true, msg: `Open chat • ${s.name}` });

  return (
    <Box p={{ xs: 2, md: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h4" fontWeight={700}>
          Student Roster
        </Typography>

        {/* Top-right greeting (optional) */}
        {/* <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body1">Hello, Priya!</Typography>
          <Box sx={{ width: 8, height: 8, bgcolor: "success.main", borderRadius: "50%" }} />
          <Avatar sx={{ width: 36, height: 36 }}>P</Avatar>
        </Stack> */}
      </Stack>

      {/* Controls */}
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid size={{ xs: 12, sm: 4, md: 6 }}>
          <FormControl fullWidth>
            <OutlinedInput
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search students..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <FormControl fullWidth sx={{ minWidth: 180 }}>
            <Select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              displayEmpty
            >
              {classOptions.map((c) => (
                <MenuItem key={c} value={c}>
                  {c === "ALL" ? "Select Class" : c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <FormControl fullWidth sx={{ minWidth: 220 }}>
            <Select
              value={perfFilter}
              onChange={(e) => setPerfFilter(e.target.value)}
              displayEmpty
            >
              {perfOptions.map((p) => (
                <MenuItem key={p} value={p}>
                  {p === "ALL" ? "Filter by Performance" : p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Content */}
      {!isMobile ? (
        // ---- Desktop: table layout ----
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 56 }} />
                <TableCell>STUDENT NAME</TableCell>
                <TableCell>CLASS</TableCell>
                <TableCell align="right">ATTENDANCE</TableCell>
                <TableCell align="right">AVG. SCORE</TableCell>
                <TableCell>PERFORMANCE</TableCell>
                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((s) => {
                const chip = perfChip(s.performance);
                return (
                  <TableRow hover key={s.id}>
                    <TableCell>
                      <Avatar>{initials(s.name)}</Avatar>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <Typography fontWeight={600}>{s.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {s.classLabel}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {s.stream}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{s.attendance}%</TableCell>
                    <TableCell align="right">{s.avgScore}%</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        color={chip.color}
                        label={chip.label}
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Tooltip title="View Profile">
                          <IconButton onClick={() => handleView(s)}>
                            <VisibilityRounded />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Message">
                          <IconButton onClick={() => handleMessage(s)}>
                            <MessageRounded />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More">
                          <IconButton>
                            <MoreVertRounded />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      No students match your filters.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // ---- Mobile: stacked cards (fixes mobile overflow) ----
        <Stack spacing={2}>
          {rows.map((s) => {
            const chip = perfChip(s.performance);
            return (
              <Paper key={s.id} variant="outlined">
                <Box p={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar>{initials(s.name)}</Avatar>
                    <Box flex={1}>
                      <Typography fontWeight={700}>{s.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {s.classLabel} • {s.stream}
                      </Typography>
                    </Box>
                    <Chip size="small" color={chip.color} label={chip.label} />
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Attendance
                      </Typography>
                      <Typography>{s.attendance}%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Avg. Score
                      </Typography>
                      <Typography>{s.avgScore}%</Typography>
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={1.5} mt={1.5}>
                    <Button
                      size="small"
                      startIcon={<VisibilityRounded />}
                      onClick={() => handleView(s)}
                    >
                      View Profile
                    </Button>
                    <Button
                      size="small"
                      startIcon={<MessageRounded />}
                      onClick={() => handleMessage(s)}
                    >
                      Message
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            );
          })}
          {rows.length === 0 && (
            <Typography align="center" color="text.secondary" py={4}>
              No students match your filters.
            </Typography>
          )}
        </Stack>
      )}

      {/* Feedback snackbar (fake actions) */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack({ open: false, msg: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setSnack({ open: false, msg: "" })}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Students;
