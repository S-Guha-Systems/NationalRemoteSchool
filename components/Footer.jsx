"use client";

import {
  Facebook,
  Instagram,
  LinkedIn,
  WhatsApp,
  X,
} from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logo from "@/img/icon.png";
import { usePathname } from "next/navigation";
import InstallApp from "./InstallApp";

const Footer = () => {
  const pathname = usePathname() || "/";
  const isDashboard = pathname.startsWith("/dashboard");
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearDisplay =
    currentYear === startYear ? `${startYear}` : `${startYear}–${currentYear}`;
  if (isDashboard) {
    // render dashboard navbar immediately with no flash
    return null;
  }
  return (
    <Grid container spacing={3} sx={{ mt: 3, p: 2 }}>
      <Divider sx={{ width: "100%" }} />
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src={logo}
            alt="National Remote School"
            className="menu-logo"
          />{" "}
          National Remote School
        </Typography>
        <Typography
          variant="body2"
          sx={{ maxWidth: "300px", mt: 1 }}
          color="text.secondary"
        >
          National Remote School is an NGO initiative dedicated to providing
          completely free online education up to 12th class.
        </Typography>
        <InstallApp />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="h6">Quick Links</Typography>
        <Box color="text.secondary">
          <Link href="/">
            <Typography variant="body2">Home</Typography>
          </Link>
          <Link href="/about">
            <Typography variant="body2">About Us</Typography>
          </Link>
          <Link href="/features">
            <Typography variant="body2">Features</Typography>
          </Link>
          <Link href="/contact">
            <Typography variant="body2">Contact</Typography>
          </Link>
        </Box>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="h6">Legal</Typography>
        <Box color="text.secondary">
          <Link href="/privacy-policy">
            <Typography variant="body2">Privacy Policy</Typography>
          </Link>
          <Link href="/terms">
            <Typography variant="body2">Terms Of Use</Typography>
          </Link>
        </Box>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="h6">Connect With Us</Typography>
        <Box color="text.secondary" display="flex" flexDirection="row" gap={1}>
          <Link href="#">
            <Typography variant="body2">
              <WhatsApp />
            </Typography>
          </Link>
          <Link href="#">
            <Typography variant="body2">
              <Facebook />
            </Typography>
          </Link>
          <Link href="#">
            <Typography variant="body2">
              <Instagram />
            </Typography>
          </Link>
          <Link href="#">
            <Typography variant="body2">
              <X />
            </Typography>
          </Link>
          <Link href="#">
            <Typography variant="body2">
              <LinkedIn />
            </Typography>
          </Link>
        </Box>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
        <Link href="/">
          <Typography variant="subtitle1">
            © {yearDisplay} National Remote School. All Rights Reserved.
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
