import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(root, "src/assets/images");
const outputDir = path.join(root, "public/images");
const manifest = {};
await fs.mkdir(outputDir, { recursive: true });
for (const file of await fs.readdir(sourceDir)) {
  if (!file.endsWith(".png")) continue;
  const name = path.basename(file, ".png");
  const source = path.join(sourceDir, file);
  const { width, height } = await sharp(source).metadata();
  const widths = [
    ...new Set([480, 800, 1200, width].filter((w) => w <= width)),
  ].sort((a, b) => a - b);
  for (const size of widths) {
    await sharp(source)
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 90, effort: 5 })
      .toFile(path.join(outputDir, `${name}-${size}.webp`));
  }
  manifest[name] = {
    width,
    height,
    src: `/images/${name}-${width}.webp`,
    srcSet: widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", "),
  };
}
const aliases = {
  sunfilter: "sunscreen",
  zebra: "vision",
  honeycomb: "cellular",
  "roman-shades": "roman",
  "outdoor-shades": "project4",
  story: "dining",
  installation: "hero",
  automation: "motorisation",
  project1: "hero",
};
for (const [name, original] of Object.entries(aliases)) {
  if (manifest[original]) manifest[name] = manifest[original];
}
await fs.writeFile(
  path.join(root, "src/data/images.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Built responsive images for ${Object.keys(manifest).length} image slots.`,
);
