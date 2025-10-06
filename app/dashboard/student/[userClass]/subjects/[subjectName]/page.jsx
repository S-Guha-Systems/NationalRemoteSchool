"use client";

// NOTE: Keep comments; user prefers not to delete them

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// ---- MUI ----
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  useTheme,
} from "@mui/material";

// ---- Icons ----
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import QuizIcon from "@mui/icons-material/Quiz";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ListAltIcon from "@mui/icons-material/ListAlt";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

// ---- Helpers ----
const toTitleCase = (s = "") =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

const SingleSubjectOptions = () => {
  const pathname = usePathname();
  const theme = useTheme();

  // Example: /dashboard/student/CLASS-1/subjects/English
  const parts = pathname.split("/").filter(Boolean);
  const className = parts[2] || "CLASS-1";
  const subjectRaw = parts[4] || "English";
  const subject = decodeURIComponent(subjectRaw);

  // Where to navigate for each option
  // If your routes differ, just adjust the "href" patterns here.
  const base = `/dashboard/student/${className}/subjects/${encodeURIComponent(
    subject
  )}`;
  const options = [
    {
      key: "books",
      label: "Books",
      icon: <MenuBookIcon fontSize="large" />,
      href: `${base}/book`,
    },
    {
      key: "notes",
      label: "Notes",
      icon: <DescriptionIcon fontSize="large" />,
      href: `${base}/notes`,
    },
    {
      key: "papers",
      label: "Question Papers",
      icon: <QuizIcon fontSize="large" />,
      href: `${base}/question-papers`,
    },
    {
      key: "solutions",
      label: "Solutions",
      icon: <FactCheckIcon fontSize="large" />,
      href: `${base}/solutions`,
    },
    {
      key: "syllabus",
      label: "Syllabus",
      icon: <ListAltIcon fontSize="large" />,
      href: `${base}/syllabus`,
    },
    {
      key: "videos",
      label: "Videos",
      icon: <VideoLibraryIcon fontSize="large" />,
      href: `${base}/videos`,
    },
  ];

  // Rotate MUI theme colors for backgrounds
  const colorList = [
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {toTitleCase(subject)} — Options
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 2 }}>
        Class: {className}
      </Typography>

      <Grid container spacing={2}>
        {options.map((opt, idx) => {
          const bg = colorList[idx % colorList.length];
          const fg = theme.palette.getContrastText(bg);

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={opt.key}>
              <Link href={opt.href} passHref style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: bg,
                    color: fg,
                    transition: "all 0.25s ease-in-out",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardActionArea sx={{ height: "100%" }}>
                    <CardContent
                      sx={{
                        textAlign: "center",
                        py: 5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {opt.icon}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, textTransform: "capitalize" }}
                      >
                        {opt.label}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SingleSubjectOptions;
