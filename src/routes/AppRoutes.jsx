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
import PartDetailPage from "../pages/PartDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";

const pages = {
  "/": HomePage,
  "/products": ProductsPage,
  "/parts": PartsPage,
  "/shop": PartsPage,
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
  const part = path.match(/^\/parts\/([^/]+)$/);
  if (part) return <PartDetailPage key={part[1]} id={part[1]} />;

  const product = path.match(/^\/products\/([^/]+)$/);
  if (product) return <ProductDetailPage key={product[1]} id={product[1]} />;

  const Page = pages[path] || NotFoundPage;
  return <Page />;
}

