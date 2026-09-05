function Brand({ footer = false }) {
  return (
    <a
      href="/"
      aria-label="The Drapery Cupboard home"
      className="flex shrink-0 items-center gap-3"
    >
      <img
        src="/images/logo.png"
        alt="The Drapery Cupboard — blinds, curtains and shutters"
        className={
          footer
            ? "h-auto w-[240px] max-w-full sm:w-[270px] lg:w-[230px] xl:w-[290px]"
            : "h-auto w-[184px] sm:w-[210px] md:w-[230px]"
        }
      />
    </a>
  );
}

export default Brand;
