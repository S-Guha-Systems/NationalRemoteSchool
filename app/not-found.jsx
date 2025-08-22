import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import notfound from "@/img/notfound.webp";

const NotFound = () => {
  return (
    <LeftAlignedContentModel
      title="Oops! Page Not Found"
      body="The page you are looking for does not exist or has been moved."
      showSignUpBtn={false}
      showGoBackBtn={true}
      imageUrl={notfound}
      addedComponent={null}
    />
  );
};

export default NotFound;
