import Icon from "../ui/Icon.jsx";
import Button from "../ui/Button.jsx";

function Cta() {
  return (
    <section className="wrap">
      <div className="cta-grid grid gap-8 rounded-t-2xl bg-forest px-6 py-10 text-white sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:px-10 lg:py-11">
        <div className="min-w-0">
          <h2 className="!text-3xl min-[1180px]:whitespace-nowrap">Ready to Transform Your Space?</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
            Explore window furnishings and outdoor shading for your home or business. Our team can help
            with styles, measurements and a personalised quote.
          </p>
        </div>
        <div className="hidden min-w-0 grid-cols-3 gap-4 min-[1180px]:grid">
          {[
            ["leaf", "Made for You", "Solutions tailored to your space"],
            ["grid", "Explore Our Range", "Styles for indoors and out"],
            ["headset", "Expert Advice", "We’re here to help you choose"],
          ].map(([icon, title, description]) => (
            <div className="feature min-w-0 gap-3" key={title}>
              <Icon name={icon} className="text-lime" />
              <div className="min-w-0">
                <b className="whitespace-nowrap text-[13px]">{title}</b>
                <p className="mt-1 max-w-32 text-xs leading-relaxed text-white/75">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="justify-self-start whitespace-nowrap md:justify-self-end">
          <Button to="/online-quote">Get a Free Quote</Button>
        </div>
      </div>
    </section>
  );
}
export default Cta;
