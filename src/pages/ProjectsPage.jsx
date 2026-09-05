import Img from "../components/ui/Image.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Hero from "../components/sections/Hero.jsx";
import Cta from "../components/sections/CallToAction.jsx";

export default function ProjectsPage() {
  return (
    <>
      <Hero
        compact
        label="Projects & inspiration"
        title="Real Spaces. Beautiful Results."
        description="Explore spaces transformed with premium blinds, made for the way you live."
      />
      <section className="wrap section grid gap-8 sm:grid-cols-2">
        {[
          "Modern Coastal Home",
          "Luxury Apartment",
          "Architectural New Build",
          "Contemporary Family Home",
        ].map((t, i) => (
          <article className="card" id={"project-" + i} key={t}>
            <Img
              name={"project" + (i + 1)}
              alt={t}
              className="aspect-[1.8] w-full"
            />
            <div className="p-6 sm:p-7">
              <h3>{t}</h3>
              <p className="muted mt-3">
                Natural light, effortless privacy and a finish tailored to the
                space.
              </p>
              <a href="/contact" className="text-link mt-4">
                Discuss a similar project <Arrow />
              </a>
            </div>
          </article>
        ))}
      </section>
      <Cta />
    </>
  );
}
