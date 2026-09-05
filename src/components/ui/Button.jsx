import Arrow from "./Arrow.jsx";

function Button({ children, to = "/contact", dark = false, outline = false }) {
  return (
    <a
      href={to}
      className={
        "btn " + (dark ? "btn-dark " : "") + (outline ? "btn-outline " : "")
      }
    >
      {children}
      <Arrow />
    </a>
  );
}

export default Button;
