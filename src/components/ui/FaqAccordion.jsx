function Faq({ items }) {
  return (
    <div>
      {items.map(([q, a]) => (
        <details className="border-b border-neutral-200" key={q}>
          <summary className="flex items-center justify-between gap-5 py-4 text-xs font-semibold">
            {q}
            <span className="plus text-lg font-normal transition">+</span>
          </summary>
          <p className="muted pb-5">{a}</p>
        </details>
      ))}
    </div>
  );
}

export default Faq;
