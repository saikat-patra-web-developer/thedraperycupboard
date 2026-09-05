import Img from "../ui/Image.jsx";

function Hero({
  label,
  title,
  description,
  children,
  image = "hero",
  compact = false,
}) {
  return (
    <section
      className={
        "relative overflow-hidden bg-forest text-white " +
        (compact ? "min-h-[340px] md:min-h-[380px]" : "min-h-[440px] md:min-h-[495px]")
      }
    >
      <Img
        name={image}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-[center_52%]"
        alt="Custom blinds in a light-filled New Zealand home"
      />
      <div className="hero-shade absolute inset-0" />
      <div className={"wrap relative " + (compact ? "py-10 md:py-14" : "py-10 md:py-12")}>
        <div className="max-w-[560px]">
          <div className="eyebrow !text-lime">{label}</div>
          <h1>{title}</h1>
          <p className="mt-5 max-w-[405px] text-sm leading-relaxed text-white/90">
            {description}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

export default Hero;
