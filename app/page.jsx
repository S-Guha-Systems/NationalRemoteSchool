import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import logo from "@/img/logo.webp";
const Home = () => {
  return (
    <>
      <LeftAlignedContentModel
        title="Welcome To National Remote School"
        body="National Remote School is an NGO initiative dedicated to providing completely free online education up to 12th class. Our mission is to support children in need by ensuring equal access to quality learning resources, empowering them to learn, grow, and build a brighter future — anytime, anywhere."
        imageUrl={logo}
      />
      {/* <Typography variant="h2" align="center" sx={{ mt: 4 }}>
        Our Impact
      </Typography> */}
      {/* <Counter end={1000} duration={2.75} /> */}
    </>
  );
};

export default Home;
