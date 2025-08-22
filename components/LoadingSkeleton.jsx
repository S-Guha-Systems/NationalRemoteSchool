import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
const LoadingSkeleton = () => {
  return (
    <Box textAlign={"center"} sx={{ width: "100%" }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
};

export default LoadingSkeleton;
