import { useState } from "react";
import Brand from "./Brand.jsx";
import Button from "../ui/Button.jsx";

function Header({ path }) {
  const [open, setOpen] = useState(false);
  const nav = [
    ["Home", "/"],
    ["Products", "/products"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Contact", "/contact"],
  ];
  return (
    <header className="relative z-30 border-b border-black/5 bg-white">
      <div className="wrap flex h-[72px] items-center justify-between gap-3 md:h-[84px] md:gap-6">
        <Brand />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex xl:gap-9"
        >
          {nav.map(([name, url]) => (
            <a
              key={url}
              href={url}
              className={
                "relative py-3 text-sm font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-moss after:transition-[width] " +
                ((path === url || (url === "/products" && path.startsWith("/products/"))) ? "after:w-full" : "after:w-0 hover:after:w-full")
              }
            >
              {name}
            </a>
          ))}
        </nav>
        <div className="hidden sm:block">
          <Button dark to="/online-quote">
            Get Online Quote
          </Button>
        </div>
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex size-12 items-center justify-center rounded-full text-2xl transition hover:bg-neutral-100 lg:hidden"
        >
          {open ? "×" : "☰"}
        </button>
      </div>
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="absolute top-full w-full border-t bg-white px-5 py-4 shadow-xl lg:hidden"
        >
          {nav.map(([name, url]) => (
            <a onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3.5 text-base font-semibold hover:bg-neutral-50" key={url} href={url}>
              {name}
            </a>
          ))}
          <div className="mt-2 sm:hidden">
            <Button dark to="/online-quote">
              Get Online Quote
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
export default Header;
