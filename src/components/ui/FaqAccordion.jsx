function Faq({ items = [] }) {
  if (!items || !items.length) return null;

  return (
    <div>
      {items.map((item, idx) => {
        const q = Array.isArray(item) ? item[0] : item?.q || item?.question;
        const a = Array.isArray(item) ? item[1] : item?.a || item?.answer;
        return (
          <details className="border-b border-neutral-200" key={q || idx}>
            <summary className="flex min-h-14 items-center justify-between gap-5 py-4 text-sm font-semibold cursor-pointer">
              <span>{q}</span>
              <span className="plus text-lg font-normal transition">+</span>
            </summary>
            <p className="muted pb-5 text-sm leading-relaxed">{a}</p>
          </details>
        );
      })}
    </div>
  );
}

export default Faq;
