"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { useState } from "react";

// Sample data for labs
const LABS = [
  {
    subject: "Physics",
    title: "Ohm's Law Verification",
    level: "Beginner",
    description:
      "Verify the relationship between voltage, current, and resistance by building and testing your own virtual circuits.",
    featured: true,
    color: "#B197FC",
  },
  {
    id: "ohms-law",
    subject: "Physics",
    title: "Ohm's Law Verification",
    level: "Beginner",
    description:
      "Verify the relationship between voltage, current, and resistance by building and testing your own virtual circuits.",
    color: "#B197FC",
  },
  {
    id: "titration",
    subject: "Chemistry",
    title: "Titration Experiment",
    level: "Intermediate",
    description:
      "Learn acid–base titration by neutralizing HCl with NaOH to find its concentration using a virtual burette and indicator.",
    color: "#74C0FC",
  },

  {
    id: "frog-dissection",
    subject: "Biology",
    title: "Frog Dissection",
    level: "Beginner",
    description:
      "Explore amphibian anatomy in a humane way. Identify organs and understand their functions without harming a live animal.",
    color: "#63E6BE",
  },
  {
    id: "projectile",
    subject: "Physics",
    title: "Projectile Motion Simulator",
    level: "Intermediate",
    description:
      "Simulate launch angle, initial velocity, and gravity to visualize trajectories and learn kinematics.",
    color: "#B197FC",
  },
  {
    id: "photosynthesis",
    subject: "Biology",
    title: "Photosynthesis Rate Study",
    level: "Intermediate",
    description:
      "Vary light intensity and CO₂ to measure oxygen output and understand limiting factors.",
    color: "#63E6BE",
  },
  {
    id: "chemical-equilibrium",
    subject: "Chemistry",
    title: "Chemical Equilibrium",
    level: "Advanced",
    description:
      "Manipulate temperature and concentration to observe Le Châtelier’s principle in action.",
    color: "#74C0FC",
  },
];

const subjects = ["All", "Physics", "Chemistry", "Biology"];

export default function VirtualLabs() {
  const [filter, setFilter] = useState("All");

  const filteredLabs =
    filter === "All" ? LABS : LABS.filter((lab) => lab.subject === filter);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Virtual Labs
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Explore the world of science through interactive experiments.
      </Typography>

      {/* Featured Lab */}
      {LABS.filter((l) => l.featured).map((lab) => (
        <Box
          key={lab.title}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            bgcolor: "background.paper",
            borderRadius: 3,
            mb: 4,
            p: 2,
            boxShadow: 3,
            gap: 3,
          }}
        >
          <Box
            sx={{
              flex: "0 0 200px",
              height: 140,
              bgcolor: lab.color,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 22,
              fontWeight: 600,
              px: 2,
            }}
          >
            {lab.subject} Lab
          </Box>

          <Box flex={1}>
            <Typography
              variant="subtitle2"
              color="warning.main"
              sx={{ mb: 0.5 }}
            >
              FEATURED LAB
            </Typography>
            <Typography variant="h5" fontWeight="bold" mb={1}>
              {lab.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {lab.description}
            </Typography>
            <Button variant="contained" color="warning">
              Launch Lab
            </Button>
          </Box>
        </Box>
      ))}

      {/* Filter */}
      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
        {subjects.map((subj) => (
          <Chip
            key={subj}
            label={subj}
            clickable
            color={filter === subj ? "success" : "default"}
            onClick={() => setFilter(subj)}
          />
        ))}
      </Stack>

      {/* Labs Grid */}
      <Grid container spacing={3}>
        {filteredLabs.map((lab, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={idx}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  bgcolor: lab.color,
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {lab.subject} Lab
              </Box>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {lab.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {lab.description}
                </Typography>
                <Stack direction="row" spacing={1} mt={1}>
                  <Chip
                    label={lab.subject}
                    size="small"
                    color="success"
                    variant="contained"
                  />
                  <Chip
                    label={lab.level}
                    size="small"
                    color="info"
                    variant="outlined"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
