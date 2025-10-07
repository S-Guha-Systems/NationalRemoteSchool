"use client";

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

const Achievements = () => {
  const unlockedAchievements = [
    {
      title: "Perfect Start",
      type: "Common",
      description: "Completed your first lesson.",
      date: "Sep 1, 2025",
    },
    {
      title: "Math Whiz",
      type: "Rare",
      description: "Scored 90% or more on a Math quiz.",
      date: "Sep 15, 2025",
    },
    {
      title: "Lab Explorer",
      type: "Common",
      description: "Completed your first virtual lab.",
      date: "Sep 20, 2025",
    },
    {
      title: "Weekly Warrior",
      type: "Rare",
      description: "Completed lessons for 7 consecutive days.",
      date: "Sep 22, 2025",
    },
    {
      title: "Bookworm",
      type: "Common",
      description: "Read 5 articles from the resource library.",
      date: "Oct 2, 2025",
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Achievements
      </Typography>

      {/* Stats */}
      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                Achievements Unlocked
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                5 / 8
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                Achievement Points
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                110
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Unlocked Achievements */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Unlocked
      </Typography>

      <Grid container spacing={2}>
        {unlockedAchievements.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Chip
                    label={item.type}
                    size="small"
                    sx={{
                      bgcolor:
                        item.type === "Rare"
                          ? "rgba(99, 102, 241, 0.2)"
                          : "rgba(156, 163, 175, 0.2)",
                      color: item.type === "Rare" ? "#818cf8" : "#9ca3af",
                      fontWeight: 600,
                    }}
                  />
                </Stack>
                <Typography variant="body2" color="#9ca3af" mt={1.2}>
                  {item.description}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ mt: 1.5, color: "#6b7280" }}
                >
                  Unlocked: {item.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Achievements;
