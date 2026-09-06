import { useState } from "react";
import Brand from "./Brand.jsx";
import Button from "../ui/Button.jsx";
import Img from "../ui/Image.jsx";
import { products } from "../../data/products.js";

function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
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
          {nav.map(([name, url]) => {
            const link = (
              <a
                href={url}
                className={
                  "relative inline-flex items-center gap-1.5 py-3 text-sm font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-[width] " +
                  (overlaysHero ? "after:bg-lime " : "after:bg-moss ") +
                  ((path === url || (url === "/products" && path.startsWith("/products/"))) ? "after:w-full" : "after:w-0 hover:after:w-full")
                }
              >
                {name}
                {url === "/products" && <span aria-hidden="true" className="text-[10px]">▾</span>}
              </a>
            );

            if (url !== "/products") return <span key={url}>{link}</span>;

            return (
              <div key={url} className="group relative">
                {link}
                <div className="invisible absolute left-1/2 top-full z-50 w-[38rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-2xl border border-black/10 bg-white p-3 text-[#17241f] shadow-2xl [text-shadow:none]">
                    <a href="/products" className="mb-1 flex items-center justify-between rounded-xl px-3 py-2.5 font-semibold text-forest hover:bg-[#f4f7ef]">
                      View all products <span aria-hidden="true">→</span>
                    </a>
                    <div className="grid grid-cols-2 gap-1 border-t border-black/5 pt-2">
                      {products.map((product) => (
                        <a key={product.slug} href={`/products/${product.slug}`} className="group/item flex items-center gap-3 rounded-xl p-2 text-sm font-medium hover:bg-[#f4f7ef] hover:text-forest">
                          <Img
                            name={product.image}
                            alt=""
                            sizes="56px"
                            className="h-11 w-14 shrink-0 rounded-lg bg-neutral-100 transition-transform duration-200 group-hover/item:scale-[1.04]"
                          />
                          <span>{product.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className={overlaysHero ? "hidden md:block" : "hidden sm:block"}>
          <Button dark to="/online-quote">
            Get Online Quote
          </Button>
        </div>
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => {
            setOpen(!open);
            if (open) setProductsOpen(false);
          }}
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
          className="absolute top-full z-50 max-h-[calc(100vh-72px)] w-full overflow-y-auto border-t border-black/10 bg-white px-5 py-4 text-[#17241f] shadow-xl lg:hidden"
        >
          {nav.map(([name, url]) => (
            <div key={url}>
              {url === "/products" ? (
                <button
                  type="button"
                  aria-expanded={productsOpen}
                  aria-controls="mobile-products"
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-left text-base font-semibold hover:bg-neutral-50"
                >
                  Products
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`size-5 shrink-0 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <a onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3.5 text-base font-semibold hover:bg-neutral-50" href={url}>
                  {name}
                </a>
              )}
              {url === "/products" && productsOpen && (
                <div id="mobile-products" className="mb-2 grid grid-cols-2 gap-1 border-y border-black/5 py-2 pl-3">
                  <a onClick={() => setOpen(false)} className="col-span-2 flex items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold text-forest hover:bg-[#f4f7ef]" href="/products">
                    View all products <span aria-hidden="true">→</span>
                  </a>
                  {products.map((product) => (
                    <a onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg p-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-forest" key={product.slug} href={`/products/${product.slug}`}>
                      <Img name={product.image} alt="" sizes="40px" className="size-10 shrink-0 rounded-md bg-neutral-100" />
                      <span>{product.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
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
