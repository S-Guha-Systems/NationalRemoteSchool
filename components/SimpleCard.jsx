import { Card, CardContent, Typography } from "@mui/material";

const SimpleCard = ({ title, description }) => {
  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" fontStyle="italic" lineHeight={1.5}>
          "{description}"
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SimpleCard;
