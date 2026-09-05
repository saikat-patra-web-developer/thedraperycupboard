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

const pages = {
  "/": HomePage,
  "/products": ProductsPage,
  "/about": AboutPage,
  "/services": ServicesPage,
  "/contact": ContactPage,
  "/online-quote": OnlineQuotePage,
  "/resources": ResourcesPage,
  "/projects": ProjectsPage,
  "/privacy": PrivacyPolicyPage,
  "/terms": TermsPage,
};

export default function AppRoutes({ path }) {
  const product = path.match(/^\/products\/([^/]+)$/);
  if (product) return <ProductDetailPage key={product[1]} id={product[1]} />;
  const Page = pages[path] || NotFoundPage;
  return <Page />;
}
