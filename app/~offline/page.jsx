import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";

const Offline = () => {
  return (
    <LeftAlignedContentModel
      title={"You Are offline"}
      body={"Please check your internet connection and try again."}
      imageUrl="/fallback.webp"
    />
  );
};

export default Offline;
