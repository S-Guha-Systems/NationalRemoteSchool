import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import dashboard from "@/img/dashboard.webp";
import { Box } from "@mui/material";

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
    </Box>
  );
}
