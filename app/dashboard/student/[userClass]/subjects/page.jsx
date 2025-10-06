"use client";

// NOTE: Keep comments; user prefers not to delete them

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// ---- MUI ----
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  useTheme,
} from "@mui/material";

import NcertSubjects from "@/components/NcertSubjects";

// ---- Helpers ----
const toTitleCase = (s = "") =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

const displayLabel = (subject) => toTitleCase(subject);
const subjectToPath = (subject) => encodeURIComponent(toTitleCase(subject));

const Subjects = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const [baseUrl, setBaseUrl] = React.useState("");

  React.useEffect(() => {
    setBaseUrl(localStorage.getItem("userDbUrl") || "");
  }, []);

  // Example path: /dashboard/student/CLASS-1/subjects
  const parts = pathname.split("/").filter(Boolean);
  const className = parts[2] || "CLASS-1";

  // Find the record for the current class (case-insensitive)
  const record =
    NcertSubjects.find(
      (r) => (r.class || "").toLowerCase() === className.toLowerCase()
    ) || null;

  const subjects = Array.isArray(record?.subjects) ? record.subjects : [];

  // Rotate MUI palette colors for cards
  const colorList = [
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Subjects
      </Typography>

      <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 2 }}>
        {record
          ? `Showing subjects for ${record.class}`
          : `No match for ${className}`}
      </Typography>

      {!record && (
        <Paper sx={{ p: 2 }}>
          <Typography>No subjects found for this class.</Typography>
        </Paper>
      )}

      {record && (
        <Grid container spacing={2}>
          {subjects.map((subj, idx) => {
            const label = displayLabel(subj);
            const href = `${baseUrl}/subjects/${subjectToPath(subj)}`;
            const bgColor = colorList[idx % colorList.length];

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${subj}-${idx}`}>
                <Link href={href}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 2,
                      boxShadow: 3,
                      backgroundColor: bgColor,
                      color: theme.palette.getContrastText(bgColor),
                      transition: "all 0.25s ease-in-out",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardActionArea sx={{ height: "100%" }}>
                      <CardContent sx={{ textAlign: "center", py: 4 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            textTransform: "capitalize",
                          }}
                        >
                          {label}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Subjects;
