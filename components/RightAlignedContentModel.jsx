import Image from "next/image";
import SignUpButton from "./SignUpButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import GoBackButton from "./GoBackButton";

const RightAlignedContentModel = ({
  title,
  body,
  imageUrl,
  addedComponent,
  showSignUpBtn,
  showGoBackBtn,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid size={{ xs: 12, sm: 6 }}>
          <Image
            src={imageUrl}
            alt={title}
            // width={500}
            // height={500}
            id="animateimg2"
            placeholder="blur"
            // blurDataURL="/logo.png"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="h2" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ lineHeight: "2rem" }}
          >
            {body}
          </Typography>
          {addedComponent && <Box>{addedComponent}</Box>}
          {showSignUpBtn && <SignUpButton />}
          {showGoBackBtn && <GoBackButton />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default RightAlignedContentModel;
