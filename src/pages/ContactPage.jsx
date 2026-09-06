import { contact } from "../data/contact.js";
import Icon from "../components/ui/Icon.jsx";
import Hero from "../components/sections/Hero.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Faq from "../components/ui/FaqAccordion.jsx";
import Coverage from "../components/sections/ServiceCoverage.jsx";
import Arrow from "../components/ui/Arrow.jsx";

export default function ContactPage() {
  return (
    <>
      <Hero
        compact
        image="dining"
        label="Contact us"
        title={
          <>
            We’re Here to Help
            <br />
            Bring Your Space to Life.
          </>
        }
        description="Need advice, a custom quote, or product support? Our team is ready to help with expert guidance and premium solutions."
      />
      <section className="wrap section">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.65fr)]">
          <aside className="min-w-0">
            <h3 className="mb-6">Get in Touch</h3>
            {[
              [
                "phone",
                "Call Us",
                contact.phones[0].label,
                "Talk with our window-covering specialists",
                contact.phones[0].href,
              ],
              [
                "mail",
                "Email Us",
                contact.email,
                "Contact us for product advice and quotes",
                contact.emailHref,
              ],
              [
                "pin",
                "Our Location",
                contact.address,
                contact.consultation,
                "#service-areas",
              ],
            ].map(([ic, t, v, d, u]) => (
              <a
                href={u}
                className="card mb-4 flex gap-4 p-5 shadow-sm sm:mb-5 sm:gap-6 sm:p-6"
                key={t}
              >
                <Icon name={ic} size={35} className="text-moss" />
                <div className="min-w-0">
                  <b className="text-xs text-moss">{t}</b>
                  <p className="my-2 break-all text-lg font-semibold sm:break-words">{v}</p>
                  <p className="muted !text-sm">{d}</p>
                </div>
              </a>
            ))}
            <div className="rounded-lg bg-forest p-6 text-white">
              <h3 className="mb-5 !text-lg">Free Consultation</h3>
              <p className="text-sm">We bring the showroom to you.</p>
              <p className="mt-3 text-sm text-white/75">{contact.consultation}</p>
            </div>
          </aside>
          <section className="card min-w-0 overflow-hidden" aria-labelledby="request-quote-title">
            <div className="bg-forest p-6 text-white sm:p-8 lg:p-10">
              <p className="eyebrow !text-lime">Made for your space</p>
              <h2 id="request-quote-title" className="mt-2 !text-3xl">Request a Quote</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
                Start with an instant estimate online, or talk with our team for tailored advice on products, measurements, installation and more complex projects.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <h3 className="!text-xl">The quickest way to get started</h3>
              <p className="muted mt-3 max-w-2xl">
                Choose your window furnishing, enter your approximate width and drop, and see an estimated price in NZD. You can then send the complete quote directly to our team for review.
              </p>
              <a href="/online-quote" className="btn btn-dark mt-6">
                Get an Online Quote <Arrow />
              </a>

              <div className="my-8 border-t border-neutral-200" />

              <h3 className="!text-xl">Need a tailored recommendation?</h3>
              <p className="muted mt-3">
                Call or email us if you need help choosing a product, want to arrange a consultation, or have an installation, repair, cleaning, motorisation or outdoor-shading enquiry.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Approximate window widths and drops",
                  "Photos of the windows or outdoor area",
                  "Your preferred styles, colours or light control",
                  "Your location and ideal timeframe",
                ].map((item) => (
                  <div className="flex items-start gap-3 rounded-lg bg-[#f4f5f0] p-4 text-sm" key={item}>
                    <Icon name="check" size={18} className="mt-0.5 text-moss" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={contact.phones[0].href} className="btn btn-dark !px-5 !text-xs">
                  Call {contact.phones[0].label} <Arrow />
                </a>
                <a href={contact.emailHref} className="btn btn-outline !px-5 !text-xs">
                  Email Our Team <Arrow />
                </a>
              </div>
            </div>
          </section>
        </div>
        <div id="service-areas" className="mt-8">
          <Coverage />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-3">Need Help? We’ve Got Answers.</h3>
            <Faq
              items={[
                [
                  "How quickly will I receive my quote?",
                  "Our team aims to reply within one business day. Complex projects may require more information before a quote is prepared.",
                ],
                [
                  "Can I get a custom quote?",
                  "Yes. Tell us your window sizes, preferred products and project details, and our team will prepare a personalised quote.",
                ],
                [
                  "Can you help with product recommendations?",
                  "Absolutely. Tell us about your light, privacy and style requirements and we will help you choose.",
                ],
                [
                  "Do you provide installation?",
                  "We offer professional installation support. Contact our team to confirm availability in your area.",
                ],
                [
                  "What areas do you deliver to?",
                  "We supply and deliver throughout New Zealand. Contact us for delivery details for your location.",
                ],
              ]}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              [
                "Prefer to talk to someone?",
                "Our friendly team is ready to chat about your project.",
                "Call " + contact.phones[0].label,
                contact.phones[0].href,
              ],
              [
                "Find Your Perfect Style",
                "Explore styles, fabrics and finishes for your space.",
                "Explore Our Products",
                "/products",
              ],
            ].map(([t, d, b, u]) => (
              <div className="rounded-lg bg-[#efeeeb] p-6" key={t}>
                <h3 className="!text-xl">{t}</h3>
                <p className="muted my-5">{d}</p>
                <a className="btn btn-dark !px-5 !text-xs" href={u}>
                  {b}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}

