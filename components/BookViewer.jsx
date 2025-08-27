"use client";
import { Box, Typography } from "@mui/material";

export default function BookViewer({ bookName, bookUrl }) {
  // const viewerUrl = `https://docs.google.com/gview?url=https://firebasestorage.googleapis.com/v0/b/national-remote-school.firebasestorage.app/o/BOOKS%2FCLASS-1%2FENGLISH%2Faemr1ps.pdf&embedded=true`;

  return (
    <Box>
      {/* -- Header strip (optional) -- */}
      <Box sx={{ p: 1.5 }}>
        <Typography variant="subtitle1" noWrap title={bookName}>
          {bookName.toUpperCase()}
        </Typography>
      </Box>
      <object data={bookUrl} type="application/pdf" className="iframecss">
        <iframe src={bookUrl} title={bookName} className="iframecss">
          <p>
            Your browser does not support PDFs. [Download the PDF](document.pdf)
          </p>
        </iframe>
      </object>
    </Box>
  );
}
