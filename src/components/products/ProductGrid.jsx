import Img from "../ui/Image.jsx";
import Arrow from "../ui/Arrow.jsx";
import { products } from "../../data/products.js";

export default function ProductGrid({ full = false, items = products }) {
  return (
    <div className={"grid gap-5 md:gap-6 md:grid-cols-3 lg:grid-cols-4 " + (full ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2")}>
      {items.map(product => (
        <a key={product.slug} href={"/products/" + product.slug}
          className={full ? "card group flex h-full flex-col" : "group"}>
          <div className="overflow-hidden rounded-md">
            <Img name={product.image} alt={product.name}
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
              className={"product-photo w-full " + (full ? "aspect-[1.35]" : "aspect-[1.65]")} />
          </div>
          <div className={full ? "flex flex-1 flex-col px-5 pb-6 pt-5" : "px-1 pt-3"}>
            {full ? <h3 className="!text-2xl">{product.name}</h3> : <b className="text-sm">{product.name}</b>}
            {full && <>
              <p className="muted mb-6 mt-3 !text-sm">{product.description}</p>
              <span className="text-link mt-auto">Explore Product <Arrow /></span>
            </>}
          </div>
        </a>
      ))}
    </div>
  );
}
