function Brand({ footer = false, compact = false }) {
  return (
    <a
      href="/"
      aria-label="The Drapery Cupboard home"
      className="flex shrink-0 items-center gap-3"
    >
      <img
        src={footer ? "/images/footer-logo-transparent.png" : "/images/logo.png"}
        alt="The Drapery Cupboard — blinds, curtains and shutters"
        className={
          compact
            ? "h-auto w-[176px] max-w-[calc(100vw-100px)] object-contain sm:w-[205px] md:w-[225px]"
            : footer
            ? "h-auto w-[250px] max-w-full object-contain sm:w-[280px] lg:w-[250px] xl:w-[300px]"
            : "h-auto w-[184px] sm:w-[210px] md:w-[230px]"
        }
      />
    </a>
  );
}

export default Brand;
