import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ContactPage from "../pages/ContactPage";
import ResourcesPage from "../pages/ResourcesPage";
import ProjectsPage from "../pages/ProjectsPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage";
import NotFoundPage from "../pages/NotFoundPage";
import OnlineQuotePage from "../pages/OnlineQuotePage";
import LivePreviewPage from "../pages/LivePreviewPage";
import PartsPage from "../pages/PartsPage";
import ProductViewPage from "../pages/ProductViewPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import { findPart } from "../data/parts.js";

const pages = {
  "/": HomePage,
  "/products": ProductsPage,
  "/parts": PartsPage,
  "/shop": PartsPage,
  "/product": ProductViewPage,
  "/cart": CartPage,
  "/checkout": CheckoutPage,
  "/order-confirmation": OrderConfirmationPage,
  "/about": AboutPage,
  "/services": ServicesPage,
  "/contact": ContactPage,
  "/online-quote": OnlineQuotePage,
  "/live-preview": LivePreviewPage,
  "/preview": LivePreviewPage,
  "/resources": ResourcesPage,
  "/projects": ProjectsPage,
  "/privacy": PrivacyPolicyPage,
  "/terms": TermsPage,
};

export default function AppRoutes({ path }) {
  const productView = path.match(/^\/(?:parts|product)\/([^/]+)$/);
  if (productView) return <ProductViewPage key={productView[1]} id={productView[1]} />;

  const product = path.match(/^\/products\/([^/]+)$/);
  if (product) {
    if (findPart(product[1])) {
      return <ProductViewPage key={product[1]} id={product[1]} />;
    }
    return <ProductDetailPage key={product[1]} id={product[1]} />;
  }

  const Page = pages[path] || NotFoundPage;
  return <Page />;
}

