import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <section className="wrap py-24">
      <h1>Page not found</h1>
      <div className="mt-6">
        <Button to="/">Back to Home</Button>
      </div>
    </section>
  );
}
