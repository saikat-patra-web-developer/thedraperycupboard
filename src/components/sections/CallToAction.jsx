import Icon from "../ui/Icon.jsx";
import Button from "../ui/Button.jsx";

function Cta() {
  return (
    <section className="wrap">
      <div className="flex flex-col gap-6 rounded-t-2xl bg-forest px-8 py-8 text-white md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="!text-3xl">Ready to Transform Your Space?</h2>
          <p className="mt-2 max-w-sm text-xs text-white/75">
            Explore window furnishings and outdoor shading for your home or business. Our team can help
            with styles, measurements and a personalised quote.
          </p>
        </div>
        <div className="hidden gap-8 xl:flex">
          {[
            ["leaf", "Made for You", "Solutions tailored to your space"],
            ["grid", "Explore Our Range", "Styles for indoors and out"],
            ["headset", "Expert Advice", "We’re here to help you choose"],
          ].map(([icon, title, description]) => (
            <div className="feature max-w-36" key={title}>
              <Icon name={icon} className="text-lime" />
              <div>
                <b className="text-[10px]">{title}</b>
                <p className="mt-1 text-[10px] text-white/75">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button to="/online-quote">Get a Free Quote</Button>
      </div>
    </section>
  );
}
export default Cta;
