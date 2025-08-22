import { Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearDisplay =
    currentYear === startYear ? `${startYear}` : `${startYear}–${currentYear}`;

  return (
    <Link href="/" style={{ textDecoration: "none" }}>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ marginTop: "2rem", color: "inherit" }}
      >
        © {yearDisplay} National Remote School. All Rights Reserved.
      </Typography>
    </Link>
  );
};

export default Footer;
