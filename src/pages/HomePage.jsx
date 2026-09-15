import Icon from "../components/ui/Icon.jsx";
import Img from "../components/ui/Image.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Button from "../components/ui/Button.jsx";
import Heading from "../components/ui/SectionHeading.jsx";
import Hero from "../components/sections/Hero.jsx";
import Features from "../components/sections/Features.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import Cta from "../components/sections/CallToAction.jsx";

export default function HomePage() {
  return (
    <>
      <Hero
        image={null}
        video="/videos/hero-background.mp4"
        label="New Zealand’s trusted"
        title={
          <>
            Blinds, Curtains &
            <br />
            Outdoor Living.
            <br />
            Made for You
          </>
        }
        description={
          <>
            Premium quality. Custom made. Expert support.
            <br />
            Proudly supplying New Zealand with stylish,
            <br />
            window furnishings and outdoor shading.
          </>
        }
      >
        <div className="mt-6 flex flex-wrap gap-4">
          <Button to="/products">Explore Our Range</Button>
          <Button to="/online-quote" outline>
            Get a Free Quote
          </Button>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-3 sm:gap-7">
          {[
            ["leaf", "NZ Owned &", "Operated"],
            ["shield", "Premium Quality", "Guaranteed"],
            ["truck", "Fast, Reliable", "Nationwide Delivery"],
          ].map(([icon, a, b]) => (
            <div className="flex items-center gap-3" key={a}>
              <Icon name={icon} size={25} />
              <span className="text-sm leading-5">
                {a}
                <br />
                {b}
              </span>
            </div>
          ))}
        </div>
      </Hero>
      <section className="wrap section">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Heading
              label="Our range"
              title="The Right Finish for Every Space"
            />
          </div>
          <a href="/products" className="text-link shrink-0">
            View all products <Arrow />
          </a>
        </div>
        <div className="[&>div>a:nth-child(n+9)]:hidden max-md:[&>div>a:nth-child(n+5)]:hidden md:max-lg:[&>div>a:nth-child(n+7)]:hidden 2xl:[&>div>a:nth-child(n+9)]:block">
          <ProductGrid />
        </div>
      </section>
      <Features />
      <section className="wrap section grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center 2xl:gap-20">
        <div>
          <Heading
            label="About The Drapery Cupboard"
            title={
              <>
                Made for Your Space.
                <br />
                Backed by Experience.
              </>
            }
          >
            We’re passionate about helping people improve their homes with
            blinds, curtains, shutters and outdoor shading.
            <br />
            Our focus is simple: premium products, competitive pricing, and
            personalised service from start to finish.
          </Heading>
          <div className="my-6 flex flex-wrap gap-4 text-sm">
            {[
              "NZ Owned & Operated",
              "Made to Measure",
              "Quality You Can Trust",
            ].map((t) => (
              <span className="flex items-center gap-1" key={t}>
                <Icon size={14} className="text-moss" />
                {t}
              </span>
            ))}
          </div>
          <Button to="/about" dark>
            Learn More About Us
          </Button>
        </div>
        <Img
          name="dining"
          alt="Dining room with custom roller blinds overlooking a New Zealand bay"
          className="h-[280px] w-full rounded-xl sm:h-[360px] 2xl:h-[460px]"
        />
      </section>
      <section className="bg-forest py-12 text-white md:py-16">
        <div className="wrap">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Heading
                label="Projects & inspiration"
                title="Real Spaces. Beautiful Results."
              />
            </div>
            <a className="text-link shrink-0 !text-lime" href="/projects">
              View all projects <Arrow />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Modern Coastal Home",
              "Luxury Apartment",
              "Architectural New Build",
              "Contemporary Family Home",
            ].map((t, i) => (
              <a href={"/projects#project-" + i} key={t}>
                <Img
                  name={"project" + (i + 1)}
                  alt={t}
                  className="h-[220px] w-full rounded-xl 2xl:h-[280px]"
                />
                <div className="mt-3 flex justify-between text-sm font-medium">
                  {t}
                  <Arrow />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="text-center">
          <Heading label="Our services" title="More Than Just Blinds" />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [
              "tools",
              "Custom Manufacturing",
              "Made to measure for a perfect finish",
            ],
            [
              "leaf",
              "Professional Installation",
              "A precise fit and a beautiful finish",
            ],
            [
              "headset",
              "Technical Advice",
              "Expert guidance for every project",
            ],
            [
              "truck",
              "Nationwide Delivery",
              "Fast, reliable delivery across New Zealand",
            ],
          ].map(([icon, t, d]) => (
            <a href="/services" className="feature" key={t}>
              <Icon name={icon} className="text-moss" />
              <div>
                <b className="text-sm">{t}</b>
                <p className="mt-1 max-w-48 text-sm leading-relaxed text-neutral-600">
                  {d}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="wrap pb-12 md:pb-16">
        <div className="rounded-2xl bg-brand-50 border border-brand-line p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] items-center">
            <div>
              <span className="eyebrow">DIY Repairs & Spare Parts</span>
              <h2 className="!text-3xl font-serif text-forest">
                Need Replacement Parts for Your Blinds?
              </h2>
              <p className="mt-3 text-sm text-neutral-600 max-w-2xl leading-relaxed">
                Don’t replace the whole blind when a quick fix will do. Shop genuine 32mm & 38mm roller clutches, metal chains, child safety tensioners, venetian wands, vertical weights, and retrofit motorisation kits.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-forest">
                <span className="flex items-center gap-1.5">
                  <Icon name="truck" size={16} className="text-moss" /> Fast NZ Courier Dispatch
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="shield" size={16} className="text-moss" /> 30-Day Fit Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="leaf" size={16} className="text-moss" /> Free Delivery Over $75
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Button to="/parts" dark>
                Shop Blinds Parts
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <Cta />
    </>
  );
}

