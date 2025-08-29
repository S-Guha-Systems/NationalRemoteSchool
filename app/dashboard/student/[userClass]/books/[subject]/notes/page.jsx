import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import notes from "@/img/handwrittennotes.webp";
const Notes = () => {
  return (
    <LeftAlignedContentModel
      title={"Notes"}
      body={"Handwritten Notes Provided By Best Faculties And Toppers."}
      imageUrl={notes}
    ></LeftAlignedContentModel>
  );
};

export default Notes;
