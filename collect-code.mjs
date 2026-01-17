import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUTPUT = "project.md";

/** что НЕ включать */
const IGNORE_DIRS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "out",
  ".turbo",
];

/** какие файлы включать */
const ALLOWED_EXT = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".css",
  ".scss",
  ".md",
  ".env",
];

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        walk(fullPath, files);
      }
    } else {
      const ext = path.extname(file);
      if (ALLOWED_EXT.includes(ext) || file === "package.json") {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const files = walk(ROOT);

let md = `# 📦 Project source code\n\n`;
md += `Generated: ${new Date().toISOString()}\n\n`;

for (const file of files) {
  const relPath = path.relative(ROOT, file);
  const ext = path.extname(file).replace(".", "");

  const content = fs.readFileSync(file, "utf-8");

  md += `---\n\n`;
  md += `## 📄 ${relPath}\n\n`;
  md += "```" + ext + "\n";
  md += content;
  md += "\n```\n\n";
}

fs.writeFileSync(OUTPUT, md);

console.log(`✅ Markdown создан: ${OUTPUT}`);
