import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import usePageTitle from "./hooks/usePageTitle";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  usePageTitle(path);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4"
      >
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" className="page-enter">
        <AppRoutes path={path} />
      </main>
      <Footer />
    </>
  );
}
