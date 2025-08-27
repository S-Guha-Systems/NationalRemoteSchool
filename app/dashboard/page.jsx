"use client";

import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import UserDataForm from "@/components/UserDataUpdateForm";
import dashboard from "@/img/dashboard.webp";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // Heading
  useEffect(() => {
    document.title = "Dashboard | National Remote School";
    document.description = "Dashboard Of National Remote School";
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [userClass, setUserClass] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedClass = localStorage.getItem("userClass");
    const storedRole = localStorage.getItem("userRole");
    if (!storedClass && storedRole === "student") {
      setShowForm(true);
    } else {
      setShowForm(false);
      setUserClass(storedClass || "");
      setUserRole(storedRole || "");
    }
  }, []);
  return (
    <Box>
      <LeftAlignedContentModel
        title="Dashboard"
        body="Welcome to your Dashboard"
        imageUrl={dashboard}
      />
      {showForm ? (
        <Box>
          <Typography variant="h5" textAlign="center">
            We need some additional information to complete your profile. Please
            fill out the form below:
          </Typography>
          <UserDataForm />
        </Box>
      ) : (
        <Link href={`/dashboard/${userRole}/CLASS-${userClass}`}>
          <Button variant="contained" color="success">
            Go To Your Personalized Dashboard
          </Button>
        </Link>
      )}
    </Box>
  );
}
