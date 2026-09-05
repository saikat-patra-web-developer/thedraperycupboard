import Icon from "../components/ui/Icon.jsx";
import Img from "../components/ui/Image.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Button from "../components/ui/Button.jsx";
import Heading from "../components/ui/SectionHeading.jsx";
import Hero from "../components/sections/Hero.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Process from "../components/sections/Process.jsx";
import Coverage from "../components/sections/ServiceCoverage.jsx";

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        label="About The Drapery Cupboard"
        title={
          <>
            Made for Your Space.
            <br />
            Backed by Quality.
          </>
        }
        description="We’re New Zealand’s trusted blinds specialist, delivering premium window furnishings with precision, speed and personalised service."
      >
        <div className="mt-6 flex flex-wrap gap-4">
          <Button to="/products">Explore Our Products</Button>
          <Button outline>Get in Touch</Button>
        </div>
      </Hero>
      <section className="wrap section grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <Heading
            label="Our story"
            title={
              <>
                Proudly New Zealand.
                <br />
                Focused on You.
              </>
            }
          >
            The Drapery Cupboard was founded to make quality window coverings
            accessible. We
            combine quality products with made-to-measure options, fast
            turnaround times and expert support to help you find the right
            blinds for your space.
          </Heading>
          <p className="muted mt-4 max-w-md">
            From our Tuakau base, we help homeowners and businesses across New
            Zealand find blinds that are made to measure, built to last and easy
            to use.
          </p>
        </div>
        <Img
          name="story"
          alt="New Zealand owned and operated, dining room blinds"
          className="w-full rounded"
        />
      </section>
      <Process />
      <section className="grid sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-[#f0efeb] p-7 sm:p-10">
          <Heading
            label="Our values"
            title={
              <>
                The Principles
                <br />
                That Guide Us.
              </>
            }
          />
          <div className="mt-6 space-y-5">
            {[
              [
                "Quality Without Compromise",
                "Premium materials. Careful craftsmanship.",
              ],
              [
                "Customer First",
                "Thoughtful advice and personal support for every customer.",
              ],
              ["Reliability", "On time, every time. You can count on us."],
              [
                "Personal Service",
                "We listen to your needs and help you find the right fit.",
              ],
            ].map(([a, b]) => (
              <div className="feature" key={a}>
                <Icon name="leaf" className="text-moss" />
                <div>
                  <b className="text-sm">{a}</b>
                  <p className="muted !text-sm">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#e9e8e2] p-7 sm:p-10">
          <Heading label="Quality & warranty" title="Confidence Built In." />
          <p className="muted my-5">
            We stand behind our blinds with warranties and a commitment to
            quality at every step.
          </p>
          {["5 Year Warranty", "Premium Materials", "Tested & Trusted"].map(
            (t) => (
              <div className="feature mb-7" key={t}>
                <Icon className="text-moss" name="shield" />
                <div>
                  <b className="text-sm">{t}</b>
                  <p className="muted !text-sm">Quality you can count on.</p>
                </div>
              </div>
            ),
          )}
        </div>
        <Img
          name="shutters"
          alt="Quality white plantation shutters"
          className="h-full min-h-80 w-full sm:col-span-2 lg:col-span-1"
        />
      </section>
      <Coverage />
      <section className="wrap section grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Heading
            label="Our people"
            title="Experienced. Approachable. Here to Help."
          >
            Our team has deep industry knowledge and a passion for helping you
            create a space you love.
          </Heading>
        </div>
        {[
          ["Mike Preston", "Founder & Director"],
          ["Sarah McKenzie", "Operations Manager"],
          ["Daniel Vano", "Customer Service Manager"],
        ].map(([n, r], i) => (
          <article className="card" key={n}>
            <Img
              name={"team" + (i + 1)}
              alt={n}
              className="aspect-[1.8] w-full"
            />
            <div className="p-5">
              <b className="text-sm">{n}</b>
              <p className="muted !text-sm">{r}</p>
              <a href="/contact" className="text-link mt-3">
                Get in touch <Arrow />
              </a>
            </div>
          </article>
        ))}
      </section>
      <section className="bg-forest py-10 text-white md:py-12">
        <div className="wrap grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            ["250,000+", "Blinds Supplied Across NZ"],
            ["10+", "Years of Experience"],
            ["98%", "Customer Satisfaction Rate"],
          ].map(([n, t]) => (
            <div className="flex items-center gap-5" key={n}>
              <Icon name="shield" size={35} className="text-lime" />
              <div>
                <h3 className="!text-3xl">{n}</h3>
                <p className="mt-2 text-sm">{t}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="pt-8">
        <Cta />
      </div>
    </>
  );
}
