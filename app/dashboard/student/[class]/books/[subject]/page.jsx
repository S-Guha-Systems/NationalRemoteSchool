export default async function SingleBook({ params }) {
  const { subject } = await params;

  return (
    <div>
      <h1>{subject}</h1>
    </div>
  );
}
