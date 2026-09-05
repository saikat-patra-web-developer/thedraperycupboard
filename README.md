# The Drapery Cupboard

Responsive React website styled with Tailwind CSS v4 for The Drapery Cupboard.

## Run

- Install dependencies: npm install
- Start development: npm run dev -- --host 127.0.0.1 --port 5174
- Production build: npm run build
- Lint: npm run lint
- Regenerate responsive image sizes: npm run images:build

## Pages

Home, products, 13 product detail pages, about, services, contact, resources, projects, privacy and terms.

Image galleries, responsive navigation, FAQ accordions and validated enquiry drafts work locally. Quote links preselect the product. Enquiry forms prepare an email with the supplied details; they do not submit data to a server. Attachments must be added to the email manually.

## Assets and launch requirements

The former low-resolution screenshot crops have been replaced throughout the website. Full-resolution generated/restored PNGs live in src/assets/images; the site uses responsive WebP files in public/images. Product images are 1536px wide, and the hero is 1672px wide. The original supplied 2172px-wide logo is retained. Generation prompts and provenance are recorded in src/assets/images/PROMPTS.md. Portrait restoration reconstructs plausible details from low-resolution references; use original staff photographs when exact identity fidelity is required.

Contact details were verified against https://www.thedraperycupboard.co.nz/contact/ on 5 September 2026: +64 20 455 5535, info@thedraperycupboard.co.nz, 22 Johnson Street, Tuakau 2121, New Zealand. Shared values live in src/data/contact.js. Confirm product specifications, pricing, testimonials, team information and legal policies before publishing.

A production host must rewrite application routes to index.html. Connect a form backend before enabling direct submissions.

## Validation

Production build and lint pass. Browser checks cover gallery selection, FAQ expansion, product-prefilled enquiry, local draft preparation, and mobile navigation without horizontal overflow.

## Source structure

- src/pages: one module per page, including product details, privacy, terms and the not-found page.
- src/components/layout: header, footer and brand.
- src/components/sections: reusable hero, benefits, testimonials, process, coverage and call-to-action sections.
- src/components/products: reusable product grid.
- src/components/forms: customer enquiry form.
- src/components/ui: shared buttons, icons, images, headings and FAQ accordion.
- src/components/legal: shared policy content.
- src/data: separate product, service, feature and FAQ data modules.
- src/routes/AppRoutes.jsx: page-to-URL mapping.
- src/hooks: shared page title behaviour.
- src/styles/globals.css: Tailwind theme and global styles.
- src/App.jsx: application shell.
- src/main.jsx: React entry point.

Each component imports its dependencies directly; there are no combined page files or circular barrel imports. Static photographs and the logo remain in public/images.

## Product catalogue

The 13 product names and their order are maintained in src/data/products.js. Cards, individual pages, footer links and quote options share this data. Roman Curtains and Roman Shades remain separate entries. Product-specific dimensions, pricing, construction and available finishes must be confirmed against the supplied range.

New Curtains, Roman Curtains, Verishade and Pergola images were created with built-in image generation. Their source PNGs and individual *-prompt.md files are in src/assets/images. Images are illustrative rather than photographs of supplied stock. Verishade construction reference: https://verishades.com/blog/what-is-veri-shades/.
