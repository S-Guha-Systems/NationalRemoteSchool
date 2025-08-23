import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import contact from "@/img/contact.webp";
import { Box } from "@mui/material";
export const metadata = {
  title: "Contact Us",
  description: "Get in touch with our team for any inquiries or support.",
};
const Contact = () => {
  return (
    <Box>
      <LeftAlignedContentModel
        title={"Get in Touch"}
        body={
          "We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, our team is here to help you every step of the way. Just drop us an email at nationalremoteschool@gmail.com — we’ll be happy to assist you."
        }
        imageUrl={contact}
      />
    </Box>
  );
};

export default Contact;
