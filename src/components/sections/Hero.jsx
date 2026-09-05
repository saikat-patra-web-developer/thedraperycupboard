import Img from "../ui/Image.jsx";

function Hero({
  label,
  title,
  description,
  children,
  image = "hero",
  video,
  compact = false,
}) {
  return (
    <section
      className={
        "relative isolate overflow-hidden bg-forest text-white " +
        (compact
          ? "min-h-[380px] md:min-h-[430px]"
          : "min-h-[640px] sm:min-h-[660px] lg:min-h-[700px]")
      }
    >
      {image && (
        <Img
          name={image}
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 h-full w-full object-[center_52%]"
          alt="Custom blinds in a light-filled New Zealand home"
        />
      )}
      {video && (
        <video
          key={video}
          className="absolute inset-0 z-[1] h-full w-full object-cover object-[center_52%] motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-1672.webp"
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      <div className="hero-shade absolute inset-0 z-10" />
      <div
        className={
          "wrap relative z-20 flex min-h-[inherit] items-center " +
          (compact
            ? "py-12 md:py-16"
            : "pb-12 pt-32 sm:pt-36 md:pb-16 md:pt-40")
        }
      >
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
