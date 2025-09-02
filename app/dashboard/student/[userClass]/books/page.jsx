"use client";

import NcertSubjects from "@/components/NcertSubjects";
import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import SimpleCard from "@/components/SimpleCard";
import books from "@/img/books.webp";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const Books = () => {
  const [dbUrl, setDbUrl] = useState("");
  const [bookItems, setBookItems] = useState([]);

  useEffect(() => {
    const storedDbUrl = localStorage.getItem("userDbUrl") || "";
    const storedClass = localStorage.getItem("userClass") || "";
    setDbUrl(storedDbUrl);
    if (storedClass) {
      const classData = NcertSubjects.find(
        (item) => item.class === `CLASS-${storedClass}`
      );
      if (classData) {
        setBookItems(
          classData.subjects.map((subj) => ({
            label: subj,
          }))
        );
      }
    }
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
          <Grid size={{ xs: 12, sm: 4, md: 3 }} key={index}>
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
