import { contact } from "../../data/contact.js";
import Brand from "./Brand.jsx";
import { products } from "../../data/products.js";

export default function Footer() {
  return <footer className="bg-forest text-white"><div className="wrap">
    <div className="grid grid-cols-1 gap-9 border-y border-white/20 py-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_.75fr_1.65fr_1fr] lg:py-10">
      <div className="sm:col-span-1"><Brand footer /><p className="mt-5 max-w-64 text-xs leading-relaxed text-white/70">Quality, budget-friendly window coverings tailored to New Zealand homes and commercial spaces.</p></div>
      <div><h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-lime">Explore</h4><div className="flex flex-col gap-3 text-xs text-white/75">
        {[["Home","/"],["Products","/products"],["Online Quote","/online-quote"],["About","/about"],["Services","/services"],["Projects","/projects"],["Resources & FAQs","/resources"]].map(([name,url]) => <a key={url} href={url}>{name}</a>)}
      </div></div>
      <div className="sm:col-span-1"><h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-lime">Our Products</h4><div className="grid grid-cols-2 gap-x-5 gap-y-3 text-xs text-white/75">{products.map(product => <a key={product.slug} href={"/products/"+product.slug}>{product.name}</a>)}</div></div>
      <div><h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-lime">Get in Touch</h4><div className="flex flex-col gap-3 text-xs leading-relaxed text-white/75">{contact.phones.map(phone => <a key={phone.href} href={phone.href}>{phone.label}</a>)}<a href={contact.emailHref}>{contact.email}</a><a href="/contact">{contact.address}</a><a href="/online-quote" className="text-lime">Get a Free Quote →</a></div></div>
    </div>
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:justify-between text-[10px] text-white/60"><span>© {new Date().getFullYear()} The Drapery Cupboard. All rights reserved.</span><div className="flex gap-6"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a></div></div>
  </div></footer>;
}
