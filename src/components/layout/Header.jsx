import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import Brand from "./Brand.jsx";
import Button from "../ui/Button.jsx";
import Img from "../ui/Image.jsx";
import Icon from "../ui/Icon.jsx";
import { products } from "../../data/products.js";
import { findService, getAllServices } from "../../data/servicesData.js";
import { PART_CATEGORIES, parts } from "../../data/parts.js";
import { useCart } from "../../hooks/useCart.js";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { cartCount } = useCart();
  const shouldReduceMotion = useReducedMotion();
  const isHome = path === "/";
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 80
  );

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 80;
      setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const currentService = findService(path);
  const isServicesActive =
    path === "/services" ||
    path === "/services/" ||
    path.startsWith("/services/") ||
    Boolean(currentService);

  const overlaysHero = isHome && !isScrolled && !open;
  const nav = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Products", "/products"],
    ["Online SHOP", "/online-shop"],
    ["Blog", "/blog"],
    ["Contact", "/contact"],
  ];
  return (
    <motion.header
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className={
        "top-0 z-40 w-full transition-all duration-300 " +
        (isHome ? "fixed " : "sticky ") +
        (overlaysHero
          ? "bg-transparent text-white"
          : "border-b border-black/10 bg-white/95 text-forest shadow-xs backdrop-blur-md")
      }
    >
      <div
        className={
          "wrap flex items-center justify-between gap-4 transition-all duration-300 " +
          (isScrolled ? "py-3 md:py-3.5" : "py-4 md:py-5")
        }
      >
        <Brand footer={overlaysHero} compact={overlaysHero} />
        <nav aria-label="Main" className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7 text-xs font-semibold uppercase tracking-[0.14em]">
          {nav.map(([name, url]) => {
            const isShop = url === "/online-shop" || url === "/parts";
            const isShopActive =
              isShop &&
              (path === "/online-shop" ||
                path === "/parts" ||
                path === "/shop" ||
                path.startsWith("/online-shop/") ||
                path.startsWith("/parts/") ||
                path.startsWith("/shop/"));
            const isActive =
              url === "/services"
                ? isServicesActive
                : isShop
                  ? isShopActive
                  : path === url || (url !== "/" && path.startsWith(url));

            const link = (
              <a
                href={url}
                className={
                  "relative py-1 transition " +
                  (isActive ? (overlaysHero ? "text-white " : "text-forest ") : overlaysHero ? "text-white/80 hover:text-white " : "text-forest/75 hover:text-forest ") +
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all " +
                  (overlaysHero ? "after:bg-lime " : "after:bg-moss ") +
                  (isActive ? "after:w-full" : "after:w-0 hover:after:w-full")
                }
              >
                {name}
                {(url === "/products" || url === "/services" || isShop) && (
                  <span aria-hidden="true" className="text-[10px] ml-0.5">▾</span>
                )}
              </a>
            );

            if (url === "/services") {
              const allServiceItems = getAllServices();
              return (
                <div key={url} className="group relative">
                  {link}
                  <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-2xl border border-black/10 bg-white p-2 text-forest shadow-2xl [text-shadow:none]">
                      <div className="flex flex-col gap-0.5">
                        <a
                          href="/services"
                          className="flex items-center justify-between rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-moss hover:bg-brand-50 transition-colors border-b border-black/5 mb-1"
                        >
                          <span>All Services</span>
                          <span aria-hidden="true">→</span>
                        </a>
                        {allServiceItems.map((s) => {
                          const isItemActive = currentService && (currentService.id === s.id || currentService.slug === s.slug);
                          return (
                            <a
                              key={s.slug}
                              href={s.canonicalUrl}
                              className={
                                "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-colors " +
                                (isItemActive
                                  ? "bg-brand-50 text-moss font-semibold"
                                  : "font-medium normal-case tracking-normal text-forest hover:bg-brand-50 hover:text-forest")
                              }
                            >
                              <div className="flex items-center gap-3">
                                <span className={"flex size-7 shrink-0 items-center justify-center rounded-lg " + (isItemActive ? "bg-lime/25 text-moss" : "bg-brand-50 text-moss")}>
                                  <Icon name={s.icon} size={15} />
                                </span>
                                <span>{s.name}</span>
                              </div>
                              {isItemActive && (
                                <span className="size-2 rounded-full bg-lime"></span>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (isShop) {
              const shopCategories = PART_CATEGORIES.filter((c) => c.id !== "all");
              return (
                <div key={url} className="group relative">
                  {link}
                  <div className="invisible absolute left-1/2 top-full z-50 w-[38rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-2xl border border-black/10 bg-white p-3.5 text-forest shadow-2xl [text-shadow:none]">
                      {/* Top Header Strip */}
                      <div className="flex items-center justify-between border-b border-black/5 pb-2.5 px-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-moss">Online Shop</p>
                          <p className="text-xs text-neutral-500 font-normal normal-case">Blinds Parts & Hardware Replacement</p>
                        </div>
                        <a
                          href="/online-shop"
                          className="flex items-center gap-1 text-xs font-bold text-moss hover:text-forest transition-colors rounded-lg px-2.5 py-1 hover:bg-brand-50"
                        >
                          <span>View all ({parts.length})</span>
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>

                      {/* 2-Column Category Grid */}
                      <div className="grid grid-cols-2 gap-1.5 py-2.5">
                        {shopCategories.map((cat) => {
                          const count = parts.filter((p) => p.category === cat.id).length;
                          return (
                            <a
                              key={cat.id}
                              href={`/online-shop?category=${cat.id}`}
                              className="group/cat flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50"
                            >
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-moss transition-colors group-hover/cat:bg-lime/25 group-hover/cat:text-forest">
                                <Icon name={cat.icon || "tools"} size={18} />
                              </span>
                              <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-forest group-hover/cat:text-moss transition-colors">
                                  {cat.name}
                                </p>
                                <p className="text-[11px] text-neutral-400 font-normal normal-case">
                                  {count} replacement {count === 1 ? "part" : "parts"}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>

                      {/* Bottom Perks & Cart Bar */}
                      <div className="flex items-center justify-between rounded-xl bg-brand-50/70 border border-brand-line/60 px-3.5 py-2 text-xs">
                        <div className="flex items-center gap-2 text-neutral-600 normal-case font-normal">
                          <Icon name="truck" size={14} className="text-moss shrink-0" />
                          <span>Fast tracked courier delivery across NZ</span>
                        </div>
                        <a
                          href="/cart"
                          className="flex items-center gap-1.5 font-bold text-forest hover:text-moss transition-colors"
                        >
                          <span>Cart ({cartCount})</span>
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (url !== "/products") return <span key={url}>{link}</span>;

            return (
              <div key={url} className="group relative">
                {link}
                <div className="invisible absolute left-1/2 top-full z-50 w-[48rem] max-w-[calc(100vw-2rem)] xl:w-[52rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-2xl border border-black/10 bg-white p-3.5 text-forest shadow-2xl [text-shadow:none]">
                    <a href="/products" className="mb-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-forest hover:bg-brand-50">
                      View all products ({products.length}) <span aria-hidden="true">→</span>
                    </a>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 border-t border-black/5 pt-2">
                      {products.map((product) => (
                        <a key={product.slug} href={`/products/${product.slug}`} className="group/item flex items-center gap-2.5 rounded-xl p-2 text-xs font-medium hover:bg-brand-50 hover:text-forest">
                          <Img
                            name={product.image}
                            alt=""
                            sizes="48px"
                            className="h-10 w-12 shrink-0 rounded-lg bg-neutral-100 object-cover transition-transform duration-200 group-hover/item:scale-[1.04]"
                          />
                          <span className="truncate">{product.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right Action Cluster: Cart Button + Online Quote + Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Cart Trigger (Links Directly to Proper Cart Page) */}
          <a
            href="/cart"
            aria-label={`View shopping cart, ${cartCount} items`}
            className={`relative flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
              overlaysHero
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-brand-50 text-forest hover:bg-brand-100 border border-brand-line"
            }`}
          >
            <svg
              className={`size-4 ${overlaysHero ? "text-lime" : "text-moss"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="hidden sm:inline font-bold">Cart</span>
            {cartCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-forest shadow-xs">
                {cartCount}
              </span>
            )}
          </a>

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
              if (open) {
                setProductsOpen(false);
                setServicesOpen(false);
                setShopOpen(false);
              }
            }}
            className={
              "flex size-11 items-center justify-center rounded-full text-2xl transition lg:hidden " +
              (overlaysHero ? "hover:bg-white/10" : "hover:bg-neutral-100")
            }
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="absolute top-full z-50 max-h-[calc(100vh-72px)] w-full overflow-y-auto border-t border-black/10 bg-white px-5 py-4 text-forest shadow-xl lg:hidden"
        >
          {nav.map(([name, url]) => (
            <div key={url}>
              {url === "/services" ? (
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-left text-base font-semibold hover:bg-neutral-50"
                >
                  Services
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`size-5 shrink-0 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : url === "/products" ? (
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
              ) : (url === "/online-shop" || url === "/parts") ? (
                <button
                  type="button"
                  aria-expanded={shopOpen}
                  aria-controls="mobile-shop"
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-left text-base font-semibold hover:bg-neutral-50"
                >
                  Online SHOP
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`size-5 shrink-0 transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <a onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3.5 text-base font-semibold hover:bg-neutral-50" href={url}>
                  {name}
                </a>
              )}
              {url === "/services" && servicesOpen && (
                <div id="mobile-services" className="mb-2 flex flex-col gap-1 border-y border-black/5 py-2 pl-3">
                  <a onClick={() => setOpen(false)} className="flex items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold text-forest hover:bg-brand-50" href="/services">
                    View all services <span aria-hidden="true">→</span>
                  </a>
                  {getAllServices().map((s) => {
                    const isItemActive = currentService && (currentService.id === s.id || currentService.slug === s.slug);
                    return (
                      <a
                        key={s.slug}
                        onClick={() => setOpen(false)}
                        className={
                          "flex items-center justify-between rounded-lg p-2 text-sm transition-colors " +
                          (isItemActive
                            ? "bg-brand-50 text-moss font-semibold"
                            : "text-neutral-600 hover:bg-neutral-50 hover:text-forest")
                        }
                        href={s.canonicalUrl}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={"flex size-6 shrink-0 items-center justify-center rounded-md " + (isItemActive ? "bg-lime/30 text-forest" : "bg-brand-50 text-moss")}>
                            <Icon name={s.icon} size={14} />
                          </span>
                          <span>{s.name}</span>
                        </div>
                        {isItemActive && (
                          <span className="size-1.5 rounded-full bg-lime mr-1"></span>
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
              {url === "/products" && productsOpen && (
                <div id="mobile-products" className="mb-2 grid grid-cols-2 gap-1 border-y border-black/5 py-2 pl-3">
                  <a onClick={() => setOpen(false)} className="col-span-2 flex items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold text-forest hover:bg-brand-50" href="/products">
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
              {(url === "/online-shop" || url === "/parts") && shopOpen && (
                <div id="mobile-shop" className="mb-2 flex flex-col gap-1 border-y border-black/5 py-2 pl-3">
                  <a
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold text-moss hover:bg-brand-50"
                    href="/online-shop"
                  >
                    <span>View all shop items ({parts.length})</span>
                    <span aria-hidden="true">→</span>
                  </a>
                  {PART_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                    const count = parts.filter((p) => p.category === cat.id).length;
                    return (
                      <a
                        key={cat.id}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-lg p-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-forest"
                        href={`/online-shop?category=${cat.id}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-50 text-moss">
                            <Icon name={cat.icon || "tools"} size={14} />
                          </span>
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-xs text-neutral-400 font-medium">
                          {count}
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 pt-3 border-t border-black/10 flex flex-col gap-2">
            <a
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-between rounded-xl bg-brand-50 border border-brand-line px-4 py-3 text-sm font-semibold text-forest hover:bg-brand-100 transition"
            >
              <span className="flex items-center gap-2">
                <svg className="size-4 text-moss" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Shopping Cart
              </span>
              <span className="rounded-full bg-forest px-2.5 py-0.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            </a>
            <div className={overlaysHero ? "md:hidden" : "sm:hidden"}>
              <Button dark to="/online-quote">
                Get Online Quote
              </Button>
            </div>
          </div>
        </nav>
      )}
    </motion.header>
  );
}
export default Header;
