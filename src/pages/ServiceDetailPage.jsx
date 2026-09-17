import Icon from "../components/ui/Icon.jsx";
import Img from "../components/ui/Image.jsx";
import Button from "../components/ui/Button.jsx";
import Heading from "../components/ui/SectionHeading.jsx";
import Faq from "../components/ui/FaqAccordion.jsx";
import Coverage from "../components/sections/ServiceCoverage.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { findService, getAllServices } from "../data/servicesData.js";
import { contact } from "../data/contact.js";

export default function ServiceDetailPage({ slug }) {
  const service = findService(slug);
  if (!service) return <NotFoundPage />;

  const allServices = getAllServices();
  const relatedServices = (service.related || [])
    .map((rSlug) => findService(rSlug))
    .filter(Boolean);

  const phone = contact.phones?.[0] || { label: "0800 55 00 11", href: "tel:0800550011" };

  return (
    <>
      {/* Breadcrumb & Hero */}
      <section className="bg-brand-50 border-b border-brand-line/60">
        <div className="wrap pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-500"
          >
            <a href="/" className="hover:text-forest transition-colors">
              Home
            </a>
            <span aria-hidden="true" className="text-neutral-400">
              /
            </span>
            <a href="/services" className="hover:text-forest transition-colors">
              Services
            </a>
            <span aria-hidden="true" className="text-neutral-400">
              /
            </span>
            <span aria-current="page" className="font-semibold text-moss">
              {service.name}
            </span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-lime/25 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-moss">
                <Icon name={service.icon} size={15} />
                <span>{service.badge || "Professional Service"}</span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif text-forest leading-tight">
                {service.heroTitle}
              </h1>

              <p className="mt-3 text-base sm:text-lg font-medium text-moss">
                {service.tagline}
              </p>

              <p className="muted mt-4 text-base leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/online-quote" dark>
                  Get a Free Quote
                </Button>
                <a
                  href={phone.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-forest shadow-xs hover:border-moss hover:bg-neutral-50 transition-colors"
                >
                  <Icon name="phone" size={17} className="text-moss" />
                  <span>Call {phone.label}</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-brand-line shadow-lg bg-white">
                <Img
                  name={service.image || "hero"}
                  alt={service.name}
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 rounded-xl border border-brand-line bg-white/95 p-4 shadow-md backdrop-blur-sm">
                <div className="flex size-10 items-center justify-center rounded-lg bg-lime/20 text-moss">
                  <Icon name="shield" size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Service Guarantee
                  </p>
                  <p className="text-sm font-semibold text-forest">
                    100% Quality Workmanship
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Services Offerings Grid */}
      <section className="wrap section">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Heading
            label="What we do"
            title="Comprehensive Services Tailored for You"
          />
          <p className="muted mt-3 text-base">
            Everything you need for lasting performance, smooth operation, and perfect styling.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.subServices.map((sub, idx) => (
            <article
              key={idx}
              className="card relative flex flex-col justify-between p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-50 text-moss">
                  <Icon name={sub.icon || "check"} size={24} />
                </div>
                <h3 className="text-lg font-serif font-semibold text-forest">
                  {sub.title}
                </h3>
                <p className="muted mt-3 text-sm leading-relaxed">
                  {sub.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Overview & Why it Matters Deep Dive */}
      {service.overview && (
        <section className="bg-white border-y border-neutral-100">
          <div className="wrap section grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="eyebrow">Professional Expertise</div>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest leading-snug">
                {service.overview.heading}
              </h2>
              <p className="muted mt-4 text-base leading-relaxed">
                {service.overview.intro}
              </p>

              {service.overview.points && (
                <ul className="mt-6 space-y-3">
                  {service.overview.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-forest">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/25 text-moss">
                        <Icon name="check" size={13} />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/online-quote">Request a Free Quote</Button>
                <Button to="/contact" outline>
                  Ask a Question
                </Button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
              <Img
                name={service.image || "hero"}
                alt={service.overview.heading}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Step-by-Step Workflow */}
      {service.process && service.process.length > 0 && (
        <section className="wrap section">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Heading
              label="Our step-by-step approach"
              title="How Our Service Works"
            />
            <p className="muted mt-3 text-base">
              Simple, transparent, and hassle-free from your first contact to final inspection.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-brand-line/70 bg-brand-50/60 p-6 sm:p-7 shadow-xs"
              >
                <div className="mb-4 inline-block font-serif text-3xl font-bold text-moss/70">
                  {step.step}
                </div>
                <h3 className="text-lg font-serif font-semibold text-forest">
                  {step.title}
                </h3>
                <p className="muted mt-3 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Choose The Drapery Cupboard */}
      {service.whyChooseUs && (
        <section className="bg-forest text-white py-16 sm:py-20">
          <div className="wrap">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-lime">
                The TDC Advantage
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-white">
                Why Choose The Drapery Cupboard?
              </h2>
              <p className="mt-3 text-white/70 text-base">
                Proudly New Zealand owned with a commitment to uncompromised quality and customer satisfaction.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.whyChooseUs.map((adv, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-xs transition hover:bg-white/10"
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-lime/20 text-lime">
                    <Icon name={adv.icon || "check"} size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {adv.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="wrap section">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <Heading
                label="Frequently asked questions"
                title="Got Questions? We Have Answers."
              />
              <p className="muted mt-4 text-base leading-relaxed">
                Find answers to common questions regarding our {service.name.toLowerCase()} service, pricing, and scheduling.
              </p>

              <div className="mt-8 rounded-2xl border border-brand-line bg-brand-50 p-6">
                <h3 className="text-base font-semibold text-forest">
                  Need personalized advice?
                </h3>
                <p className="muted mt-2 text-sm">
                  Our window furnishing specialists are ready to discuss your unique project.
                </p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-moss hover:underline"
                  >
                    <Icon name="phone" size={16} />
                    <span>Toll Free: {phone.label}</span>
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-moss hover:underline"
                  >
                    <Icon name="mail" size={16} />
                    <span>{contact.email}</span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <Faq items={service.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Related Services Navigation */}
      <section className="bg-neutral-50 border-t border-neutral-200 py-12 sm:py-16">
        <div className="wrap">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-moss">
                Explore More
              </p>
              <h2 className="text-2xl font-serif font-bold text-forest">
                Other Professional Services
              </h2>
            </div>
            <a
              href="/services"
              className="text-sm font-semibold text-moss hover:underline inline-flex items-center gap-1"
            >
              <span>View all 7 services</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(relatedServices.length > 0
              ? relatedServices
              : allServices.filter((s) => s.slug !== service.slug).slice(0, 3)
            ).map((rel) => (
              <a
                key={rel.slug}
                href={rel.canonicalUrl || `/${rel.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs transition hover:border-moss/50 hover:shadow-md"
              >
                <div>
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-brand-50 text-moss transition group-hover:bg-lime group-hover:text-forest">
                    <Icon name={rel.icon || "tools"} size={20} />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-forest group-hover:text-moss transition">
                    {rel.name}
                  </h3>
                  <p className="muted mt-2 text-xs leading-relaxed line-clamp-2">
                    {rel.heroDescription}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-moss">
                  <span>Learn more</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Coverage & CTA */}
      <Coverage />
      <Cta />
    </>
  );
}
