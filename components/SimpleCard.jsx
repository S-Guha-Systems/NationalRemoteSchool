import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

const SimpleCard = ({ title, description, link }) => {
  return (
    <>
      {link ? (
        <Link href={link}>
          <Card sx={{ cursor: "pointer" }}>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              {description && (
                <Typography variant="body2" fontStyle="italic" lineHeight={1.5}>
                  "{description}"
                </Typography>
              )}
            </CardContent>
          </Card>
        </Link>
      ) : (
        <Card sx={{ cursor: "pointer" }}>
          <CardContent sx={{ height: "100%" }}>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" fontStyle="italic" lineHeight={1.5}>
                "{description}"
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SimpleCard;
