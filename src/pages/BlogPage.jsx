import { useState } from "react";
import Hero from "../components/sections/Hero.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Icon from "../components/ui/Icon.jsx";
import { blogPosts, blogCategories } from "../data/blogPosts.js";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState(() => {
    if (typeof window !== "undefined") {
      const param = new URLSearchParams(window.location.search).get("category");
      if (param && blogCategories.includes(param)) return param;
    }
    return "All";
  });

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = activeCategory === "All" ? filteredPosts[0] : null;
  const gridPosts = activeCategory === "All" ? filteredPosts.slice(1) : filteredPosts;

  return (
    <>
      <Hero
        compact
        label="Blog & Expert Advice"
        title="Guides, Ideas & Inspiration"
        description="Explore expert tips, buying guides, and inspiration from New Zealand's trusted curtain, blinds, and shutter specialists."
      />

      <section className="wrap section">
        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-black/5 pb-6">
          <span className="mr-2 text-xs font-bold uppercase tracking-wider text-forest/60">
            Filter:
          </span>
          {blogCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-forest text-white shadow-xs"
                    : "bg-brand-50 text-forest hover:bg-brand-100 hover:text-forest"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Featured Article Card (Shown on "All") */}
        {featuredPost && (
          <article className="card group mb-12 overflow-hidden border border-brand-line bg-white shadow-sm transition-shadow hover:shadow-md md:grid md:grid-cols-2 md:items-center">
            <div className="aspect-[16/10] overflow-hidden bg-neutral-100 md:aspect-auto md:h-full">
              <img
                src={featuredPost.image}
                alt={featuredPost.imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-3 flex flex-wrap items-center gap-2.5 text-xs text-neutral-500">
                <span className="rounded-md bg-brand-100 px-2.5 py-1 font-bold text-moss">
                  Featured
                </span>
                <span className="rounded-md bg-brand-50 px-2.5 py-1 font-semibold text-forest">
                  {featuredPost.category}
                </span>
                <span>•</span>
                <span>{featuredPost.formattedDate}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="!text-2xl font-bold tracking-tight text-forest sm:!text-3xl">
                <a
                  href={`/blog/${featuredPost.slug}`}
                  className="transition-colors group-hover:text-moss"
                >
                  {featuredPost.title}
                </a>
              </h2>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6">
                <a
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-moss transition group-hover:translate-x-1"
                >
                  Read Full Guide <Arrow />
                </a>
              </div>
            </div>
          </article>
        )}

        {/* Grid of Blog Posts */}
        {gridPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <article
                key={post.id}
                className="card group flex flex-col overflow-hidden border border-brand-line bg-white shadow-xs transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <a
                  href={`/blog/${post.slug}`}
                  className="block aspect-[16/10] overflow-hidden bg-neutral-100"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
                    <span className="rounded bg-brand-50 px-2.5 py-0.5 font-bold uppercase tracking-wider text-moss">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="!text-lg font-bold text-forest transition group-hover:text-moss">
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-xs leading-relaxed text-neutral-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4 text-xs font-medium text-neutral-500">
                    <span>{post.formattedDate}</span>
                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 font-bold text-moss hover:underline"
                    >
                      Read Article <Arrow />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <Icon name="tools" size={32} className="mx-auto mb-3 text-moss/50" />
            <p className="text-sm font-semibold text-forest">
              No articles found under {activeCategory}.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="btn btn-outline !mt-4 !text-xs"
            >
              View All Articles
            </button>
          </div>
        )}
      </section>

      <Cta />
    </>
  );
}
