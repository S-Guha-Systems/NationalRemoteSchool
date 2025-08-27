"use client";

import { updateUserData } from "@/lib/Backend";
import { Check } from "@mui/icons-material";
import { Alert, Button, Box, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserDataUpdateForm = () => {
  const [userData, setUserData] = useState({
    class: "",
    dob: "",
    phone: "",
    address: "",
    fatherName: "",
    fatherPhone: "",
    fatherOccupation: "",
    motherName: "",
    motherPhone: "",
    motherOccupation: "",
    guardianName: "",
    guardianPhone: "",
  });

  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");
    try {
      const userIdToUpdate = localStorage.getItem("userId");
      const updaterId = userIdToUpdate; // user updates own data
      if (userIdToUpdate) {
        const { error } = await updateUserData(
          userIdToUpdate,
          userData,
          updaterId
        );
        if (error) {
          console.error("Error updating user data:", error);
          setMessage("❌ Failed to update user data");
        } else {
          // console.log("User data updated successfully");
          setMessage("✅ User data updated successfully");
          localStorage.setItem(
            "userDbUrl",
            `/dashboard/${role}/CLASS-${userData.class}`
          );
          router.push(`/dashboard/${role}/CLASS-${userData.class}`);
        }
      } else {
        console.error("No user ID found in local storage");
        setMessage("❌ No user ID found in local storage");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setMessage("❌ Error updating user data");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <Alert icon={<Check fontSize="inherit" />} severity="success">
          {message}
        </Alert>
      )}
      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          required
          variant="standard"
          id="standard-required"
          label="Class"
          value={userData.class}
          onChange={(e) => setUserData({ ...userData, class: e.target.value })}
        />
        <TextField
          required
          variant="standard"
          id="standard-required"
          type="date"
          label="Date of Birth"
          value={userData.dob}
          onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
        />
        <TextField
          required
          variant="standard"
          id="standard-required"
          type="text"
          label="Phone"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
        />
        <TextField
          required
          variant="standard"
          id="standard-required"
          type="text"
          label="Address"
          value={userData.address}
          onChange={(e) =>
            setUserData({ ...userData, address: e.target.value })
          }
        />
        <TextField
          variant="standard"
          id="standard-basic"
          type="text"
          label="Father's Name"
          value={userData.fatherName}
          onChange={(e) =>
            setUserData({ ...userData, fatherName: e.target.value })
          }
        />
        <TextField
          variant="standard"
          id="standard-basic"
          type="text"
          label="Father's Phone"
          value={userData.fatherPhone}
          onChange={(e) =>
            setUserData({ ...userData, fatherPhone: e.target.value })
          }
        />
        <TextField
          variant="standard"
          id="standard-basic"
          type="text"
          label="Father's Occupation"
          value={userData.fatherOccupation}
          onChange={(e) =>
            setUserData({ ...userData, fatherOccupation: e.target.value })
          }
        />
        <TextField
          variant="standard"
          id="standard-basic"
          type="text"
          label="Mother's Name"
          value={userData.motherName}
          onChange={(e) =>
            setUserData({ ...userData, motherName: e.target.value })
          }
        />
        <TextField
          variant="standard"
          id="standard-basic"
          type="text"
          label="Mother's Phone"
          value={userData.motherPhone}
          onChange={(e) =>
            setUserData({ ...userData, motherPhone: e.target.value })
          }
        />
        <TextField
          variant="standard"
          id="standard-basic"
          type="text"
          label="Mother's Occupation"
          value={userData.motherOccupation}
          onChange={(e) =>
            setUserData({ ...userData, motherOccupation: e.target.value })
          }
        />
        <TextField
          variant="standard"
          id="standard-basic"
          type="text"
          label="Guardian's Name"
          value={userData.guardianName}
          onChange={(e) =>
            setUserData({ ...userData, guardianName: e.target.value })
          }
        />
        <TextField
          variant="standard"
          id="standard-basic"
          type="text"
          label="Guardian's Phone"
          value={userData.guardianPhone}
          onChange={(e) =>
            setUserData({ ...userData, guardianPhone: e.target.value })
          }
        />
        <Button
          type="submit"
          disabled={updating}
          variant="outlined"
          color="success"
          sx={{ maxWidth: "200px" }}
        >
          {updating ? "Updating..." : "Update Data"}
        </Button>
      </Box>
    </form>
  );
};

export default UserDataUpdateForm;
