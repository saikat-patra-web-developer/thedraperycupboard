import Icon from "../components/ui/Icon.jsx";
import Img from "../components/ui/Image.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Button from "../components/ui/Button.jsx";
import Heading from "../components/ui/SectionHeading.jsx";
import Hero from "../components/sections/Hero.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Process from "../components/sections/Process.jsx";
import Coverage from "../components/sections/ServiceCoverage.jsx";
import { services } from "../data/services.js";
import { features } from "../data/features.js";

export default function ServicesPage() {
  return (
    <>
      <Hero
        compact
        image="dining"
        label="Services"
        title={
          <>
            Expert Services.
            <br />
            Beautiful Results.
          </>
        }
        description="From precision installation to ongoing care, our end-to-end services make it easy to enjoy blinds that look amazing and perform perfectly."
      >
        <div className="mt-6 flex flex-wrap gap-4">
          <Button to="/online-quote">Get a Free Quote</Button>
          <Button to="/products" outline>
            Explore Our Products
          </Button>
        </div>
      </Hero>
      <section className="wrap section">
        <div className="mb-7 text-center">
          <Heading label="Our services" title="Solutions for Every Space" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(([t, id, d, ic]) => (
            <article className="card scroll-mt-6" key={id} id={id}>
              <Img name={id} alt={t} className="h-44 w-full" />
              <div className="relative p-6 pt-9">
                <div className="absolute -top-6 flex size-12 items-center justify-center rounded-full bg-forest text-lime">
                  <Icon name={ic} />
                </div>
                <h3>{t}</h3>
                <p className="muted mt-4">{d}</p>
                <a href={"/contact?service=" + id} className="text-link mt-5">
                  Learn More <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Process />
      <div className="grid bg-white md:grid-cols-2">
        <div className="p-7 sm:p-10 lg:p-14">
          <Heading
            label="Why choose The Drapery Cupboard"
            title={
              <>
                Quality You Can See.
                <br />
                Service You Can Trust.
              </>
            }
          />
          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              ...features.slice(0, 4),
              [
                "truck",
                "Fast Turnaround",
                "Efficient processes to get your blinds on time",
              ],
              ["shield", "Warranty Backed", "For total peace of mind"],
            ].map(([ic, t, d]) => (
              <div className="feature" key={t}>
                <Icon name={ic} className="text-moss" />
                <div>
                  <b className="text-sm">{t}</b>
                  <p className="muted mt-2 !text-sm">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Img
          name="hero"
          alt="Premium blinds overlooking the coast"
          className="h-full min-h-80 w-full"
        />
      </div>
      <Coverage />
      <div className="pt-8">
        <Testimonials />
      </div>
      <Cta />
    </>
  );
}
