import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_PREMIUM } from "../motion/motionVariants.js";
import { googleReviews, googleOverview } from "../../data/reviews.js";

// Official Google 'G' icon with authentic 4-color branding
function GoogleGIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={"shrink-0 " + className}
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

// 5-Star Rating Component
function StarRating({ count = 5, size = 15 }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderRef = useRef(null);

  // Responsive items-per-page calculation
  useEffect(() => {
    function updateItemsPerPage() {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(1);
      } else if (width < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    }

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage, { passive: true });
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalReviews = googleReviews.length;
  const maxIndex = Math.max(0, totalReviews - itemsPerPage);
  const safeIndex = Math.min(currentIndex, maxIndex);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const current = Math.min(prev, maxIndex);
      return current >= maxIndex ? 0 : current + 1;
    });
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const current = Math.min(prev, maxIndex);
      return current <= 0 ? maxIndex : current - 1;
    });
  }, [maxIndex]);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion, handleNext]);

  // Swipe gesture handling for mobile / tablets
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (swipeDistance > minSwipeDistance) {
      handleNext();
    } else if (swipeDistance < -minSwipeDistance) {
      handlePrev();
    }
    setIsPaused(false);
  };

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section className="wrap pb-14 md:pb-20" aria-label="Customer Reviews">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-brand-50 to-white p-5 sm:p-8 lg:p-10 border border-brand-line/60 shadow-xs"
      >
        {/* Subtle decorative background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-lime/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-brand-100/60 blur-3xl"
        />

        {/* Section Header */}
        <div className="relative mb-8 text-center sm:mb-10">
          <div className="eyebrow inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100/80 border border-brand-line/60 text-moss">
            <span className="size-2 rounded-full bg-lime animate-pulse" />
            What our customers say
          </div>

          <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-forest sm:text-3xl lg:text-4xl">
            Trusted by Kiwi Homeowners & Businesses
          </h2>

          <p className="mx-auto mt-2.5 max-w-2xl text-sm sm:text-base leading-relaxed text-brand-grey">
            Read real Google reviews from happy clients across Auckland, Hamilton, and the Waikato region.
          </p>

          {/* Google Trust & Social Proof Badge */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-brand-line/80 bg-white/90 px-4 py-2.5 shadow-xs backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <GoogleGIcon size={20} />
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Google Rating
              </span>
            </div>

            <div className="h-4 w-px bg-neutral-200" aria-hidden="true" />

            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base font-bold text-forest">
                {googleOverview.rating}
              </span>
              <StarRating count={5} size={16} />
            </div>

            <div className="h-4 w-px bg-neutral-200 hidden sm:block" aria-hidden="true" />

            <span className="text-xs text-neutral-600">
              Based on <b>{googleOverview.totalReviews}+ reviews</b>
            </span>

            <a
              href={googleOverview.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-medium text-moss transition-colors hover:bg-lime hover:text-white"
            >
              <span>Write a Review</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          ref={sliderRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Google customer reviews slider"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative focus:outline-hidden focus-visible:ring-2 focus-visible:ring-lime/60 rounded-2xl"
        >
          {/* Slider Overflow Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform ease-out"
              style={{
                transform: `translateX(-${safeIndex * (100 / itemsPerPage)}%)`,
                transitionDuration: shouldReduceMotion ? "0ms" : "500ms",
              }}
            >
              {googleReviews.map((review) => {
                const isExpanded = expandedReviews[review.id];
                const isLong = review.text.length > 175;
                const displayText = isLong && !isExpanded
                  ? review.text.slice(0, 175) + "..."
                  : review.text;

                return (
                  <div
                    key={review.id}
                    className="shrink-0 p-2.5 sm:p-3"
                    style={{ width: `${100 / itemsPerPage}%` }}
                  >
                    <article className="group relative flex h-full flex-col justify-between rounded-2xl border border-brand-line/70 bg-white/95 p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-lime/50 hover:shadow-md">
                      {/* Top Header: Avatar + Author Info + Google Badge */}
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Avatar with fallback */}
                            <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-black/5 bg-brand-100 flex items-center justify-center font-bold text-moss shadow-inner">
                              <span aria-hidden="true" className="select-none text-base">
                                {review.initial}
                              </span>
                              {review.avatar && (
                                <img
                                  src={review.avatar}
                                  alt={review.author}
                                  loading="lazy"
                                  decoding="async"
                                  className="absolute inset-0 size-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              )}
                            </div>

                            {/* Name, time and location */}
                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-bold text-forest">
                                {review.author}
                              </h3>
                              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                                <span>{review.time}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-[11px] text-neutral-600">
                                  <GoogleGIcon size={11} />
                                  <span>Verified</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Star rating pill */}
                          <div className="shrink-0 flex flex-col items-end">
                            <StarRating count={review.rating} size={14} />
                          </div>
                        </div>

                        {/* Product / Service Tag */}
                        {review.service && (
                          <div className="mt-3.5">
                            <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-medium text-moss border border-brand-line/60">
                              {review.service}
                            </span>
                          </div>
                        )}

                        {/* Review Text */}
                        <div className="relative mt-3.5">
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-4 -left-1 font-serif text-4xl text-lime/30 select-none"
                          >
                            “
                          </span>
                          <p className="relative z-10 text-sm leading-relaxed text-neutral-700 font-normal">
                            {displayText}
                          </p>

                          {/* Read more / Show less toggle */}
                          {isLong && (
                            <button
                              type="button"
                              onClick={() => toggleExpand(review.id)}
                              className="mt-2 text-xs font-semibold text-moss transition-colors hover:text-lime focus:outline-hidden"
                            >
                              {isExpanded ? "Show less" : "Read more"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Card Footer: Source Link */}
                      <div className="mt-5 flex items-center justify-between border-t border-brand-line/40 pt-3.5 text-xs text-neutral-500">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <GoogleGIcon size={13} />
                          <span>Google Review</span>
                        </span>
                        <a
                          href={review.profileUrl || googleOverview.reviewsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 transition-colors hover:text-moss"
                        >
                          <span>View on Maps</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows (Prev / Next) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="group absolute -left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-brand-line bg-white/95 text-forest shadow-md backdrop-blur-xs transition-all duration-200 hover:scale-105 hover:bg-lime hover:text-white hover:border-lime focus:outline-hidden focus-visible:ring-2 focus-visible:ring-lime sm:-left-4 sm:size-11"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="group absolute -right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-brand-line bg-white/95 text-forest shadow-md backdrop-blur-xs transition-all duration-200 hover:scale-105 hover:bg-lime hover:text-white hover:border-lime focus:outline-hidden focus-visible:ring-2 focus-visible:ring-lime sm:-right-4 sm:size-11"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Carousel Pagination Dots & Autoplay Status */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-line/60 pt-5">
          {/* Pagination Dots */}
          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Review pagination"
          >
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={safeIndex === index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-lime ${
                  safeIndex === index
                    ? "w-7 bg-lime"
                    : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>

          {/* Quick Trust Highlights & View All Link */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-600 sm:justify-end">
            <span className="inline-flex items-center gap-1 font-medium text-forest">
              <span className="text-lime font-bold">✓</span> 100% Verified Customer Feedback
            </span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <a
              href={googleOverview.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-moss transition-colors hover:text-lime underline decoration-lime/50 underline-offset-4"
            >
              <span>See all 82 reviews on Google Maps</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Testimonials;
