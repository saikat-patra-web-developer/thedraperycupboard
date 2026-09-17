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
import BlogPage from "../pages/BlogPage";
import BlogPostPage from "../pages/BlogPostPage";
import ServiceDetailPage from "../pages/ServiceDetailPage";
import { findPart } from "../data/parts.js";
import { findService } from "../data/servicesData.js";

const pages = {
  "/": HomePage,
  "/products": ProductsPage,
  "/parts": PartsPage,
  "/shop": PartsPage,
  "/product": ProductViewPage,
  "/cart": CartPage,
  "/checkout": CheckoutPage,
  "/order-confirmation": OrderConfirmationPage,
  "/blog": BlogPage,
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
  const normalizedPath =
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

  const serviceDetail = normalizedPath.match(/^\/services\/([^/]+)$/);
  if (serviceDetail) return <ServiceDetailPage key={serviceDetail[1]} slug={serviceDetail[1]} />;

  const directService = findService(normalizedPath);
  if (directService && normalizedPath !== "/services") {
    return <ServiceDetailPage key={directService.slug} slug={directService.slug} />;
  }

  const blogPost = normalizedPath.match(/^\/blog\/([^/]+)$/);
  if (blogPost) return <BlogPostPage key={blogPost[1]} slug={blogPost[1]} />;

  const productView = normalizedPath.match(/^\/(?:parts|product)\/([^/]+)$/);
  if (productView) return <ProductViewPage key={productView[1]} id={productView[1]} />;

  const product = normalizedPath.match(/^\/products\/([^/]+)$/);
  if (product) {
    if (findPart(product[1])) {
      return <ProductViewPage key={product[1]} id={product[1]} />;
    }
    return <ProductDetailPage key={product[1]} id={product[1]} />;
  }

  const Page = pages[normalizedPath] || NotFoundPage;
  return <Page />;
}

