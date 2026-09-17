import Button from "../components/ui/Button";
import FadeUp from "../components/motion/FadeUp.jsx";

export default function NotFoundPage() {
  return (
    <section className="wrap py-24">
      <FadeUp>
        <h1>Page not found</h1>
        <p className="muted mt-3 max-w-md">
          The page you are looking for might have been moved, removed, or is temporarily unavailable.
        </p>
        <div className="mt-6">
          <Button to="/">Back to Home</Button>
        </div>
      </FadeUp>
    </section>
  );
}
