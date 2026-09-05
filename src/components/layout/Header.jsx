import { useState } from "react";
import Brand from "./Brand.jsx";
import Button from "../ui/Button.jsx";

function Header({ path }) {
  const [open, setOpen] = useState(false);
  const overlaysHero = path === "/";
  const nav = [
    ["Home", "/"],
    ["Products", "/products"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Contact", "/contact"],
  ];
  return (
    <header
      className={
        "z-50 isolate w-full border-b " +
        (overlaysHero
          ? "absolute inset-x-0 top-0 border-white/15 bg-gradient-to-b from-forest/75 to-forest/35 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          : "relative border-black/5 bg-white")
      }
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-3 md:h-[84px] md:gap-6">
        <Brand footer={overlaysHero} compact={overlaysHero} />
        <nav
          aria-label="Main navigation"
          className={
            "hidden items-center gap-7 lg:flex xl:gap-9 " +
            (overlaysHero ? "[text-shadow:0_1px_8px_rgba(0,0,0,0.4)]" : "")
          }
        >
          {nav.map(([name, url]) => (
            <a
              key={url}
              href={url}
              className={
                "relative py-3 text-sm font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-[width] " +
                (overlaysHero ? "after:bg-lime " : "after:bg-moss ") +
                ((path === url || (url === "/products" && path.startsWith("/products/"))) ? "after:w-full" : "after:w-0 hover:after:w-full")
              }
            >
              {name}
            </a>
          ))}
        </nav>
        <div className={overlaysHero ? "hidden md:block" : "hidden sm:block"}>
          <Button dark to="/online-quote">
            Get Online Quote
          </Button>
        </div>
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={
            "flex size-12 items-center justify-center rounded-full text-2xl transition lg:hidden " +
            (overlaysHero ? "hover:bg-white/10" : "hover:bg-neutral-100")
          }
        >
          {open ? "×" : "☰"}
        </button>
      </div>
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="absolute top-full z-50 w-full border-t border-black/10 bg-white px-5 py-4 text-[#17241f] shadow-xl lg:hidden"
        >
          {nav.map(([name, url]) => (
            <a onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3.5 text-base font-semibold hover:bg-neutral-50" key={url} href={url}>
              {name}
            </a>
          ))}
          <div className={overlaysHero ? "mt-2 md:hidden" : "mt-2 sm:hidden"}>
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
