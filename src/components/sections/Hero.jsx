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
        (compact ? "min-h-[380px] md:min-h-[430px]" : "min-h-[500px] md:min-h-[550px]")
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
      <div className={"wrap relative flex min-h-[inherit] items-center " + (compact ? "py-12 md:py-16" : "py-12 md:py-16")}>
        <div className="max-w-[560px]">
          <div className="eyebrow !text-lime">{label}</div>
          <h1>{title}</h1>
          <p className="mt-5 max-w-[440px] text-base leading-relaxed text-white/90">
            {description}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

export default Hero;
