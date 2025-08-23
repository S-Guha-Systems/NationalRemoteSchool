import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import RightAlignedContentModel from "@/components/RightAlignedContentModel";
import about from "@/img/about.webp";
import mission from "@/img/mission.webp";
import vission from "@/img/vission.webp";
import future from "@/img/future.webp";
import SimpleCard from "@/components/SimpleCard";
import { Grid, Typography } from "@mui/material";

export const metadata = {
  title: "About",
  description: "Learn more about National Remote School",
};
const studentStories = [
  {
    name: "Aarav, Class 8",
    story:
      "Before joining National Remote School, I struggled to access quality education in my village. Now I can attend live classes, ask doubts, and study without worrying about fees.",
  },
  {
    name: "Meera, Class 10",
    story:
      "The free resources and notes have helped me prepare for my board exams with confidence. I also love that I can learn in my regional language.",
  },
  {
    name: "Rohit, Class 12",
    story:
      "I dream of becoming an engineer. Thanks to National Remote School, I get guidance and mentorship that motivates me every day to achieve my goals.",
  },
];
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
      {/* Student Stories Section */}
      <Typography variant="h2" sx={{ mt: 8, mb: 4, textAlign: "center" }}>
        Student Stories
      </Typography>

      <Grid container spacing={4}>
        {studentStories.map((student, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <SimpleCard title={student.name} description={student.story} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default About;
