import { useState, useEffect } from "react";
import { findBlogPost, getRelatedBlogPosts, blogPosts } from "../data/blogPosts.js";
import Arrow from "../components/ui/Arrow.jsx";
import Icon from "../components/ui/Icon.jsx";
import Cta from "../components/sections/CallToAction.jsx";

export default function BlogPostPage({ slug }) {
  const post = findBlogPost(slug);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(null); // 'yes' | 'no' | null
  const [tocOpen, setTocOpen] = useState(true);

  // Scroll reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ScrollSpy for Table of Contents
  useEffect(() => {
    if (!post?.toc || post.toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-135px 0px -60% 0px",
        threshold: 0,
      }
    );

    post.toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [post]);

  // Handle initial hash in URL if opened with an anchor
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace(/^#/, "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = 135;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          setActiveSection(id);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [slug]);

  if (!post) {
    return (
      <section className="wrap py-28 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-brand-line bg-white p-10 shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-moss">
            <Icon name="book" size={28} />
          </div>
          <h1 className="!text-2xl font-serif font-bold text-forest">Article Not Found</h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            The window furnishing guide you are looking for may have been moved, updated, or renamed.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/blog" className="btn !px-5 !py-2.5 !text-xs">
              ← Return to All Guides
            </a>
            <a href="/" className="btn btn-outline !px-5 !py-2.5 !text-xs">
              Home
            </a>
          </div>
        </div>
      </section>
    );
  }

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const related = getRelatedBlogPosts(post.slug, 3);
  const popularPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 4);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Header is ~96px tall; offset by 135px to leave ~39px of clean breathing room below sticky header
      const headerOffset = 135;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
      if (typeof window !== "undefined" && window.history.pushState) {
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  return (
    <>
      {/* 1. Sticky Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-lime via-[#8dca34] to-moss transition-[width] duration-150 ease-out shadow-xs"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      {/* 2. Top Editorial Utility & Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="border-b border-brand-line/60 bg-[#f9faf6] py-3 text-xs">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 text-neutral-500">
          <div className="flex items-center gap-2 overflow-hidden">
            <a href="/" className="hover:text-forest transition-colors">
              Home
            </a>
            <span className="text-neutral-300">/</span>
            <a href="/blog" className="hover:text-forest transition-colors">
              Design Journal
            </a>
            <span className="text-neutral-300">/</span>
            <span className="rounded bg-brand-100 px-2 py-0.5 font-bold text-moss">
              {post.category}
            </span>
            <span className="hidden md:inline text-neutral-300">/</span>
            <span className="hidden md:inline max-w-[260px] truncate font-medium text-forest">
              {post.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-semibold text-forest shadow-2xs transition hover:bg-brand-50"
              title="Copy article link to clipboard"
            >
              <Icon name="copy" size={12} className="text-moss" />
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-semibold text-forest shadow-2xs transition hover:bg-brand-50"
              title="Print article or save as PDF"
            >
              <Icon name="print" size={12} className="text-moss" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setBookmarked(!bookmarked)}
              className={`inline-flex items-center gap-1 rounded-full border border-brand-line bg-white px-2.5 py-1 text-xs font-semibold transition ${
                bookmarked ? "text-moss bg-brand-50 border-moss/40" : "text-neutral-500 hover:bg-brand-50"
              }`}
              title="Save guide"
            >
              <Icon name="bookmark" size={12} className={bookmarked ? "text-moss" : "text-neutral-400"} />
              <span className="hidden sm:inline">{bookmarked ? "Saved" : "Save"}</span>
            </button>

            <span className="text-neutral-300">|</span>

            <a
              href="/blog"
              className="inline-flex items-center gap-1 font-bold text-moss hover:underline"
            >
              ← Back to Journal
            </a>
          </div>
        </div>
      </nav>

      {/* 3. Main Editorial Header & Content Container */}
      <main className="wrap py-10 sm:py-16">
        
        {/* Masthead Header */}
        <header className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold tracking-[0.16em] uppercase text-moss text-[11px]">
              TDC Editorial • New Zealand Living
            </span>
            <span className="text-neutral-300">•</span>
            <span className="rounded-full bg-brand-100 px-3 py-0.5 text-xs font-bold text-moss">
              {post.category}
            </span>
          </div>

          <h1 className="mt-4 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[3.25rem] font-serif font-bold text-forest leading-[1.14] tracking-[-0.02em]">
            {post.title}
          </h1>

          {/* Lead excerpt */}
          {post.excerpt && (
            <p className="mt-5 border-l-2 border-lime pl-4 text-base sm:text-lg leading-relaxed text-neutral-600 font-normal">
              {post.excerpt}
            </p>
          )}

          {/* Detailed Author & Review Byline Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-brand-line/80 py-4 text-xs text-neutral-600">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-white tracking-wider ring-2 ring-lime/50">
                TDC
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-lime text-[8px] text-forest font-bold ring-2 ring-white">
                  ✓
                </span>
              </div>
              <div>
                <p className="font-bold text-forest text-[13px]">The Drapery Cupboard Styling Team</p>
                <p className="text-[11px] text-neutral-500">
                  Window Furnishings Specialists • Auckland & Waikato
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-neutral-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Icon name="calendar" size={13} className="text-moss" />
                <time dateTime={post.date}>{post.formattedDate}</time>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Icon name="clock" size={13} className="text-moss" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-moss">
                <Icon name="shield" size={13} /> NZ Code Compliant
              </span>
            </div>
          </div>
        </header>

        {/* Featured Hero Image */}
        {post.image && (
          <figure className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-line bg-neutral-100 shadow-[0_16px_40px_-15px_rgba(70,69,74,0.12)]">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="max-h-[520px] w-full object-cover"
              loading="eager"
            />
            <figcaption className="bg-brand-50/60 px-5 py-2.5 text-center text-[11px] font-medium text-neutral-500 border-t border-brand-line/50">
              Custom window treatments precision-measured and installed across Auckland & Waikato homes.
            </figcaption>
          </figure>
        )}

        {/* Two-Column Grid: Left Content (740px) + Right Sticky Actions/TOC (350px) */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px] gap-10 xl:gap-14 items-start">
          
          {/* LEFT: Main Editorial Article Column */}
          <article className="min-w-0">
            
            {/* Executive Summary / Key Takeaways Box */}
            <section className="mb-10 rounded-2xl border border-brand-line bg-gradient-to-br from-brand-50/90 to-white p-6 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-moss">
                <Icon name="spark" size={16} className="text-moss" />
                <span>At a Glance • Key Considerations for NZ Homes</span>
              </div>
              <ul className="mt-3.5 space-y-2.5 text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-moss font-bold text-[10px]">
                    1
                  </span>
                  <span><strong>Custom Made Precision:</strong> Eliminates unwanted light gaps and draughts for superior insulation compared to off-the-shelf imports.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-moss font-bold text-[10px]">
                    2
                  </span>
                  <span><strong>Engineered for NZ UV:</strong> We source fabrics tested against high New Zealand ultraviolet index levels to prevent premature fading.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-moss font-bold text-[10px]">
                    3
                  </span>
                  <span><strong>In-Home Mobile Service:</strong> Mobile showrooms service Greater Auckland and Waikato with 500+ real fabric swatches.</span>
                </li>
              </ul>
            </section>

            {/* Mobile/Tablet Collapsible Table of Contents */}
            {post.toc && post.toc.length > 0 && (
              <div className="lg:hidden mb-8 rounded-2xl border border-brand-line bg-[#f9faf6] p-5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setTocOpen(!tocOpen)}
                  className="flex w-full items-center justify-between text-left font-bold text-forest"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Icon name="book" size={16} className="text-moss" />
                    <span>Table of Contents ({post.toc.length} sections)</span>
                  </span>
                  <span className="text-xs text-moss font-semibold">
                    {tocOpen ? "Hide ▲" : "Show ▼"}
                  </span>
                </button>

                {tocOpen && (
                  <ol className="mt-4 space-y-2 border-t border-brand-line/70 pt-3 text-xs">
                    {post.toc.map((item, idx) => (
                      <li key={item.id} className="leading-relaxed">
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => scrollToSection(e, item.id)}
                          className="flex items-start gap-2 text-neutral-700 hover:text-moss"
                        >
                          <span className="font-bold text-moss">{idx + 1}.</span>
                          <span className="hover:underline">{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            {/* Rendered HTML Content with Classical Drop Cap & Luxury Styling */}
            <div
              className="blog-article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* In-Article Action / Quote Banner */}
            <section className="mt-14 rounded-2xl border border-brand-line bg-gradient-to-br from-[#f6f9ef] to-[#edf4e1]/70 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-moss">
                    Precision Craftsmanship
                  </span>
                  <h3 className="mt-1 !text-xl font-serif font-bold text-forest">
                    Ready to dress your windows with custom elegance?
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 sm:max-w-md leading-relaxed">
                    Book a free in-home consultation across Auckland & Waikato, or get an instant price estimate with our live online CPQ calculator.
                  </p>
                </div>
                <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
                  <a href="/online-quote" className="btn btn-dark !px-5 !py-3 !text-xs text-center">
                    Instant Online Quote <Arrow />
                  </a>
                  <a href="/contact" className="btn btn-outline !px-5 !py-3 !text-xs text-center">
                    Book Measure & Quote <Arrow />
                  </a>
                </div>
              </div>
            </section>

            {/* 4-Pillar Quality Promise Strip */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-brand-line bg-white p-5 text-center shadow-2xs">
              <div className="p-2">
                <Icon name="shield" size={20} className="mx-auto text-moss mb-1.5" />
                <h4 className="text-xs font-bold text-forest">5-Year Warranty</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">On fabrics & hardware</p>
              </div>
              <div className="p-2 border-l border-black/5">
                <Icon name="tools" size={20} className="mx-auto text-moss mb-1.5" />
                <h4 className="text-xs font-bold text-forest">100% Fit Guarantee</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">Laser precision measure</p>
              </div>
              <div className="p-2 border-l border-black/5">
                <Icon name="leaf" size={20} className="mx-auto text-moss mb-1.5" />
                <h4 className="text-xs font-bold text-forest">NZ UV Protection</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">Sun & fade resistant</p>
              </div>
              <div className="p-2 border-l border-black/5">
                <Icon name="truck" size={20} className="mx-auto text-moss mb-1.5" />
                <h4 className="text-xs font-bold text-forest">Auckland & Waikato</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">Mobile design service</p>
              </div>
            </div>

            {/* Author / Showroom Credibility Card */}
            <aside className="mt-12 rounded-2xl border border-brand-line bg-white p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-forest font-serif font-bold text-xl border border-brand-line shadow-2xs">
                  TDC
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-serif font-bold text-forest text-lg">
                      The Drapery Cupboard
                    </h4>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-moss bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-line">
                      100% New Zealand Owned
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    With local showrooms and mobile consultants covering Greater Auckland and Waikato, The Drapery Cupboard specializes in custom-made curtains, sunscreen blinds, roller blinds, roman blinds, venetian blinds, and motorized outdoor pergolas.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
                    <a
                      href="tel:0800550011"
                      className="inline-flex items-center gap-1.5 text-moss hover:underline"
                    >
                      <Icon name="phone" size={13} />
                      <span>Toll Free: 0800 55 00 11</span>
                    </a>
                    <span className="text-neutral-300">•</span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-forest hover:text-moss"
                    >
                      <Icon name="pin" size={13} />
                      <span>35 Main Road, Waikato, Te Kauwhata 3710</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Interactive Feedback & Share Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-line bg-brand-50/50 p-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-forest">Was this guide helpful?</span>
                {feedbackGiven ? (
                  <span className="text-moss font-bold">✓ Thank you for your feedback!</span>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFeedbackGiven("yes")}
                      className="rounded-md border border-brand-line bg-white px-2.5 py-1 font-semibold text-forest hover:bg-brand-50 transition"
                    >
                      👍 Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackGiven("no")}
                      className="rounded-md border border-brand-line bg-white px-2.5 py-1 font-semibold text-neutral-600 hover:bg-brand-50 transition"
                    >
                      👎 No
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-line bg-white px-3 py-1.5 font-bold text-forest shadow-2xs transition hover:bg-brand-50"
                >
                  <Icon name="copy" size={13} className="text-moss" />
                  <span>{copied ? "Copied!" : "Copy Link"}</span>
                </button>
                <a
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent("I thought you might like this window furnishing guide: " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-line bg-white px-3 py-1.5 font-bold text-forest shadow-2xs transition hover:bg-brand-50"
                >
                  <Icon name="mail" size={13} className="text-moss" />
                  <span>Email Guide</span>
                </a>
              </div>
            </div>

            {/* Topic Tags Cloud */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-neutral-500">Related Topics:</span>
              <span className="rounded-full bg-white border border-brand-line px-3 py-0.5 text-neutral-600">
                #{post.category.replace(/\s+/g, "")}
              </span>
              <span className="rounded-full bg-white border border-brand-line px-3 py-0.5 text-neutral-600">
                #CustomWindowFurnishings
              </span>
              <span className="rounded-full bg-white border border-brand-line px-3 py-0.5 text-neutral-600">
                #AucklandHomes
              </span>
              <span className="rounded-full bg-white border border-brand-line px-3 py-0.5 text-neutral-600">
                #WaikatoLiving
              </span>
              <span className="rounded-full bg-white border border-brand-line px-3 py-0.5 text-neutral-600">
                #EnergyEfficiency
              </span>
            </div>

            {/* Previous & Next Post Links */}
            {(prevPost || nextPost) && (
              <nav aria-label="Article navigation" className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brand-line pt-8">
                {prevPost ? (
                  <a
                    href={`/blog/${prevPost.slug}`}
                    className="group flex flex-col rounded-xl border border-brand-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md hover:border-moss/40"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-moss transition">
                      ← Previous Guide
                    </span>
                    <span className="mt-1 font-serif text-sm font-bold text-forest line-clamp-2 group-hover:text-moss transition">
                      {prevPost.title}
                    </span>
                  </a>
                ) : (
                  <div />
                )}

                {nextPost && (
                  <a
                    href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col items-end text-right rounded-xl border border-brand-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md hover:border-moss/40"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-moss transition">
                      Next Guide →
                    </span>
                    <span className="mt-1 font-serif text-sm font-bold text-forest line-clamp-2 group-hover:text-moss transition">
                      {nextPost.title}
                    </span>
                  </a>
                )}
              </nav>
            )}
          </article>

          {/* RIGHT: Desktop Sticky Sidebar (350px) */}
          <aside className="hidden lg:block space-y-6 lg:sticky lg:top-28 self-start">
            
            {/* Widget 1: Interactive Table of Contents (Stepper & ScrollSpy) */}
            {post.toc && post.toc.length > 0 && (
              <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-brand-line/80 pb-3">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest">
                    <Icon name="book" size={15} className="text-moss" />
                    <span>Article Contents</span>
                  </span>
                  <span className="text-[11px] font-bold text-moss">
                    {Math.round(readingProgress)}% read
                  </span>
                </div>

                <nav aria-label="Table of contents" className="mt-3.5 max-h-[360px] overflow-y-auto pr-1 space-y-1 text-xs">
                  {post.toc.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`group flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 transition-all duration-150 leading-snug ${
                          isActive
                            ? "bg-brand-100 text-forest font-bold pl-3 border-l-3 border-moss"
                            : "text-neutral-600 hover:bg-brand-50 hover:text-forest"
                        }`}
                      >
                        <span className={`text-[10px] font-bold shrink-0 mt-0.5 ${isActive ? "text-moss" : "text-neutral-400"}`}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{item.title}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Widget 2: Live CPQ Online Price Estimator */}
            <div className="overflow-hidden rounded-2xl bg-forest text-white shadow-md">
              <div className="bg-gradient-to-r from-lime to-[#8dca34] px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-forest flex items-center justify-between">
                <span>Instant CPQ Engine</span>
                <span className="text-[10px] bg-forest/20 px-1.5 py-0.5 rounded font-extrabold">LIVE</span>
              </div>
              <div className="p-5">
                <h3 className="!text-lg font-serif font-bold text-white">
                  Get Instant Online Pricing
                </h3>
                <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                  Enter your window width and drop to see wholesale-direct prices for custom roller blinds, sunscreens & curtains.
                </p>
                <ul className="mt-3.5 space-y-1.5 text-xs text-neutral-200">
                  <li className="flex items-center gap-2">
                    <Icon name="check" size={12} className="text-lime" />
                    <span>Real-time NZD price calculation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" size={12} className="text-lime" />
                    <span>13 custom window styles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" size={12} className="text-lime" />
                    <span>No sales calls required</span>
                  </li>
                </ul>
                <div className="mt-5">
                  <a
                    href="/online-quote"
                    className="btn !w-full !min-h-10 !bg-lime !text-forest hover:!bg-[#8dca34] !text-xs !font-bold text-center"
                  >
                    Calculate Your Price Now <Arrow />
                  </a>
                </div>
              </div>
            </div>

            {/* Widget 3: Free In-Home Consultation & Mobile Showroom */}
            <div className="rounded-2xl border border-brand-line bg-brand-50 p-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-moss">
                  In-Home Experience
                </span>
                <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full border border-brand-line text-neutral-600">
                  Free Service
                </span>
              </div>
              
              <h3 className="mt-2 !text-base font-bold text-forest">
                Free Measure & Quote
              </h3>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                We bring 500+ fabric samples directly to your windows across Auckland & Waikato.
              </p>
              
              <div className="mt-4 rounded-xl border border-brand-line bg-white p-3 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Speak with a Specialist
                </span>
                <a
                  href="tel:0800550011"
                  className="mt-0.5 flex items-center gap-2 text-base font-bold text-forest hover:text-moss transition"
                >
                  <Icon name="phone" size={16} className="text-moss" />
                  <span>0800 55 00 11</span>
                </a>
              </div>

              <a
                href="/contact"
                className="mt-3 btn btn-outline !w-full !min-h-10 !text-xs !font-bold text-center"
              >
                Book Free Consultation <Arrow />
              </a>
            </div>

            {/* Widget 4: Curated Popular Guides */}
            {popularPosts.length > 0 && (
              <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-forest">
                  Top Design Guides
                </span>
                <div className="mt-3 divide-y divide-black/5">
                  {popularPosts.map((guide, idx) => (
                    <a
                      key={guide.id}
                      href={`/blog/${guide.slug}`}
                      className="group flex items-center gap-3 py-2.5 transition first:pt-0 last:pb-0"
                    >
                      <span className="font-serif font-bold text-neutral-300 group-hover:text-moss text-sm w-4 shrink-0 text-center">
                        {idx + 1}
                      </span>
                      <img
                        src={guide.image}
                        alt={guide.imageAlt || guide.title}
                        className="h-11 w-11 rounded-lg object-cover border border-brand-line shrink-0 group-hover:opacity-90"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-moss">
                          {guide.category}
                        </span>
                        <h4 className="text-xs font-semibold text-forest line-clamp-2 group-hover:text-moss transition leading-tight">
                          {guide.title}
                        </h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* 4. Mobile Floating Conversion Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-line px-4 py-2.5 shadow-xl flex items-center justify-between gap-3 no-print">
        <a
          href="tel:0800550011"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-moss"
        >
          <Icon name="phone" size={14} className="text-moss" />
          <span>0800 55 00 11</span>
        </a>
        <div className="flex items-center gap-2">
          <a
            href="/online-quote"
            className="btn btn-dark !min-h-9 !py-1.5 !px-3.5 !text-xs font-bold"
          >
            Instant Quote
          </a>
          <a
            href="/contact"
            className="btn !min-h-9 !py-1.5 !px-3.5 !text-xs font-bold"
          >
            Measure & Quote
          </a>
        </div>
      </div>

      {/* 5. Related Articles Grid */}
      {related.length > 0 && (
        <section className="border-t border-brand-line/80 bg-brand-50/40 py-16 sm:py-20">
          <div className="wrap">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-moss">
                  Curated Reading
                </span>
                <h2 className="!text-2xl sm:!text-3xl font-serif font-bold text-forest mt-1">
                  More Window Styling Guides
                </h2>
              </div>
              <a href="/blog" className="text-link hidden sm:inline-flex">
                View All Guides <Arrow />
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <article
                  key={item.id}
                  className="card group flex flex-col overflow-hidden border border-brand-line bg-white shadow-2xs transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <a
                    href={`/blog/${item.slug}`}
                    className="block aspect-[16/10] overflow-hidden bg-neutral-100"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </a>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2.5 flex items-center justify-between text-xs text-neutral-500">
                      <span className="rounded-full bg-brand-100 px-2.5 py-0.5 font-bold text-moss">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="clock" size={11} className="text-moss" />
                        {item.readTime}
                      </span>
                    </div>
                    <h3 className="!text-base font-serif font-bold text-forest transition group-hover:text-moss line-clamp-2 leading-snug">
                      <a href={`/blog/${item.slug}`}>{item.title}</a>
                    </h3>
                    <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-3.5 text-xs">
                      <span className="text-neutral-400">{item.formattedDate}</span>
                      <a
                        href={`/blog/${item.slug}`}
                        className="font-bold text-moss hover:underline inline-flex items-center gap-1"
                      >
                        Read Guide <Arrow />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <a href="/blog" className="btn btn-outline !px-6 !text-xs">
                Browse All Guides <Arrow />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 6. Global Call to Action Section */}
      <Cta />
    </>
  );
}

