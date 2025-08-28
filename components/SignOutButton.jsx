import { signOutUser } from "@/lib/Backend";
import { Button } from "@mui/material";

const SignOutButton = () => {
  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      console.error("Sign out error:", error);
    } else {
      window.location.replace("/");
    }
  };
  return (
    <Button
      color="error"
      size="small"
      variant="outlined"
      onClick={handleSignOut}
      sx={{ textAlign: "center" }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
