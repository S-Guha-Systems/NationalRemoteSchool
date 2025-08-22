import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import RightAlignedContentModel from "@/components/RightAlignedContentModel";
import about from "@/img/about.webp";
import mission from "@/img/mission.webp";
import vission from "@/img/vission.webp";
import future from "@/img/future.webp";

export const metadata = {
  title: "About",
  description: "Learn more about National Remote School",
};

const About = () => {
  return (
    <>
      <LeftAlignedContentModel
        title={"About National Remote School"}
        body={
          "National Remote School is an NGO initiative dedicated to providing completely free online education up to 12th class. We believe that every child deserves access to quality education, regardless of financial background or geographical barriers. Through innovative online tools and inclusive resources, we strive to make learning accessible to all."
        }
        imageUrl={about}
      />
      <RightAlignedContentModel
        title={"Our Mission"}
        body={
          "Our mission is to support children in need by offering free, high-quality education that empowers them to achieve their dreams. We aim to bridge the educational divide by ensuring every student, regardless of location or resources, has equal opportunities to learn, grow, and succeed."
        }
        imageUrl={mission}
      />
      <LeftAlignedContentModel
        title={"Our Vision"}
        body={
          "We envision a world where education is not a privilege but a fundamental right accessible to every child. National Remote School seeks to build a future where knowledge empowers communities, uplifts families, and creates equal opportunities for all."
        }
        imageUrl={vission}
      />
      <RightAlignedContentModel
        title={"Future Scope"}
        body={
          "Looking ahead, National Remote School plans to expand its reach by developing interactive learning platforms, multilingual educational resources, and mentorship programs. Our future focus is on harnessing technology to make education more engaging, inclusive, and impactful, ensuring no child is left behind."
        }
        imageUrl={future}
      />
    </>
  );
};

export default About;
