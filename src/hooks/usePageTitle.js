import { useEffect } from "react";
import { findProduct } from "../data/products.js";
import { findPart } from "../data/parts.js";

const titles = {
  "/": "Blinds, Curtains & Outdoor Living",
  "/products": "Our Products",
  "/parts": "Blinds Replacement Parts & Hardware Shop",
  "/shop": "Blinds Replacement Parts & Hardware Shop",
  "/product": "View Product",
  "/cart": "Shopping Cart",
  "/checkout": "Secure Checkout",
  "/order-confirmation": "Order Confirmation",
  "/about": "About Us",
  "/services": "Our Services",
  "/contact": "Contact Us",
  "/online-quote": "Get an Online Quote",
  "/live-preview": "Live Room Preview",
  "/preview": "Live Room Preview",
  "/resources": "Resources",
  "/projects": "Projects & Inspiration",
  "/privacy": "Privacy Policy",
  "/terms": "Terms & Conditions",
};

export default function usePageTitle(path) {
  useEffect(() => {
    const partId = path.match(/^\/(?:parts|product)\/([^/]+)$/)?.[1];
    const part = partId ? findPart(partId) : null;

    const productId = path.match(/^\/products\/([^/]+)$/)?.[1];
    const product = productId ? (findProduct(productId) || findPart(productId)) : null;

    const title = titles[path] || part?.name || product?.name || "Page Not Found";
    document.title = title + " | The Drapery Cupboard";
  }, [path]);
}

