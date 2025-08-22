import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Image from "next/image";

export default function GlobalCard({ title, quote, description, imageUrl }) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardActionArea>
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="card-img"
          placeholder="blur"
        />
        <CardContent>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="subtitle1" sx={{ lineHeight: "2rem" }}>
            "{quote}"
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: "2rem" }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
