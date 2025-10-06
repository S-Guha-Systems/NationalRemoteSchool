"use client";

// NOTE: Keep comments; user prefers not to delete them

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Image from "next/image";
import NcertSubjects from "@/components/NcertSubjects";

export default function BookViewer() {
  const pathname = usePathname();

  // Example pathname: /dashboard/student/CLASS-1/subjects/English
  const parts = pathname.split("/").filter(Boolean);
  const className = parts[2] || "CLASS-1";
  const subjectRaw = parts[4] || "English";
  const subject = decodeURIComponent(subjectRaw);

  // ---------- FIND SUBJECT END PAGE NUMBER FROM NcertSubjects ----------
  const classData = NcertSubjects.find((item) => item.class === className);

  // fallback in case class or subject not found
  const end = classData?.subjectsEndPageNo?.[subject] ?? 100; // fallback default if missing
  const start = 0;

  // ---------- HELPERS TO MATCH YOUR DISK STRUCTURE ----------
  // Folder is "Class-1", not "CLASS-1"
  const toClassFolder = (c) =>
    String(c)
      .replace(/^class-/i, "Class-")
      .replace(/^CLASS-/i, "Class-");

  // Subject folder is TitleCase ("English"), file base is UPPER_SNAKE ("ENGLISH")
  const toTitleCase = (s) =>
    String(s)
      .toLowerCase()
      .replace(/\b\w/g, (ch) => ch.toUpperCase());
  const toUpperSnake = (s) =>
    String(s).trim().replace(/\s+/g, "_").toUpperCase();

  const folderClass = toClassFolder(className); // e.g., Class-1
  const folderSubject = toTitleCase(subject); // e.g., English
  const fileBase = toUpperSnake(subject); // e.g., ENGLISH

  // ---------- GENERATE IMAGE URLS (MATCHING YOUR FOLDERS/FILES) ----------
  const images = Array.from({ length: end - start + 1 }, (_, i) => {
    const num = String(start + i).padStart(2, "0"); // ENGLISH_00.png, ENGLISH_01.png, ...
    return `/Books/${folderClass}/${folderSubject}/${fileBase}_${num}.png`;
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handlePrevious = () => setActiveStep((prev) => prev - 1);

  return (
    <Box>
      <Card>
        <CardActionArea>
          <Image
            width={1000}
            height={1000}
            // If your host can't run the optimizer, uncomment the next line:
            // unoptimized
            src={images[activeStep]}
            alt={`${subject} page ${activeStep + 1}`}
            className="bookImage"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {subject} — Page {activeStep + 1}/{maxSteps}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Navigation Buttons */}
      <Button
        variant="outlined"
        color="warning"
        fullWidth
        onClick={handlePrevious}
        disabled={activeStep === 0}
        sx={{ mt: 2 }}
      >
        Previous
      </Button>

      <Button
        variant="outlined"
        fullWidth
        color="success"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
        sx={{ mt: 2, mb: 4 }}
      >
        Next
      </Button>
    </Box>
  );
}
