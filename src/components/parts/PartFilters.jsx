import { PART_CATEGORIES } from "../../data/parts.js";
import Icon from "../ui/Icon.jsx";

export default function PartFilters({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
}) {
  return (
    <div className="space-y-6">
      {/* Top Search and Sort Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-lg">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search parts by name, SKU (e.g. TDC-RBM), or blind type..."
            className="w-full !min-h-11 rounded-xl border border-neutral-300 pl-11 pr-10 text-sm focus:border-moss focus:ring-1 focus:ring-moss"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
            <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-neutral-400 hover:text-neutral-600"
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <label className="text-xs font-semibold text-neutral-600 shrink-0">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="!min-h-10 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-forest"
          >
            <option value="featured">Featured / Bestsellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Product Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1" role="tablist">
        {PART_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              role="tab"
              aria-selected={isActive}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-forest text-white shadow-sm"
                  : "bg-white border border-brand-line text-neutral-700 hover:bg-brand-50 hover:text-forest"
              }`}
            >
              <Icon name={cat.icon} size={14} className={isActive ? "text-lime" : "text-moss"} />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Results status */}
      <div className="flex items-center justify-between border-t border-neutral-200 pt-4 text-xs text-neutral-500">
        <span>
          Showing <strong className="text-forest">{totalResults}</strong> replacement parts
          {searchQuery && (
            <>
              {" "}
              matching "<strong className="text-forest">{searchQuery}</strong>"
            </>
          )}
        </span>
        <span className="hidden sm:inline text-neutral-400">
          Fast nationwide NZ courier dispatch • Free shipping over $75 NZD
        </span>
      </div>
    </div>
  );
}
