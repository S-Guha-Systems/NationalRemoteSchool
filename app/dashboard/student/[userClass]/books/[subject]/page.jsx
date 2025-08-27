import Link from "next/link";
import BookViewer from "@/components/BookViewer";
import { fetchSingleBook } from "@/lib/Backend";
import { Box, Button, Grid, Typography } from "@mui/material";

export const metadata = {
  title: "Book",
  description: "View the book content",
};

export default async function SingleBook({ params }) {
  const { userClass, subject } = params;

  const books = await fetchSingleBook(userClass, subject);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {userClass} - {subject}
      </Typography>
      <Grid container spacing={2}>
        {books.data.map((book, index) => {
          return (
            <Grid key={index + 1} size={{ xs: 12, sm: 6, md: 4 }}>
              <BookViewer bookName={book.name} bookUrl={book.url} />
              <Box sx={{ mt: 1 }}>
                <Link href={book.url}>
                  <Button variant="outlined" color="warning">
                    Open
                  </Button>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
