// NOTE: Keep comments; user prefers not to delete them
"use client";

import React from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import AssignmentTurnedInRounded from "@mui/icons-material/AssignmentTurnedInRounded";
import PendingActionsRounded from "@mui/icons-material/PendingActionsRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import FunctionsRounded from "@mui/icons-material/FunctionsRounded";
import BiotechRounded from "@mui/icons-material/BiotechRounded";

/**
 * Exam Portal content only (we already have nav/shell).
 */

const UPCOMING_EXAMS = [
  {
    id: "phy-mid",
    title: "Physics: Mid-Term Test",
    date: "10/6/2025 at 03:00 PM",
    durationMins: 90,
    status: "ready", // ready | upcoming
    icon: <ScienceRounded />,
  },
  {
    id: "chem-34",
    title: "Chemistry: Chapter 3 & 4 Quiz",
    date: "10/8/2025 at 11:00 AM",
    durationMins: 45,
    status: "upcoming",
    icon: <BiotechRounded />,
  },
  {
    id: "eng-half",
    title: "English: Half-Yearly Exam",
    date: "10/12/2025 at 09:30 AM",
    durationMins: 120,
    status: "upcoming",
    icon: <AssignmentTurnedInRounded />,
  },
];

const RECENT_RESULTS = [
  {
    id: "maths-ch2",
    title: "Maths: Chapter 2 Test",
    completedOn: "Sep 28, 2025",
    scorePct: 85,
  },
  {
    id: "bio-unit1",
    title: "Biology: Unit 1 Assessment",
    completedOn: "Sep 25, 2025",
    scorePct: 92,
  },
];

const PRACTICE = [
  {
    id: "p-phy",
    subject: "Physics",
    topic: "Kinematics",
    questions: 20,
    icon: <ScienceRounded />,
  },
  {
    id: "p-chem",
    subject: "Chemistry",
    topic: "Atomic Structure",
    questions: 25,
    icon: <BiotechRounded />,
  },
  {
    id: "p-math",
    subject: "Maths",
    topic: "Trigonometry",
    questions: 30,
    icon: <FunctionsRounded />,
  },
];

const StatRow = ({ icon, text }) => (
  <Stack
    direction="row"
    spacing={1.5}
    alignItems="center"
    sx={{ opacity: 0.9, minWidth: 0 }}
  >
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>{icon}</Box>
    <Typography variant="body2" noWrap>
      {text}
    </Typography>
  </Stack>
);

const ExamPortal = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, pb: 6 }}>
      {/* Header */}
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          Exam Portal
        </Typography>
        {/* <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Offline Mode · Last Synced: Yesterday, 8 PM
        </Typography> */}
      </Stack>

      {/* Top grid: Upcoming (left) + Recent Results (right) */}
      <Grid container spacing={3}>
        {/* Upcoming Exams */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1.5 }}>
            Upcoming Exams
          </Typography>

          <Stack spacing={2}>
            {UPCOMING_EXAMS.map((exam) => (
              <Card key={exam.id} variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  {/* Make the row wrap on mobile so the action drops below */}
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      rowGap: 1,
                    }}
                  >
                    <Avatar variant="rounded">{exam.icon}</Avatar>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        noWrap
                        title={exam.title}
                      >
                        {exam.title}
                      </Typography>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 0.5, sm: 2 }}
                        sx={{ mt: 0.5, minWidth: 0 }}
                      >
                        <StatRow
                          icon={<ScheduleRounded fontSize="small" />}
                          text={exam.date}
                        />
                        <StatRow
                          icon={<AccessTimeRounded fontSize="small" />}
                          text={`${exam.durationMins} mins`}
                        />
                      </Stack>
                    </Box>

                    {/* Action area: full-width on xs to avoid overlap */}
                    <Box
                      sx={{
                        width: { xs: "100%", sm: "auto" },
                        display: "flex",
                        justifyContent: { xs: "flex-end", sm: "flex-start" },
                        mt: { xs: 1, sm: 0 },
                      }}
                    >
                      {exam.status === "ready" ? (
                        <Button
                          fullWidth={isSm}
                          size={isSm ? "small" : "medium"}
                          variant="contained"
                          color="success"
                          startIcon={<PlayArrowRounded />}
                        >
                          Start Exam
                        </Button>
                      ) : (
                        <Chip
                          color="warning"
                          variant="outlined"
                          size="small"
                          icon={<PendingActionsRounded />}
                          label="Upcoming"
                        />
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Recent Results */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1.5 }}>
            Recent Results
          </Typography>

          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <List disablePadding>
              {RECENT_RESULTS.map((r, idx) => (
                <Box key={r.id}>
                  <ListItem
                    sx={{
                      alignItems: "flex-start",
                      px: { xs: 2, sm: 2.5 },
                      py: 2,
                      // make room for the secondary action on narrow screens
                      pr: { xs: 16, sm: 2.5 },
                    }}
                    secondaryAction={
                      <Stack
                        alignItems="flex-end"
                        spacing={1}
                        sx={{ minWidth: 80 }}
                      >
                        <Typography variant="h6" fontWeight={800}>
                          {r.scorePct}%
                        </Typography>
                        <Button size="small" variant="text">
                          Review Answers
                        </Button>
                      </Stack>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar variant="rounded">
                        <AssignmentTurnedInRounded />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight={700}>
                          {r.title}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{ display: "block", mt: 0.5 }}
                        >
                          Completed on {r.completedOn}
                        </Typography>
                      }
                    />
                  </ListItem>

                  <Box sx={{ px: { xs: 2, sm: 2.5 }, pb: 1.5 }}>
                    <LinearProgress
                      variant="determinate"
                      color="error"
                      value={r.scorePct}
                      sx={{ borderRadius: 999 }}
                    />
                  </Box>

                  {idx < RECENT_RESULTS.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Practice Tests */}
      <Typography variant="h6" fontWeight={800} sx={{ mt: 4, mb: 1.5 }}>
        Practice Tests
      </Typography>

      <Grid container spacing={3}>
        {PRACTICE.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar variant="rounded">{p.icon}</Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={800} noWrap>
                      {p.subject}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {p.topic}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                  {p.questions} Questions
                </Typography>
              </CardContent>
              <CardActions sx={{ p: { xs: 2, sm: 2.5 }, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  startIcon={<PlayArrowRounded />}
                >
                  Start Practice
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExamPortal;
