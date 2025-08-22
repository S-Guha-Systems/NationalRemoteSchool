import Link from "next/link";
import Button from "@mui/material/Button";

const SignUpButton = () => {
  return (
    <Link href="/sign-up">
      <Button variant="outlined" color="success">
        Start Donating Now
      </Button>
    </Link>
  );
};

export default SignUpButton;
