import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import { Box, Grid, Typography } from "@mui/material";
import GlobalCard from "@/components/GlobalCard";
import features from "@/img/features.webp";
import smart from "@/img/smart.webp";
import real from "@/img/real.webp";
import budget from "@/img/budget.webp";
import cultural from "@/img/cultural.webp";
import sustainable from "@/img/sustainable.webp";
import healthcare from "@/img/healthcare.webp";

export const metadata = {
  title: "Features",
  description:
    "Discover the impactful features of National Remote School that make education accessible, inclusive, and free for every child.",
};

const featureList = [
  {
    title: "Interactive Online Classes",
    quote: "Learn anytime, anywhere",
    imageUrl: smart,
    description:
      "Our platform offers live and recorded classes for students up to 12th grade. Children can revisit lessons anytime, ensuring flexible and accessible learning.",
  },
  {
    title: "Real-Time Doubt Assistance",
    quote: "Every question matters",
    imageUrl: real,
    description:
      "Students can get instant doubt clarification through dedicated mentors and peer-learning groups, ensuring no one is left behind.",
  },
  {
    title: "Accessible & Free Resources",
    quote: "Education without barriers",
    imageUrl: budget,
    description:
      "We provide free textbooks, notes, assignments, and practice papers online so that every child, regardless of background, has equal access to resources.",
  },
  {
    title: "Multilingual Learning Support",
    quote: "Learn in the language you love",
    imageUrl: cultural,
    description:
      "To make learning inclusive, we provide resources in multiple regional languages, respecting cultural diversity and making concepts easier to grasp.",
  },
  {
    title: "Tech-Enabled & Sustainable Education",
    quote: "Smart learning for a smarter future",
    imageUrl: sustainable,
    description:
      "Through e-learning platforms, cloud resources, and digital classrooms, we reduce dependency on physical infrastructure, making education scalable and eco-friendly.",
  },
  {
    title: "Health & Wellbeing Awareness",
    quote: "Strong minds, healthy lives",
    imageUrl: healthcare,
    description:
      "Beyond academics, National Remote School emphasizes health education, wellbeing sessions, and awareness programs to nurture holistic student growth.",
  },
];

const Features = () => {
  return (
    <Box>
      <LeftAlignedContentModel
        title="Features That Empower Learning"
        body="National Remote School is equipped with impactful features designed to make education free, accessible, and engaging. From real-time guidance to multilingual resources, we empower students to learn and grow without limits."
        imageUrl={features}
      />

      <Typography variant="h2" sx={{ mt: 4, textAlign: "center" }}>
        Explore Our Key Features Designed For Every Child:
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {featureList.map((feature, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <GlobalCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
