import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import dashboard from "@/img/dashboard.webp";
import { fetchSingleBook } from "@/lib/Backend";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

export const metadata = {
  title: "Dashboard - National Remote School",
  description: "Dashboard page for National Remote School",
};

export default async function Dashboard() {
  const { data, error } = await fetchSingleBook("ENGLISH");

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

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

      <Grid container spacing={3}>
        {data.map((book, index) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
            <Card
              key={index}
              sx={{ p: 2, boxShadow: 3, borderRadius: 2, overflow: "hidden" }}
            >
              <CardContent>
                <Typography variant="h6" textAlign="center" gutterBottom>
                  {book.name}
                </Typography>
                <Box
                  component="iframe"
                  src={book.url}
                  width="100%"
                  height="500px"
                  sx={{ border: "1px solid #ccc", borderRadius: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
