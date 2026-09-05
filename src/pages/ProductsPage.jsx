import Hero from "../components/sections/Hero.jsx";
import Button from "../components/ui/Button.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";
import Cta from "../components/sections/CallToAction.jsx";

export default function ProductsPage() {
  return (
    <>
      <Hero
        compact
        label="Made for your space, inside and out."
        title="Our Products"
        description="Explore our collection of blinds, curtains, shutters, pergolas and outdoor shades. Find the right finish for every space."
      >
        <div className="mt-7 flex flex-wrap gap-4">
          <Button>Request a Quote</Button>
          <Button to="/services" outline>Explore Our Services</Button>
        </div>
      </Hero>
      <section className="wrap section">
        <div className="mb-6">
          <div className="eyebrow">Our complete collection</div>
          <h2>Possibilities for Every Space.</h2>
        </div>
        <ProductGrid full />
      </section>
      <Cta />
    </>
  );
}
