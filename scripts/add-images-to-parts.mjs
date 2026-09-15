import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const partsFile = path.join(root, "src/data/parts.js");

let content = fs.readFileSync(partsFile, "utf8");

// Add image: "part-xx-xx" if not already present
content = content.replace(/(id:\s*["'](part-[^"']+)["'],\s*\n\s*slug:)/g, (match, p1, partId) => {
  return `id: "${partId}",\n    image: "${partId}",\n    slug:`;
});

fs.writeFileSync(partsFile, content, "utf8");
console.log("Successfully added image: 'part-...' properties to src/data/parts.js");
