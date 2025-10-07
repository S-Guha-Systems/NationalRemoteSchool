"use client";

import * as React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";

const subjectsData = [
  {
    name: "Physics",
    progress: 75,
    chapters: [
      { title: "Units and Measurements", status: "Completed" },
      { title: "Motion in a Straight Line", status: "In Progress" },
      { title: "Laws of Motion", status: "Not Started" },
    ],
  },
  {
    name: "Chemistry",
    progress: 60,
    chapters: [
      { title: "Some Basic Concepts of Chemistry", status: "Completed" },
      { title: "Structure of Atom", status: "Completed" },
      { title: "Classification of Elements", status: "In Progress" },
    ],
  },
  {
    name: "Biology",
    progress: 85,
    chapters: [
      { title: "The Living World", status: "Completed" },
      { title: "Biological Classification", status: "Completed" },
      { title: "Plant Kingdom", status: "In Progress" },
    ],
  },
  {
    name: "English",
    progress: 90,
    chapters: [
      { title: "The Last Lesson", status: "Completed" },
      { title: "Lost Spring", status: "Completed" },
      { title: "Deep Water", status: "In Progress" },
    ],
  },
];

const getChipColor = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "warning";
    default:
      return "info";
  }
};

export default function MySubjects() {
  const [baseUrl, setBaseUrl] = React.useState("");

  React.useEffect(() => {
    setBaseUrl(localStorage.getItem("userDbUrl") || "");
  }, []);
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        My Subjects
      </Typography>

      <Grid container spacing={3}>
        {subjectsData.map((subj) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={subj.name}>
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 4,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {subj.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  Progress
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress
                      variant="buffer"
                      value={subj.progress}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                      }}
                      color="info"
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">
                      {`${subj.progress}%`}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Chapter Status
                </Typography>

                <Stack spacing={1} sx={{ mb: 2 }}>
                  {subj.chapters.map((ch, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2">{ch.title}</Typography>
                      <Chip
                        label={ch.status}
                        size="small"
                        color={getChipColor(ch.status)}
                        sx={{
                          fontWeight: 500,
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
                <Link href={`${baseUrl}/subjects/${subj.name}`}>
                  <Button fullWidth variant="contained" color="info">
                    View
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
