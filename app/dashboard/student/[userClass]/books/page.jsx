"use client";

import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import SimpleCard from "@/components/SimpleCard";
import books from "@/img/books.webp";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
const bookItems = [
  { label: "ENGLISH" },
  { label: "MATHEMATICS" },
  { label: "HINDI" },
  { label: "URDU" },
];
const Books = () => {
  const [dbUrl, setDbUrl] = useState("");
  useEffect(() => {
    setDbUrl(localStorage.getItem("userDbUrl") || "");
  }, []);

  return (
    <Box>
      <LeftAlignedContentModel
        title="Your Books"
        body="Click On The Subject You Want To Read Today"
        imageUrl={books}
      />
      <Grid container spacing={2} justifyContent={"center"} padding={2}>
        {bookItems.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <SimpleCard
              title={item.label}
              description={null}
              link={`${dbUrl}/books/${item.label}`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Books;
