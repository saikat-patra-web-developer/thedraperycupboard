function Heading({ label, title, children }) {
  return (
    <>
      <div className="eyebrow">{label}</div>
      <h2>{title}</h2>
      {children && <p className="muted mt-4 max-w-md">{children}</p>}
    </>
  );
}

export default Heading;
