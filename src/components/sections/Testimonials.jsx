function Testimonials() {
  return (
    <section className="wrap pb-12 md:pb-16">
      <div className="rounded-2xl bg-[#f0efec] p-5 sm:p-7 lg:p-8">
        <div className="eyebrow text-center">What our customers say</div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            [
              "The Drapery Cupboard are our go-to supplier. Quality products, great pricing and always delivered on time.",
              "Jason R.",
              "Interior Designer, Auckland",
            ],
            [
              "The team are incredibly helpful and knowledgeable.",
              "Sarah T.",
              "Builder, Hamilton",
            ],
            [
              "Consistent quality and service that we can rely on for every project, big or small.",
              "Mike P.",
              "Project Manager, Wellington",
            ],
          ].map(([quote, name, role]) => (
            <article
              className="relative rounded-xl border border-black/5 bg-white/70 p-6"
              key={name}
            >
              <span className="absolute right-5 top-2 font-serif text-5xl text-lime">
                “
              </span>
              <p className="muted max-w-[85%] !text-sm">{quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#deded4] text-xs">
                  {name[0]}
                </div>
                <div>
                  <b className="text-sm">{name}</b>
                  <p className="text-xs text-neutral-500">{role}</p>
                </div>
                <span
                  aria-label="5 out of 5 stars"
                  className="ml-auto text-sm text-amber-500"
                >
                  ★★★★★
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
