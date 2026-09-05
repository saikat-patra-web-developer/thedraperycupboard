import { contact } from "../../data/contact.js";
import Brand from "./Brand.jsx";
import { products } from "../../data/products.js";

export default function Footer() {
  return <footer className="bg-forest text-white"><div className="wrap">
    <div className="grid grid-cols-1 items-start gap-x-10 gap-y-10 border-y border-white/20 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-[1.05fr_.55fr_1.35fr_.9fr] lg:gap-x-6 xl:grid-cols-[minmax(260px,1.15fr)_minmax(130px,.55fr)_minmax(360px,1.45fr)_minmax(220px,1fr)] xl:gap-x-12">
      <div className="sm:col-span-1"><Brand footer /><p className="mt-5 max-w-72 text-sm leading-7 text-white/70">Quality, budget-friendly window coverings tailored to New Zealand homes and commercial spaces.</p></div>
      <div><h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime">Explore</h4><div className="flex flex-col gap-3 text-sm text-white/75 [&_a]:w-fit [&_a]:transition-colors [&_a:hover]:text-lime">
        {[["Home","/"],["Products","/products"],["Online Quote","/online-quote"],["About","/about"],["Services","/services"],["Projects","/projects"],["Resources & FAQs","/resources"]].map(([name,url]) => <a key={url} href={url}>{name}</a>)}
      </div></div>
      <div className="sm:col-span-1"><h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime">Our Products</h4><div className="grid grid-cols-2 gap-x-7 gap-y-3 text-sm text-white/75 [&_a]:w-fit [&_a]:transition-colors [&_a:hover]:text-lime">{products.map(product => <a key={product.slug} href={"/products/"+product.slug}>{product.name}</a>)}</div></div>
      <div className="min-w-0"><h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime">Get in Touch</h4><div className="flex min-w-0 flex-col gap-3 text-sm leading-6 text-white/75 [&_a]:w-fit [&_a]:max-w-full [&_a]:transition-colors [&_a:hover]:text-lime">{contact.phones.map(phone => <a key={phone.href} href={phone.href}>{phone.label}</a>)}<a className="break-all" href={contact.emailHref}>{contact.email}</a><a href="/contact">{contact.address}</a><a href="/online-quote" className="!text-lime hover:!text-white">Get a Free Quote →</a></div></div>
    </div>
    <div className="flex flex-col gap-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} The Drapery Cupboard. All rights reserved.</span><div className="flex flex-wrap gap-6 [&_a]:transition-colors [&_a:hover]:text-white"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a></div></div>
  </div></footer>;
}
