import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "..", "public");
const dest = path.join(__dirname, "../..", "dist", "public");

fs.cpSync(src, dest, { recursive: true });
console.log("Copied assets to dist/assets");
