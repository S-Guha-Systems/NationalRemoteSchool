import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import dashboard from "@/img/dashboard.webp";
import { Box, Typography, Grid } from "@mui/material";

export const metadata = {
  title: "Dashboard - National Remote School",
  description: "Dashboard page for National Remote School",
};

export default async function Dashboard() {
  return (
    <Box>
      <LeftAlignedContentModel
        title="Dashboard"
        body="Welcome to the Dashboard"
        imageUrl={dashboard}
      />
      <Typography variant="h4" align="center" gutterBottom>
        Class 1 Books
      </Typography>
      {/* https://drive.google.com/embeddedfolderview?id=FOLDER-ID#grid */}
      <Grid container spacing={3} justifyContent="center" padding={2}>
        <iframe
          src="https://drive.google.com/embeddedfolderview?id=1aDT6tjTuSphPogXWSyetr7kRe9NVbQpQ#grid"
          className="iframecss"
        ></iframe>
      </Grid>
    </Box>
  );
}
