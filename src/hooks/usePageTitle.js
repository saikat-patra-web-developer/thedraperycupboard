import { useEffect } from "react";
import { findProduct } from "../data/products.js";

const titles = {
  "/": "Blinds, Curtains & Outdoor Living",
  "/products": "Our Products",
  "/about": "About Us",
  "/services": "Our Services",
  "/contact": "Contact Us",
  "/online-quote": "Get an Online Quote",
  "/resources": "Resources",
  "/projects": "Projects & Inspiration",
  "/privacy": "Privacy Policy",
  "/terms": "Terms & Conditions",
};

export default function usePageTitle(path) {
  useEffect(() => {
    const productId = path.match(/^\/products\/([^/]+)$/)?.[1];
    const product = findProduct(productId);
    const title = titles[path] || product?.name || "Page Not Found";
    document.title = title + " | The Drapery Cupboard";
  }, [path]);
}
