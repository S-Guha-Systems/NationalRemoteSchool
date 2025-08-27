import LeftAlignedContentModel from "@/components/LeftAlignedContentModel";
import admin from "@/img/admin.webp";

const AdminDashboard = () => {
  return (
    <LeftAlignedContentModel
      title="Welcome To Admin Dashboard"
      body="You can manage users, view reports, and configure settings from this dashboard."
      imageUrl={admin}
    />
  );
};

export default AdminDashboard;
